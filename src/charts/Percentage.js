import React from 'react';
import ReactEcharts from 'echarts-for-react'

const Percentage = ({ finalData }) => {

	const extractDataToList = (data) => {
		const res = []
		for (let i in finalData) {
			res.push(finalData[i][data])
		}
		return res
	}

	const dates = extractDataToList('date')
	const averageInfectedOfTested = extractDataToList('averageInfectedOfTested')

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
			data: [ 'Procentaj' ]
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
				name: 'Procentaj',
				type: 'line',
				smooth: true,
				data: averageInfectedOfTested,
				areaStyle: {},
				symbol: 'none',
				color: '#FF0000'
			},
		]
	};

	return (
		<React.Fragment>
			<h2>Procentaj de infectați din persoane testate (zilnic)</h2>
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

export default Percentage;
