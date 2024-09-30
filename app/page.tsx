<<<<<<< Updated upstream
'use client';

import { AppLogo } from '@/components/AppLogo';
import { Button } from 'antd';
import Link from 'next/link';

const CLASSES = {
	FLEX_CENTER: 'flex flex-col items-center justify-center',
	CONTAINER: 'h-[calc(100vh-39px)] max-w-[1400px]',
	LOGO: 'max-h-[300px] px-20 sm:px-24 md:h-auto md:max-h-[600px] md:w-1/2 md:p-4',
};

const HomePage = () => {
	return (
		<div className={`${CLASSES.CONTAINER} ${CLASSES.FLEX_CENTER} m-auto md:flex-row-reverse`}>
			<div className={`${CLASSES.FLEX_CENTER} ${CLASSES.LOGO}`}>
				<AppLogo style="blue" />
			</div>
			<div className={`${CLASSES.FLEX_CENTER} p-8 md:w-1/2 md:px-4 lg:px-24`}>
				<h1 className="mb-8 text-center text-4xl font-bold text-black md:text-6xl">
					Agenda tu cita de <span className="-highlight-text font-bold">barbería</span> en segundos
				</h1>
				<Link href="/agendar-cita">
					<Button type="primary">Agendar</Button>
				</Link>
			</div>
		</div>
	);
};

export default HomePage;
=======
'use server';
// import { signInWithGoogle } from "@utils/auth/googleAuth";
import ShopsList from '@components/ShopsList';
// import { PostgrestError } from '@supabase/postgrest-js';
// import { Database } from 'types/supabase';
import { fetchShops } from './actions';

// type ShowRow = Database['public']['Tables']['shops']['Row'];
// interface ShowsResponseType {
//   data: ShowRow[] | null;
//   error: PostgrestError | null;
// }

export default async function HomePage() {
	const { data, error } = await fetchShops();

	// handleCreateShop
	// const handleLogin = async () => {
	//   const next =
	//     typeof searchParams.next === "string" ? searchParams.next : undefined;
	//   try {
	//     await signInWithGoogle(next);
	//   } catch (error) {
	//     console.error("Error signing in", error);
	//     //TODO: Use Alert component to show error message
	//   }
	// };

	return (
		<main className="flex h-screen items-center justify-center lg:px-12 xl:px-44">
			<div className="min-w-[340px]">
				<h1>Bienvenid@</h1>
				<div className="mb-4 text-lg text-neutral-500">
					Agenda tu cita con solo tu email y número de whatsapp
				</div>
				<ShopsList data={data} error={error} />
				<button>Registrarme</button>
			</div>
		</main>
	);
}
>>>>>>> Stashed changes
