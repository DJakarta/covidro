import React from 'react';
import {
	AreaChart,
	Area,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer
} from 'recharts';
import { CustomizedAxisTick } from './xtick';

export const DailyInfected = ({ finalData }) => {
	return (
		<React.Fragment>
			<h2>Infected per day</h2>
			<ResponsiveContainer width="99%" aspect={3}>
				<AreaChart
					style={{ margin: '6rem auto' }}
					width={1400}
					height={600}
					data={finalData}
					margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
				>
					<XAxis dataKey="date" tick={<CustomizedAxisTick />} />
					<YAxis domain={[0, 600]} mirror={true} />
					<CartesianGrid strokeDasharray="3 3" />
					<Tooltip />
					<Legend verticalAlign={'top'} />
					<Area
						type="monotone"
						dataKey="dailyInfected"
						dot={false}
						stroke="#FF0000"
						fill="#FF0000"
						activeDot={{ r: 8 }}
					/>
				</AreaChart>
			</ResponsiveContainer>
		</React.Fragment>
	);
};

export const DailyTestedInfected = ({ finalData }) => {
	return (
		<React.Fragment>
			<h2>Daily: tested vs. infected</h2>
			<ResponsiveContainer width="99%" aspect={3}>
				<AreaChart
					style={{ margin: '6rem auto' }}
					width={1400}
					height={600}
					data={finalData}
					margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
				>
					<XAxis dataKey="date" tick={<CustomizedAxisTick />} />
					<Legend verticalAlign={'top'} />
					<YAxis domain={[0, 18000]} mirror={true} />
					<CartesianGrid strokeDasharray="3 3" />
					<Tooltip />
					<Area
						type="monotone"
						dataKey="dailyInfected"
						dot={false}
						stroke="#FF0000"
						fill="#FF0000"
						activeDot={{ r: 8 }}
					/>
					<Area
						type="monotone"
						dataKey="newTests"
						dot={false}
						stroke="#ffa500"
						fill="#ffa500"
					/>
				</AreaChart>
			</ResponsiveContainer>
		</React.Fragment>
	);
};
