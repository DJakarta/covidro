const express = require('express')
const cors = require('cors')
const axios = require('axios')

const app = express()
const port = process.env.PORT || 4000
const hostname = process.env.HOST || '127.0.0.1'

app.use(cors())

const normaliseList = (data) => {
    const res = [];
    const list = data.historicalData;
    // push today's data
    const distribution = {}
    const gender = {}
    distribution.averageAge = data.currentDayStats.averageAge
    distribution.county = data.currentDayStats.countyInfectionsNumbers
    distribution.age = data.currentDayStats.distributionByAge
    gender.children = data.currentDayStats.percentageOfChildren === undefined ? null : data.currentDayStats.percentageOfChildren
    gender.men = data.currentDayStats.percentageOfMen === undefined ? null : data.currentDayStats.percentageOfMen
    gender.women = data.currentDayStats.percentageOfWomen === undefined ? null : data.currentDayStats.percentageOfWomen
    distribution.gender = gender
    res.push({
        date: data.currentDayStats.parsedOnString,
        distribution
    });
    // push other historical data
    for (let i in list) {
        let distribution = {}
        let gender = {}
        distribution.averageAge = list[i].averageAge
        distribution.county = list[i].countyInfectionsNumbers
        distribution.age = list[i].distributionByAge
        gender.children = list[i].percentageOfChildren === undefined ? null : list[i].percentageOfChildren
        gender.men = list[i].percentageOfMen === undefined ? null : list[i].percentageOfMen
        gender.women = list[i].percentageOfWomen === undefined ? null : list[i].percentageOfWomen
        distribution.gender = gender
        res.push({
            date: list[i].parsedOnString,
            distribution
        });
    }
    return res.reverse()
}

const consolidateData = (graphs, latest) => {
    const data = []
    for (let i in graphs) {
        const el = {}
        for (let a in graphs[i]) {
            el[a] = graphs[i][a]
            el.distribution = latest[i].distribution
        }
        data.push(el)
    }
    return data
}

app.get("/api/", async (req, res, next) => {
    const graphsAPI = 'https://www.graphs.ro/json.php'
    const latestAPI = 'https://di5ds1eotmbx1.cloudfront.net/latestData.json'
    const graphs = []
    const data = await axios.get(graphsAPI).then(res => {
        const reversed = res.data.covid_romania.reverse()
        const graphsData = reversed.splice( 14, reversed.length - 1 )
        for (let i in graphsData) {
            const item = {}
            const day = {}
            const pending = {}
            const total = {}
            const tests = {}
            const exists = graphsData[i] !== undefined;
            item.date = graphsData[i].reporting_date
            tests.institutional = graphsData[i].tests_for_case_definition
            tests.onRequest = graphsData[i].tests_upon_request
            tests.prevUnreported = graphsData[i].tests_done_before_today_and_reported_today
            tests.retestsPositive = graphsData[i].infected_positive_retests
            tests.total = graphsData[i].new_tests_today
            day.callsEmergency = graphsData[i].emergency_calls
            day.cases = graphsData[i].new_cases_today
            day.deceased = graphsData[i].new_deaths_today
            day.recovered = graphsData[i].new_recovered_today
            day.callsInfo = graphsData[i].information_calls
            day.averageInfectedOfTested = exists
				? parseFloat((day.cases / tests.total) * 100, 10).toFixed(2)
                : 0
            day.quarantined = graphsData[i].persons_in_quarantine === null ? graphsData[i].persons_in_home_quarantine + graphsData[i].persons_in_institutional_quarantine : graphsData[i].persons_in_quarantine
            day.isolated = ( graphsData[i].persons_in_home_isolation !== null && graphsData[i].persons_in_institutional_isolation !== null ) ? graphsData[i].persons_in_institutional_isolation + graphsData[i].persons_in_home_isolation : null
            day.commited = graphsData[i].infected_hospitalized
            day.asymptomatic = graphsData[i].infected_asymptomatic
            pending.icu = graphsData[i].intensive_care_right_now
            pending.quarantinedHome = graphsData[i].persons_in_home_quarantine
            pending.isolatedHome = graphsData[i].persons_in_home_isolation
            pending.quarantinedInstitutional = graphsData[i].persons_in_institutional_quarantine
            pending.isolatedInstitutional = graphsData[i].persons_in_institutional_isolation
            total.tests = graphsData[i].total_tests
            total.cases = graphsData[i].total_cases
            total.deceased = graphsData[i].total_deaths
            total.recovered = graphsData[i].total_recovered
            day.tests = tests
            item.day = day
            item.pending = pending
            item.total = total
            graphs.push(item)
        }
        return axios.get( latestAPI, { responseType: 'text' })
    }).then( (res) => {
        const latest = normaliseList(res.data)
        return latest
    }).then((res) => {
        const data = consolidateData(graphs, res)
        return data
    })
    .catch(err => console.log(err))
    res.json(data)
});

app.listen(port, hostname, () => {
    console.log("Server running on " + hostname + ':' + port);
});