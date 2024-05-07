import type { Metadata } from 'next';
import React from 'react';
import '../assets/styles/globals.scss';

export const metadata: Metadata = {
	title: 'Kapsalon · Agenda tu cita de barbería en pocos minutos',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}
