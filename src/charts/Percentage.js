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

const Percentage = ({ finalData }) => {
	return (
		<React.Fragment>
			<h2>Percentage of infected people relative to tested</h2>
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
					<YAxis domain={[0, 55]} mirror={true} />
					<CartesianGrid strokeDasharray="3 3" />
					<Tooltip />
					<Area
						type="monotone"
						dataKey="averageInfectedOfTested"
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

export default Percentage;
