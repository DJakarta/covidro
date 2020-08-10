import React from 'react';
import ReactEcharts from 'echarts-for-react'

const extractDataToList = (arg, from, more, data) => {
	const res = []
	for (let i in data) {
		if (arg === 'date') {
			res.push(data[i][arg])	
		} else {
			if (more) {
				res.push(data[i][from][more][arg])
			} else {
				res.push(data[i][from][arg])
			}
		}
	}
	return res
}

export const DailyInfected = ({ data }) => {

	const dates = extractDataToList('date', null, null, data)
	const dailyInfected = extractDataToList('cases', 'day', null, data)
	const newTests = extractDataToList('total', 'day', 'tests', data)

	const options = {
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				label: {
					backgroundColor: '#6a7985'
				}
			}
		},
		legend: {
			data: [ 'Infectări zilnice' ]
		},
		grid: {
			left: '3%',
			right: '4%',
			bottom: '3%',
			containLabel: true
		},
		xAxis: {
			type: 'category',
			data: dates,
			axisLabel: {
				color: 'gray',
				fontWeight: 'bold',
				rotate: 90,
				interval: 6,
			},
		 },
		yAxis: {
			type: 'value',
			axisLabel: {
				color: 'gray',
				inside: true
			},
		},
		series: [
			{
				name: 'Infectări per zi',
				type: 'line',
				smooth: true,
				data: dailyInfected,
				areaStyle: {},
				symbol: 'none',
				color: '#FF0000'
			},
		]
	};

	return (
		<React.Fragment>
			<h2>Infectări zilnice</h2>
			<ReactEcharts
              style={{
                height: '500px',
                width: '100%'
              }}
              option={ options }
            //   theme={SUMMARY_CHART_THEME}
            />
		</React.Fragment>
	);
};

export const DailyTestedInfected = ({ data }) => {

	const dates = extractDataToList('date', null, null, data)
	const dailyInfected = extractDataToList('cases', 'day', null, data)
	const newTests = extractDataToList('total', 'day', 'tests', data)

	const options = {
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				label: {
					backgroundColor: '#6a7985'
				}
			}
		},
		legend: {
			data: [ 'Teste noi', 'Infectați per zi' ]
		},
		grid: {
			left: '3%',
			right: '4%',
			bottom: '3%',
			containLabel: true
		},
		xAxis: {
			type: 'category',
			data: dates,
			axisLabel: {
				color: 'gray',
				fontWeight: 'bold',
				rotate: 90,
				interval: 6,
			},
		 },
		yAxis: {
			type: 'value',
			axisLabel: {
				color: 'gray',
				inside: true
			},
		},
		series: [
			{
				name: 'Infectați per zi',
				type: 'line',
				smooth: true,
				data: dailyInfected,
				areaStyle: {},
				symbol: 'none',
				color: '#FF0000',
				stack: 'one',
			},
			{
				name: 'Teste noi',
				type: 'line',
				smooth: true,
				data: newTests,
				areaStyle: {},
				symbol: 'none',
				color: '#ffa500',
				stack: 'one'
			},
		]
	};

	return (
		<React.Fragment>
			<h2>Testări vs. infectări (per zi)</h2>

			<ReactEcharts
              style={{
                height: '500px',
                width: '100%'
              }}
              option={ options }
            //   theme={SUMMARY_CHART_THEME}
            />
		</React.Fragment>
	);
};
