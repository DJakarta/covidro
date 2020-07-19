import React from 'react';
import './styles.css';
import Home from './Home';
import echarts from 'echarts';
import map from './data/map';

echarts.registerMap('RO', map);

export default function App() {
	return <Home />;
}
