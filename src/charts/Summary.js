import React from 'react';
import { Grid, Statistic, Header } from 'semantic-ui-react';
import ReactEcharts from 'echarts-for-react';
import { mnemonics } from '../data/mnemonics';
import Moment from 'react-moment';
import echarts from 'echarts';
import map from './../data/roGeo.json';

echarts.registerMap('RO', map);

const Summary = ({ data }) => {
	const today = data[data.length - 1];
	const countyLowestColor = '#FFFF66';
	const countyHighestColor = '#DC143C';
	const curedColor = '#65E0E0';

	const countyInfectionsNumbers = today.distribution.county

	// const news = 'https://stirioficiale.ro/feeds/informatii.xml'
	// const vids = 'https://stirioficiale.ro/feeds/video.xml'
	// const legal = 'https://stirioficiale.ro/feeds/hotarari.xml'

	// const parseRSS = (url) => {
	// 	fetch(url)
	// 	.then(res => res.data)
	// 	.catch(err => console.log(err))
	// 	// .then(data => console.log(data))
	// }
	// parseRSS("https://api.rss2json.com/v1/api.json?rss_url=" + news)
	// parseRSS("https://api.rss2json.com/v1/api.json?rss_url=" + vids)
	// parseRSS("https://api.rss2json.com/v1/api.json?rss_url=" + legal)

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
							show: true,
							formatter: (item) => ( item.data.county )
						},
						emphasis: {
							show: false
						},
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
		<Grid columns={2} divided stackable>
			<Grid.Column>
				<Header as="h2" textAlign="center">
					Cifrele de azi,{' '}
					<Moment format="DD MMM YYYY">{today.date}</Moment>
				</Header>
				<Statistic.Group size={'small'} widths="four">
					<Statistic color="grey">
						<Statistic.Label>Testați</Statistic.Label>
						<Statistic.Value>{today.day.tests.total}</Statistic.Value>
					</Statistic>
					<Statistic color="red">
						<Statistic.Label>Cazuri noi</Statistic.Label>
						<Statistic.Value>{today.day.cases}</Statistic.Value>
					</Statistic>
					<Statistic color="green">
						<Statistic.Label>Vindecați</Statistic.Label>
						<Statistic.Value>
							{today.day.recovered}
						</Statistic.Value>
					</Statistic>
					<Statistic color="black">
						<Statistic.Label>Decedați</Statistic.Label>
						<Statistic.Value>
							{today.day.deceased}
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
						<Statistic.Value>{today.total.cases}</Statistic.Value>
					</Statistic>
					<Statistic color="green">
						<Statistic.Label>Vindecați</Statistic.Label>
						<Statistic.Value>{today.total.recovered}</Statistic.Value>
					</Statistic>
					<Statistic color="black">
						<Statistic.Label>Decedați</Statistic.Label>
						<Statistic.Value>{today.total.deceased}</Statistic.Value>
					</Statistic>
				</Statistic.Group>
			</Grid.Column>
			<Grid.Row>
				<ReactEcharts
					option={ getChartOptions(counties) }
					style={{ width: '100%', minHeight: '400px' }}
					className="react_for_echarts"
					opts={{renderer: 'svg'}}
				/>
			</Grid.Row>
		</Grid>
	);
};

export default Summary;
