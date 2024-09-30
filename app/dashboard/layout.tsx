export default function DashboardLayout({ children }: { children: React.ReactNode }) {
	return (
		<section className="flex h-screen flex-col p-6">
			<header>Kapsalon</header>
			<section className="flex h-full w-full flex-col lg:flex-row">
				<nav>
					<a href="">Home</a>
					<a href="">Agendar cita</a>
					<a href="">Mis citas</a>
				</nav>
				<main className="h-full w-full">{children}</main>
			</section>
		</section>
	);
}
