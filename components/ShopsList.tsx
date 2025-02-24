'use client';
import { ShopsResponseType } from 'types/shops';

export default function ShopsList({ data: shops, error }: ShopsResponseType) {
	if (error) {
		return <div>Error {error.message}</div>;
	}

	return (
		<main className="flex h-screen items-center justify-center lg:px-12 xl:px-44">
			<div className="min-w-[340px]">
				<h1>Shops List</h1>
				<div className="mb-4 text-lg text-neutral-500">
					{shops &&
						shops?.map((shop) => {
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
