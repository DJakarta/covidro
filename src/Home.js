import React, { Component } from 'react'
import { Container, Header, Tab, Dimmer, Loader } from 'semantic-ui-react'
import Summary from './charts/Summary'
import AllData from './charts/AllData'
import MainData from './charts/MainData'
import Percentage from './charts/Percentage'
import { DailyInfected, DailyTestedInfected } from './charts/PerDay'
import axios from 'axios'

const API = 'http://127.0.0.1:4000/api'

class Home extends Component {

	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
			data: [],
		};
		this.getData()
	}

	async getData() {
		axios.get(API, {
		  }).then(res => {
			  console.log(res)
			const data = res.data
			this.setState({ data: data, isLoading: false })
		})
		.catch()
	}

	componentDidMount() {
		this.getData()
	}

	render() {

		const data = this.state.data

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
						<Summary data={ data } />
					</Tab.Pane>
				)
			},
			{
				menuItem: 'Evoluție',
				render: () => (
					<Tab.Pane>
						<MainData data={ data } />
					</Tab.Pane>
				)
			},
			{
				menuItem: 'Toate datele',
				render: () => (
					<Tab.Pane>
						<AllData data={ data } />
					</Tab.Pane>
				)
			},
			{
				menuItem: 'Infectați per zi',
				render: () => (
					<Tab.Pane>
						<DailyInfected data={ data } />
					</Tab.Pane>
				)
			},
			{
				menuItem: 'Infectați din testați per zi',
				render: () => (
					<Tab.Pane>
						<DailyTestedInfected data={ data } />
					</Tab.Pane>
				)
			},
			{
				menuItem: 'Evoluție procentuală',
				render: () => (
					<Tab.Pane>
						<Percentage data={ data } />
					</Tab.Pane>
				)
			}
		]

		return (
			<Container className="mt2 mb2">
				<Header as="h1">Statistici Covid România</Header>
				{ this.state.isLoading ? <Loading /> :
					<Tab
						menu={{
							fluid: true,
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

