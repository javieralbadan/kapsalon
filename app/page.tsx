'use server';

export default function HomePage() {
	return (
		<main className="flex h-screen items-center justify-center lg:px-12 xl:px-44">
			<div className="min-w-[340px]">
				<h1>Bienvenid@</h1>
				<div className="mb-4 text-lg text-neutral-500">
					Agenda tu cita con solo tu email y número de whatsapp
				</div>
				<button>Registrarme</button>
			</div>
		</main>
	);
}
