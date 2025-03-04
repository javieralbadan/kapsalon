import Link from 'next/link';
import { CSSProperties } from 'react';

export const FOOTER_STYLES: CSSProperties = {
	zIndex: 1,
	padding: 0,
	position: 'fixed',
	bottom: 0,
	width: '100%',
};

const FOOTER_CONTENT_STYLES: CSSProperties = {
	width: '100%',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	backgroundColor: '#060606',
	color: 'white',
	padding: '0.5rem 1rem',
};

const AppFooter = () => {
	return (
		<div style={FOOTER_CONTENT_STYLES}>
			<p>
				Hecho con ❤️ por <Link href="/">KapsalonApp</Link>
			</p>
			<p>
				<Link href="/legal">Legal</Link>
			</p>
		</div>
	);
};

export default AppFooter;
