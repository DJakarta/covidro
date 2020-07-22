import React, { useEffect, useState, Component } from 'react'
import { Container, Header, Tab, Dimmer, Loader, Segment } from 'semantic-ui-react'
import Summary from './charts/Summary'
import AllData from './charts/AllData'
import MainData from './charts/MainData'
import Percentage from './charts/Percentage'
import { DailyInfected, DailyTestedInfected } from './charts/PerDay'
import axios from 'axios'
// import { initialData } from './data/data'
// import { tests } from './data/tests'

class Home extends Component {

	constructor(props) {
		super(props);
		this.state = {
			rawData: [],
			testData: [],
			finalData: [],
			isLoading: true,
		};
		this.fetch()
	}

	async fetch() {
		axios
		.get('https://datelazi.ro/latestData.json')
		.then( res => {
			const normalised = this.normaliseList(res.data)
			this.setState({ rawData: normalised })
			return axios.get( 'https://www.iuliu.net/corona/data/romania.js', { responseType: 'text' })
		})
		.then(res => {
			const data = JSON.parse(res.data.substring(21))
			const list = []
			for (let i in data) {
				const el = {}
				el.date = i.split("/").reverse().join("-")
				el.tests = data[i].tests
				list.push(el)
			}
			const trimmed = list.splice(19, list.length - 1)
			const normalised = this.normaliseTests(list)
			return normalised
		})
		.then(res => {
			this.setState({ testData: res })
			this.removeLoader()
		}).catch();
	}

	normaliseTests(data) {
		const toAdd = [
			{
				"date":"2020-03-20",
				"tests":3311,
			},
			{
				"date":"2020-03-19",
				"tests":303,
			},
			{
				"date":"2020-03-18",
				"tests":520,
			},
			{
				"date":"2020-03-17",
				"newTests":442,
				"total_tests":4150
			}
		]
		const res = []
		for (let i in data) {
			const prevDay = data[i - 1] !== undefined ? data[i - 1].tests : 0
			const prevDayTotal = res[i - 1] !== undefined ? res[i - 1].totalTests + prevDay: 0 + prevDay
			const totalTests = prevDayTotal + data[i].tests
			res.push({
				newTests: data[i].tests,
				totalTests: totalTests,
				date: data[i].date
			})
		}
		return res.reverse()
	}

	normaliseList(data) {
		const res = [];
		const list = data.historicalData;
		// push today's data
		res.push({
			date: data.currentDayStats.parsedOnString,
			totalInfected: data.currentDayStats.numberInfected,
			deceased: data.currentDayStats.numberDeceased,
			cured: data.currentDayStats.numberCured
		});
		for (let i in list) {
			res.push({
				date: i,
				totalInfected: list[i].numberInfected,
				deceased: list[i].numberDeceased,
				cured: list[i].numberCured
			});
		}
		return res.reverse()
	}

	addTestsToList(list, tests) {
		const res = []
		for (let i in list) {
			const el = {};
			for (let a in list[i]) {
				el[a] = list[i][a];
				const exists = tests[i] !== undefined;
				const prevDay = list[i - 1] !== undefined ? list[i - 1].totalInfected : 0;
				el.newTests = exists ? tests[i].newTests : 0;
				el.totalTests = exists ? tests[i].totalTests : 0;
				el.dailyInfected = list[i].totalInfected - prevDay;
				el.averageInfectedOfTested = exists
					? parseFloat((el.dailyInfected / el.newTests) * 100, 10).toFixed(2)
					: 0
			}
			res.push(el)
		}
		this.setState({ finalData: res })
	}

	removeLoader() {
		this.addTestsToList(this.state.rawData, this.state.testData)
		this.setState({ isLoading: false })
	} 

	componentDidMount() {
		this.fetch()
	}

	render() {

		console.log(this.state.finalData)

		const Loading = () => (
			<Dimmer active inverted>
				<Loader inverted>Loading</Loader>
			</Dimmer>
		)

		const tabs = [
			{
				menuItem: 'Sumar',
				render: () => (
					<Tab.Pane>
						<Summary finalData={ this.state.finalData } />
					</Tab.Pane>
				)
			},
			{
				menuItem: 'Evoluție',
				render: () => (
					<Tab.Pane>
						<MainData finalData={ this.state.finalData } />
					</Tab.Pane>
				)
			},
			{
				menuItem: 'Toate datele',
				render: () => (
					<Tab.Pane>
						<AllData finalData={ this.state.finalData } />
					</Tab.Pane>
				)
			},
			{
				menuItem: 'Infectați per zi',
				render: () => (
					<Tab.Pane>
						<DailyInfected finalData={ this.state.finalData } />
					</Tab.Pane>
				)
			},
			{
				menuItem: 'Infectați din testați per zi',
				render: () => (
					<Tab.Pane>
						<DailyTestedInfected finalData={ this.state.finalData } />
					</Tab.Pane>
				)
			},
			{
				menuItem: 'Evoluție procentuală',
				render: () => (
					<Tab.Pane>
						<Percentage finalData={ this.state.finalData } />
					</Tab.Pane>
				)
			}
		]

		return (
			<Container className="mt2">
				<Header as="h1">Statistici Covid România</Header>
				{ this.state.isLoading ? <Loading /> :
					<Tab
						menu={{
							fluid: true,
							// vertical: true,
							attached: true,
							tabular: true
						}}
						panes={ tabs }
					/>
				}
			</Container>
		)
	}
}

export default Home
