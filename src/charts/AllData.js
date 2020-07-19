import React from 'react';
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer
} from 'recharts';
import { CustomizedAxisTick } from './xtick';

const AllData = ({ finalData }) => {
	return (
		<React.Fragment>
			<h2>(Pretty much) All data</h2>
			<ResponsiveContainer width="99%" aspect={3}>
				<LineChart
					style={{ margin: '6rem auto' }}
					width={1400}
					height={600}
					data={finalData}
					margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
				>
					<XAxis dataKey="date" tick={<CustomizedAxisTick />} />
					<YAxis domain={[0, 850000]} mirror={true} />
					<CartesianGrid strokeDasharray="3 3" />
					<Tooltip />
					<Legend verticalAlign={'top'} />
					<Line
						type="monotone"
						dataKey="totalTests"
						dot={false}
						stroke="#981ceb"
					/>
					<Line
						type="monotone"
						dataKey="totalInfected"
						dot={false}
						stroke="#FF0000"
						activeDot={{ r: 8 }}
					/>
					<Line
						type="monotone"
						dataKey="cured"
						dot={false}
						stroke="#00FF00"
					/>
					<Line
						type="monotone"
						dataKey="deceased"
						dot={false}
						stroke="#000000"
					/>
					<Line
						type="monotone"
						dataKey="newTests"
						dot={false}
						stroke="#0000ff"
					/>
					<Line
						type="monotone"
						dataKey="dailyInfected"
						dot={false}
						stroke="#FF4500"
					/>
				</LineChart>
			</ResponsiveContainer>
		</React.Fragment>
	);
};

export default AllData;
