import React from 'react';
import { hot } from "react-hot-loader/root";
import { Header } from './components/Header';
import { Main } from './components/Main';
import { Timer } from './components/Main/Timer';
import { Work } from './components/Main/Work';
import './styles/global.main.scss';

function AppComponent() {
	return (
		<>
			<Header />
			<Main>
				<Work />
				<Timer />
			</Main>

		</>
	);
}

export const App = hot(() => <AppComponent />);
