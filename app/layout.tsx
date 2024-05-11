import type { Metadata } from 'next';
import React from 'react';
import '/styles/globals.scss';

export const metadata: Metadata = {
	title: 'Kapsalon · Agenda tu cita de barbería en pocos minutos',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="es">
			<head>
				<meta name="title" content="Kapsalon" />
				<meta name="description" content="Agenda tu cita de barbería en pocos minutos" />
				<meta name="keywords" content="Barbería, Corte de cabello, Barba, Afeitado, Hombre, Niño" />
				<meta name="robots" content="index, follow" />
				<meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
				<meta name="language" content="Spanish" />
				<meta name="revisit-after" content="30 days" />
				<meta name="author" content="Javier Albadán" />
				<meta name="theme-color" content="#1d4ed8" />
				<meta name="msapplication-navbutton-color" content="#1d4ed8" />
				<meta name="apple-mobile-web-app-status-bar-style" content="#1d4ed8" />
			</head>
			<body>
				<div className="relative">
					<div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#afafaf2e_1px,transparent_1px),linear-gradient(to_bottom,#afafaf2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
					<div className="content relative">{children}</div>
					<footer className="w-100 flex items-center justify-between bg-black px-4 py-2 text-white">
						<p>Hecho con ❤️ por KapsalonApp</p>
						<p>· Bogotá · 🇨🇴</p>
					</footer>
				</div>
			</body>
		</html>
	);
}
