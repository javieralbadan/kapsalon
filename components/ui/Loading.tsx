'use client';
import { Spin } from 'antd';

interface Props {
	showText?: boolean;
}

export const Loading = ({ showText = false }: Props) => {
	return <Spin size="large" tip={showText ? 'Cargando' : ''} fullscreen />;
};
