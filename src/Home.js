import React, { useEffect, useState } from 'react';
import { initialData } from './data/data';
import { tests } from './data/tests';
import { Container, Header, Tab } from 'semantic-ui-react';
import Summary from './charts/Summary';
import AllData from './charts/AllData';
import MainData from './charts/MainData';
import Percentage from './charts/Percentage';
import { DailyInfected, DailyTestedInfected } from './charts/PerDay';
import axios from 'axios';

const Home = () => {
	// to test fetch
	const apiData =
		'https://code4rocoviz19api-demo.azurewebsites.net/api/v2/data';
	const [data, setData] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const result = await axios(apiData);
			setData(result.data);
		};
		fetchData();
	}, []);

	console.log(data);

	const normalizeList = (data) => {
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
		return res.reverse();
	};

	const addTestsToList = (list, tests) => {
		const res = [];
		for (let i in list) {
			const el = {};
			for (let a in list[i]) {
				el[a] = list[i][a];
				const exists = tests[i] !== undefined;
				const prevDay =
					list[i - 1] !== undefined ? list[i - 1].totalInfected : 0;
				el.newTests = exists ? tests[i].newTests : 0;
				el.totalTests = exists ? tests[i].totalTests : 0;
				el.dailyInfected = list[i].totalInfected - prevDay;
				el.averageInfectedOfTested = exists
					? parseFloat((el.dailyInfected / el.newTests) * 100, 10).toFixed(
							2
					  )
					: 0;
			}
			res.push(el);
		}
		return res;
	};

	const normalisedData = normalizeList(initialData);
	const finalData = addTestsToList(normalisedData, tests);

	const tabs = [
		{
			menuItem: 'Sumar',
			render: () => (
				<Tab.Pane>
					<Summary finalData={finalData} />
				</Tab.Pane>
			)
		},
		{
			menuItem: 'Evoluție',
			render: () => (
				<Tab.Pane>
					<MainData finalData={finalData} />
				</Tab.Pane>
			)
		},
		{
			menuItem: 'Toate datele',
			render: () => (
				<Tab.Pane>
					<AllData finalData={finalData} />
				</Tab.Pane>
			)
		},
		{
			menuItem: 'Infectați per zi',
			render: () => (
				<Tab.Pane>
					<DailyInfected finalData={finalData} />
				</Tab.Pane>
			)
		},
		{
			menuItem: 'Infectați din testați per zi',
			render: () => (
				<Tab.Pane>
					<DailyTestedInfected finalData={finalData} />
				</Tab.Pane>
			)
		},
		{
			menuItem: 'Evoluție procentuală',
			render: () => (
				<Tab.Pane>
					<Percentage finalData={finalData} />
				</Tab.Pane>
			)
		}
	];

	return (
		<Container className="mt2">
			<Header as="h1">Statistici Covid România</Header>
			<Tab
				menu={{
					fluid: true,
					// vertical: true,
					attached: true,
					tabular: true
				}}
				panes={tabs}
			/>
		</Container>
	);
};

export default Home;
