import React from 'react';
import ReactEcharts from 'echarts-for-react'

const AllData = ({ finalData }) => {
	const extractDataToList = (data) => {
		const res = []
		for (let i in finalData) {
			res.push(finalData[i][data])
		}
		return res
	}

	const dates = extractDataToList('date')
	const totalInfected = extractDataToList('totalInfected')
	const cured = extractDataToList('cured')
	const deceased = extractDataToList('deceased')
	const totalTests = extractDataToList('totalTests')
	const newTests = extractDataToList('newTests')
	const dailyInfected = extractDataToList('dailyInfected')

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
			data: [ 'Total teste', 'Teste noi', 'Infectați per zi', 'Evoluție infectați', 'Vindecați', 'Decedați' ]
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
			show: true,
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
				symbol: 'none',
				color: '#FF4500'
			},
			{
				name: 'Decedați',
				type: 'line',
				smooth: true,
				data: deceased,
				symbol: 'none',
				color: '#000'
			},
			{
				name: 'Teste noi',
				type: 'line',
				smooth: true,
				data: newTests,
				symbol: 'none',
				color: '#0000ff'
			},
			{
				name: 'Vindecați',
				type: 'line',
				smooth: true,
				data: cured,
				symbol: 'none',
				color: '#00FF00'
			},
			{
				name: 'Evoluție infectați',
				type: 'line',
				smooth: true,
				data: totalInfected,
				symbol: 'none',
				color: '#FF0000'
			},
			{
				name: 'Total teste',
				type: 'line',
				smooth: true,
				data: totalTests,
				symbol: 'none',
				color: '#981ceb'
			},
		]
	};

	return (
		<React.Fragment>
			<h2>(Aproape) toate datele</h2>

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

export default AllData;
