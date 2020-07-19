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

const MainData = ({ finalData }) => {
	return (
		<React.Fragment>
			<h2>Main data (totals)</h2>
			<ResponsiveContainer width="99%" aspect={3}>
				<AreaChart
					style={{ margin: '6rem auto' }}
					width={1400}
					height={600}
					data={finalData}
					margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
				>
					<XAxis dataKey="date" tick={<CustomizedAxisTick />} />
					<YAxis domain={[0, 40000]} mirror={true} />
					<CartesianGrid strokeDasharray="3 3" />
					<Tooltip />
					<Legend verticalAlign={'top'} />
					<Area
						type="monotone"
						dataKey="totalInfected"
						dot={false}
						stroke="#FF0000"
						fill="#FF0000"
						activeDot={{ r: 8 }}
					/>
					<Area
						type="monotone"
						dataKey="cured"
						dot={false}
						stroke="#00FF00"
						fill="#00FF00"
					/>
					<Area
						type="monotone"
						dataKey="deceased"
						dot={false}
						stroke="#000000"
						fill="#000000"
					/>
				</AreaChart>
			</ResponsiveContainer>
		</React.Fragment>
	);
};

export default MainData;
