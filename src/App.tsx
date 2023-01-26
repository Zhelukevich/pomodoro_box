import React, { useEffect, useState } from 'react';
import './styles/global.main.scss';

import { hot } from 'react-hot-loader/root';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { StatisticsPage } from './pages/StatisticsPage';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Provider } from 'react-redux';
import { store } from './store/store';
import { useAppDispatch } from './hooks';
import { setCurrentDateEmptyItem } from './store/slice/statSlice';
import { CurrentContextProvider } from './context/currentContext';

function AppWrap() {
	const [mounted, setMounted] = useState(false);
	const dispatch = useAppDispatch();

	useEffect(() => {
		setMounted(true);

		dispatch(setCurrentDateEmptyItem());

	}, []);

	return (
		<>
			{mounted && (
				<BrowserRouter>
					<Layout>
						<Routes>
							<Route path="/stat" element={<StatisticsPage />} />

							<Route path="/" element={<HomePage />} />
						</Routes>
					</Layout>
				</BrowserRouter>
			)}
		</>
	);
}

export const App = hot(() => (
	<Provider store={store}>
		<CurrentContextProvider>
			<AppWrap />
		</CurrentContextProvider>
	</Provider>
));
