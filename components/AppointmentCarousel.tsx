'use client';

import { GroupList } from '@/components/ui/GroupList';
import { Button, Carousel, Descriptions, DescriptionsProps } from 'antd';
import { CSSProperties, useRef, useState } from 'react';
import type { GroupListItem } from 'types/ui';

interface Props {
	barbersList: GroupListItem[];
	servicesList: GroupListItem[];
	daysList: GroupListItem[];
	timesList: GroupListItem[];
}

interface AppointmentType {
	barber: GroupListItem;
	service: GroupListItem;
	day: GroupListItem;
	time: GroupListItem;
}

interface SetOptionProps {
	key: 'barber' | 'service' | 'day' | 'time';
	listItem: GroupListItem;
}

const carouselStyle: CSSProperties = {
	margin: 0,
	height: 'calc(100vh - 172px)',
	border: '1px solid gray',
	borderRadius: '1rem',
	display: 'flex',
	alignItems: 'center',
};

const contentStyle: CSSProperties = {
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	alignItems: 'center',
	minHeight: '400px',
};

const titleStyle: CSSProperties = {
	// margin: 0,
};

export const AppointmentCarousel = ({ barbersList, servicesList, daysList, timesList }: Props) => {
	const carouselRef = useRef(null);
	const [appointment, setAppointment] = useState<AppointmentType>({
		barber: { id: '' },
		service: { id: '' },
		day: { id: '' },
		time: { id: '' },
	});

	const swipeCarousel = (step: 'next' | 'prev') => {
		if (!carouselRef?.current) {
			return;
		}

		// eslint-disable-next-line @typescript-eslint/no-unsafe-call
		step === 'next' ? carouselRef.current.next() : carouselRef.current.prev();
	};

	const setOption = ({ key, listItem }: SetOptionProps) => {
		setAppointment({ ...appointment, [key]: listItem });
		swipeCarousel('next');
	};

	const items: DescriptionsProps['items'] = [
		{
			key: '1',
			label: 'Barbero',
			children: appointment.barber.text,
		},
		{
			key: '2',
			label: 'Servicio',
			children: appointment.service.text,
		},
		{
			key: '3',
			label: 'Día',
			children: appointment.day.text,
		},
		{
			key: '4',
			label: 'Hora',
			span: 2,
			children: appointment.time.text,
		},
	];

	const confirmAppointment = () => {
		console.log('🚀 ~ confirmAppointment:', appointment);
	};

	return (
		<>
			<Button type="link" onClick={() => swipeCarousel('prev')}>
				Atrás
			</Button>
			<Carousel
				ref={carouselRef}
				dots={{ className: 'carousel-blue-dots' }}
				infinite={false}
				style={carouselStyle}
			>
				<div style={contentStyle}>
					<h2 style={titleStyle}>Barbero:</h2>
					{barbersList.length === 1 && <p className="mb-4">Próximamente más barberos</p>}
					<GroupList
						dataList={barbersList}
						onSelectOption={(listItem) => setOption({ key: 'barber', listItem })}
					/>
				</div>
				<div style={contentStyle}>
					<h2 style={titleStyle}>Servicio:</h2>
					<GroupList
						dataList={servicesList}
						onSelectOption={(listItem) => setOption({ key: 'service', listItem })}
					/>
				</div>
				<div style={contentStyle}>
					<h2 style={titleStyle}>Día:</h2>
					<GroupList
						dataList={daysList}
						onSelectOption={(listItem) => setOption({ key: 'day', listItem })}
					/>
				</div>
				<div style={contentStyle}>
					<h2 style={titleStyle}>Hora:</h2>
					<GroupList
						dataList={timesList}
						onSelectOption={(listItem) => setOption({ key: 'time', listItem })}
					/>
				</div>
				<div style={contentStyle}>
					<Descriptions title="Confirmación:" layout="horizontal" column={1} items={items} />
					<Button type="primary" onClick={() => confirmAppointment()}>
						Confirmar cita
					</Button>
				</div>
			</Carousel>
		</>
	);
};
