import React from 'react';
import { Grid, Statistic, Header } from 'semantic-ui-react';
import ReactEcharts from 'echarts-for-react';
import { initialData } from '../data/data';
import { mnemonics } from '../data/mnemonics';
import Moment from 'react-moment';
import echarts from 'echarts';
import map from './../data/roGeo.json';

echarts.registerMap('RO', map);

const Summary = ({ finalData }) => {
	const today = finalData[finalData.length - 1];
	const prevDay = finalData[finalData.length - 2];
	const countyLowestColor = '#FFFF66';
	const countyHighestColor = '#DC143C';
	const curedColor = '#65E0E0';

	const { countyInfectionsNumbers } = initialData.currentDayStats;

	const counties = Object.entries(countyInfectionsNumbers)
		.filter(([key]) => key !== '-')
		.map(([key, entry]) => ({
			name: mnemonics[key][0],
			value: ((1000 * entry) / mnemonics[key][1]).toFixed(2),
			totalPopulation: mnemonics[key][1],
			numberInfected: entry,
			county: key
		}))
		.sort((a, b) =>
			// reversed by count
			a.value > b.value ? -1 : 1
		);

	const getChartOptions = (data) => {
		return {
			tooltip: {
				trigger: 'item',
				formatter: (item) => {
					return `
						<strong style="color:#fff">${item.name}</strong></br>
						Cazuri: ${item.data.numberInfected}</br>
						Cazuri per mie: ${item.value}‰`;
				}
			},
			visualMap: {
				show: true,
				min: 0,
				max: data[0].value,
				left: 'left',
				top: 'bottom',
				text: ['Ridicat', 'Scazut'],
				calculable: false,
				inRange: {
					color: [countyLowestColor, countyHighestColor]
				}
			},
			series: [
				{
					name: 'Cazuri',
					type: 'map',
					mapType: 'RO',
					roam: false,
					itemStyle: {
						areaColor: curedColor
					},
					label: {
						normal: {
							show: true
						},
						emphasis: {
							show: true
						}
					},
					emphasis: {
						label: {
							show: true
						}
					},
					data: data
				}
			]
		};
	};

	return (
		<Grid columns={2} divided>
			<Grid.Column>
				<Header as="h2" textAlign="center">
					Cifrele de azi,{' '}
					<Moment format="DD MMM YYYY">{today.date}</Moment>
				</Header>
				<Statistic.Group size={'small'} widths="four">
					<Statistic color="grey">
						<Statistic.Label>Testați</Statistic.Label>
						<Statistic.Value>{today.newTests}</Statistic.Value>
					</Statistic>
					<Statistic color="red">
						<Statistic.Label>Cazuri noi</Statistic.Label>
						<Statistic.Value>{today.dailyInfected}</Statistic.Value>
					</Statistic>
					<Statistic color="green">
						<Statistic.Label>Vindecați</Statistic.Label>
						<Statistic.Value>
							{today.cured - prevDay.cured}
						</Statistic.Value>
					</Statistic>
					<Statistic color="black">
						<Statistic.Label>Decedați</Statistic.Label>
						<Statistic.Value>
							{today.deceased - prevDay.deceased}
						</Statistic.Value>
					</Statistic>
				</Statistic.Group>
			</Grid.Column>
			<Grid.Column>
				<Header as="h2" textAlign="center">
					Total
				</Header>
				<Statistic.Group size={'small'} widths="three">
					<Statistic color="red">
						<Statistic.Label>Cazuri</Statistic.Label>
						<Statistic.Value>{today.totalInfected}</Statistic.Value>
					</Statistic>
					<Statistic color="green">
						<Statistic.Label>Vindecați</Statistic.Label>
						<Statistic.Value>{today.cured}</Statistic.Value>
					</Statistic>
					<Statistic color="black">
						<Statistic.Label>Decedați</Statistic.Label>
						<Statistic.Value>{today.deceased}</Statistic.Value>
					</Statistic>
				</Statistic.Group>
			</Grid.Column>
			<Grid.Row>
				<ReactEcharts
					option={ getChartOptions(counties) }
					style={{ width: '1200%', height: '800%' }}
					className="react_for_echarts"
					opts={{renderer: 'svg'}}
				/>
			</Grid.Row>
		</Grid>
	);
};

export default Summary;
