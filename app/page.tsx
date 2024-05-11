'use server';
import { AppLogo } from '@components/AppLogo';
// import { fetchShops } from './actions';

const Header = () => {
	return (
		<header className="flex h-[calc(100vh-39px)] w-full flex-col items-center justify-center md:flex-row-reverse">
			<div className="flex max-h-[300px] flex-col items-center justify-center px-20 sm:px-24 md:h-auto md:max-h-[600px] md:w-1/2 md:p-4">
				<AppLogo style="blue" />
			</div>
			<div className="flex flex-col items-center justify-center p-8 md:w-1/2 md:px-4 lg:px-24">
				<h1 className="mb-8 text-center text-4xl font-bold text-black md:text-6xl">
					Agenda tu cita de <span className="-highlight-text font-bold">barbería</span> en pocos
					minutos
				</h1>
				<button className="rounded-sm bg-blue-700 px-6 py-2 font-bold text-white hover:bg-blue-900">
					Agendar
				</button>
			</div>
		</header>
	);
};

const HomePage = () => {
	// const { data, error } = await fetchShops();
	// console.log('🚀 ~ HomePage ~ data, error:', data, error);
	return (
		<>
			<Header />
		</>
	);
};

export default HomePage;
