import { Breadcrumb } from 'antd';
import Link from 'next/link';

const LegalBreadcrumb = ({ currentPage }: { currentPage: string }) => {
	const items = [
		{ title: <Link href="/">Home</Link> },
		{ title: <Link href="/legal">Legal</Link> },
	];

	if (currentPage) {
		items.push({
			title: <span>{currentPage}</span>,
		});
	}

	return <Breadcrumb items={items} style={{ margin: '1rem 0' }} />;
};

export default LegalBreadcrumb;
