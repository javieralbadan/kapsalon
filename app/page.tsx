'use server';
import { AppLogo } from '@/components/AppLogo';
import { BUTTONS, CONTAINER } from '@/constants/ui-classes';
import Link from 'next/link';

// import { fetchShops } from './actions';

const Header = () => {
	const FLEX_CENTER = 'flex flex-col items-center justify-center';
	return (
		<header className={`${CONTAINER.FULL_HEIGHT} ${FLEX_CENTER} md:flex-row-reverse`}>
			<div
				/* eslint-disable-next-line max-len */
				className={`${FLEX_CENTER} max-h-[300px] px-20 sm:px-24 md:h-auto md:max-h-[600px] md:w-1/2 md:p-4`}
			>
				<AppLogo style="blue" />
			</div>
			<div className={`${FLEX_CENTER} p-8 md:w-1/2 md:px-4 lg:px-24`}>
				<h1 className="mb-8 text-center text-4xl font-bold text-black md:text-6xl">
					Agenda tu cita de <span className="-highlight-text font-bold">barbería</span> en pocos
					minutos
				</h1>
				<Link href="/agendar-cita" className={BUTTONS.BLUE}>
					Agendar
				</Link>
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
