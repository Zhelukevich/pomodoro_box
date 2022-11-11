import React, { useEffect, useState } from 'react';
import './styles/global.main.scss';

import { hot } from "react-hot-loader/root";
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { StatisticsPage } from './pages/StatisticsPage';

import { BrowserRouter, Routes, Route } from "react-router-dom";


function AppWrap() {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	return (
		<>
			{mounted && (
				<BrowserRouter>
					<Layout>
						<Routes>
							<Route path='/stat' element={<StatisticsPage />} />
							<Route path='/' element={<HomePage />} />
						</Routes>
					</Layout>
				</BrowserRouter>
			)}
		</>
	);
}




function AppComponent() {
	return (
		<AppWrap />
	);
}

export const App = hot(() => <AppComponent />);
