'use server';
import ShopsList from 'components/ShopsList';
import { fetchShops } from './actions';

export default async function HomePage() {
	const { data, error } = await fetchShops();

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
