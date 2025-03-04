'use client';
import LegalBreadcrumb from '@/components/layout/LegalBreadcrumb';
import { Collapse, CollapseProps, Typography } from 'antd';
import FAQS_DATA from './faqs.json';

const { Title } = Typography;

const FAQSPage = () => {
	const faqs = FAQS_DATA as { question: string; answer: string }[];
	const items: CollapseProps['items'] = faqs.map((item, index) => ({
		key: index,
		label: item.question,
		children: <p>{item.answer}</p>,
	}));

	return (
		<section className="legal-container">
			<LegalBreadcrumb currentPage="Preguntas Frecuentes" />

			<Title level={2}>PREGUNTAS FRECUENTES</Title>
			<div style={{ padding: '2rem 4rem', maxWidth: '800px', margin: '0 auto' }}>
				<Collapse items={items} defaultActiveKey={['0']} />;
			</div>
		</section>
	);
};

export default FAQSPage;
