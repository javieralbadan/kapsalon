'use client';
import { GroupList } from '@/components/ui/GroupList';
import { Button, Card, Carousel, Flex } from 'antd';
import { CSSProperties, useRef, useState } from 'react';
import type { GroupListItem } from 'types/ui';

interface Props {
	barbersList: GroupListItem[] | [];
	servicesList: GroupListItem[] | [];
	shopsList: GroupListItem[] | [];
	daysList: GroupListItem[] | [];
	timesList: GroupListItem[] | [];
	confirmAppointment?: () => void;
}

interface AppointmentType {
	barber: GroupListItem;
	service: GroupListItem;
	day: GroupListItem;
	time: GroupListItem;
}

interface SetOptionParams {
	key: 'barber' | 'service' | 'day' | 'time';
	listItem: GroupListItem;
}

interface CarouselMethods {
	next: () => void;
	prev: () => void;
}

const carouselStyle: CSSProperties = {
	margin: 0,
	height: 'calc(100vh - 180px)',
	border: '1px solid gray',
	borderRadius: '1rem',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
};

const STYLES = {
	CONTENT: 'flex flex-col items-center justify-center min-h-[400px]',
	TITLE: 'mb-4',
};

const getShop = (shopsList: GroupListItem[]) => {
	const mainShop = shopsList[0].name;

	return <p className="mt-4">Próximamente más barberos de {mainShop}</p>;
};

export const AppointmentCarousel = ({
	barbersList,
	servicesList,
	shopsList,
	daysList,
	timesList,
	confirmAppointment,
}: Props) => {
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

		(carouselRef.current as CarouselMethods)[step]();
	};

	const setOption = ({ key, listItem }: SetOptionParams) => {
		setAppointment({ ...appointment, [key]: listItem });
		swipeCarousel('next');
	};

	const onConfirm = () => {
		console.log('🚀 ~ onConfirm:', appointment);
		confirmAppointment && confirmAppointment();
	};

	return (
		<>
			<Carousel ref={carouselRef} dots={false} infinite={false} style={carouselStyle}>
				<div>
					<section className={STYLES.CONTENT}>
						<h2 className={STYLES.TITLE}>Barbero:</h2>
						<GroupList
							dataList={barbersList}
							onSelectOption={(listItem) => setOption({ key: 'barber', listItem })}
						/>
						{barbersList.length === 1 && getShop(shopsList)}
					</section>
				</div>
				<div>
					<section className={STYLES.CONTENT}>
						<h2 className={STYLES.TITLE}>Servicio:</h2>
						<GroupList
							dataList={servicesList}
							onSelectOption={(listItem) => setOption({ key: 'service', listItem })}
						/>
					</section>
				</div>
				<div>
					<section className={STYLES.CONTENT}>
						<h2 className={STYLES.TITLE}>Día:</h2>
						<GroupList
							dataList={daysList}
							onSelectOption={(listItem) => setOption({ key: 'day', listItem })}
						/>
					</section>
				</div>
				<div>
					<section className={STYLES.CONTENT}>
						<h2 className={STYLES.TITLE}>Hora:</h2>
						<GroupList
							dataList={timesList}
							onSelectOption={(listItem) => setOption({ key: 'time', listItem })}
						/>
					</section>
				</div>
				<div>
					<section className={STYLES.CONTENT}>
						<Card title="Está todo bien?" bordered={true} className="m-auto w-[300px]">
							<p>Barbero: {appointment.barber.name}</p>
							<p>Servicio: {appointment.service.name}</p>
							<p>
								{appointment.day.name}, {appointment.time.name}
							</p>

							<Flex gap="small" className="mt-4">
								<Button danger onClick={() => swipeCarousel('prev')}>
									Editar algo
								</Button>
								<Button onClick={() => onConfirm()}>Si, confirmar cita</Button>
							</Flex>
						</Card>
					</section>
				</div>
			</Carousel>
			<Button
				type="link"
				onClick={() => swipeCarousel('prev')}
				className="t-0 absolute ml-[-30px] mt-[-40px]"
			>
				Atrás
			</Button>
		</>
	);
};
