'use client';
<<<<<<< Updated upstream
import { ShopsResponseType } from 'types/shops';

export default function ShopsList({ data: shops, error }: ShopsResponseType) {
=======
import { PostgrestError } from '@supabase/supabase-js';
import { Database } from 'types/supabase';

type ShopRow = Database['public']['Tables']['shops']['Row'];

interface ShowsResponseType {
	data: ShopRow[] | null;
	error: PostgrestError | null;
}

export default function ShopsList({ data: shops, error }: ShowsResponseType) {
>>>>>>> Stashed changes
	if (error) {
		return <div>Error {error.message}</div>;
	}

	return (
		<main className="flex h-screen items-center justify-center lg:px-12 xl:px-44">
			<div className="min-w-[340px]">
				<h1>Shops List</h1>
				<div className="mb-4 text-lg text-neutral-500">
					{shops?.map((shop) => {
						return (
							<ul key={shop.id}>
								<li>{shop.id}</li>
								<li>{shop.name}</li>
								<li>{shop.address}</li>
								<li>{shop.created_at}</li>
							</ul>
						);
					})}
				</div>
			</div>
		</main>
	);
}
