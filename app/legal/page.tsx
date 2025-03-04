'use client';
import LegalBreadcrumb from '@/components/layout/LegalBreadcrumb';
import { Typography } from 'antd';
import Link from 'next/link';

const { Title, Paragraph } = Typography;

const LegalPage = () => {
	return (
		<section className="legal-container">
			<LegalBreadcrumb currentPage="" />

			<Title level={2}>LEGAL</Title>

			<Paragraph className="flex flex-col gap-3">
				<Link href="/legal/terminos-y-condiciones">Términos y Condiciones</Link>
				<Link href="/legal/condiciones-del-servicio">Condiciones del Servicio</Link>
				<Link href="/legal/politica-de-privacidad">Política de Privacidad</Link>
				<Link href="/legal/preguntas-frecuentes">Preguntas Frecuentes</Link>
				<Link href="/legal/eliminar-datos">Eliminar Datos</Link>
			</Paragraph>
		</section>
	);
};

export default LegalPage;
