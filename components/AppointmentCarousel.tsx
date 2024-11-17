'use client';
import { AppointmentConfirmation } from '@/components/AppointmentConfirmation';
import { GroupList } from '@/components/ui/GroupList';
import { AppointmentCreationType } from '@/types/appointments';
import { StaffAvailabilityRow } from '@/types/staffAvailability';
import type { GroupListItem } from '@/types/ui';
import { getUpcomingDays, mapTimeSlotList } from '@/utils/mappers/staffAvailability';
import { Button, Carousel } from 'antd';
import { CSSProperties, useRef, useState } from 'react';

interface Props {
	barbersList: GroupListItem[] | [];
	servicesList: GroupListItem[] | [];
	shopsList: GroupListItem[] | [];
	availabilitiesList: StaffAvailabilityRow[] | [];
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
	margin: '0 auto',
	padding: '1rem',
	height: 'calc(100vh - 150px)',
	maxWidth: '800px',
	border: '1px solid gray',
	borderRadius: '1rem',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
};

const STYLES = {
	CONTENT: 'flex flex-col items-center justify-start max-h-[calc(100vh-220px)] overflow-y-auto',
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
	availabilitiesList,
}: Props) => {
	const carouselRef = useRef(null);
	const [currentStep, setCurrentStep] = useState<number>(0);
	const [timesList, setTimesList] = useState<GroupListItem[] | []>([]);
	const [appointment, setAppointment] = useState<AppointmentCreationType>({
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

	const daysList = getUpcomingDays(availabilitiesList);

	const updateTimeSlots = (dateSelected: string) => {
		const dayOfTheWeek = new Date(dateSelected).getDay();
		const availableDay = availabilitiesList.find((item) => item.day_of_week === dayOfTheWeek);
		if (!availableDay) {
			return;
		}

		const slots = mapTimeSlotList({
			date: dateSelected,
			startTime: availableDay.start_time,
			endTime: availableDay.end_time,
		});
		setTimesList(slots);
	};

	const setOption = ({ key, listItem }: SetOptionParams) => {
		setAppointment({ ...appointment, [key]: listItem });

		if (key === 'day' && typeof listItem.id === 'string') {
			updateTimeSlots(listItem.id);
		}
		swipeCarousel('next');
	};

	return (
		<>
			<Carousel
				ref={carouselRef}
				dots={false}
				draggable={false}
				infinite={false}
				style={carouselStyle}
				afterChange={(current) => setCurrentStep(current)}
			>
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
							vertical={false}
						/>
					</section>
				</div>
				<div>
					<section className={STYLES.CONTENT}>
						<AppointmentConfirmation
							appointment={appointment}
							goBack={() => swipeCarousel('prev')}
						/>
					</section>
				</div>
			</Carousel>
			{currentStep < 4 && (
				<Button
					type="link"
					className="t-0 absolute ml-[-30px]"
					onClick={() => swipeCarousel('prev')}
				>
					Atrás
				</Button>
			)}
		</>
	);
};
