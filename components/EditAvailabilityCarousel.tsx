'use client';
import { AvailabilitySlot, StaffAvailabilityRow } from '@/types/staffAvailability';
import { Button, Carousel, TimePicker } from 'antd';
import dayjs from 'dayjs';
import { CSSProperties, useRef, useState } from 'react';
import { DaySlots } from './DaySlots';
const { RangePicker } = TimePicker;

interface Props {
	availabilitiesList: StaffAvailabilityRow[] | [];
	saveChanges?: () => void;
}

const carouselStyle: CSSProperties = {
	margin: '0 auto',
	padding: '1rem',
	height: 'calc(100vh - 180px)',
	maxWidth: '800px',
	border: '1px solid gray',
	borderRadius: '1rem',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
};

const STYLES = {
	CONTENT:
		'flex flex-col items-center justify-start max-h-[calc(100vh-220px)] w-[calc(100%-40px)] m-auto px-4 overflow-y-auto',
	TITLE: 'mb-4',
};

export const EditAvailabilityCarousel = ({ availabilitiesList, saveChanges }: Props) => {
	const carouselRef = useRef(null);
	// const [minDate, setMinDate] = useState<Dayjs | undefined>(undefined);
	// const [maxDate, setMaxDate] = useState<Dayjs | undefined>(undefined);
	// const [timesList, setTimesList] = useState<GroupListItem[] | []>([]);
	const [newSlots, setSlots] = useState<StaffAvailabilityRow | undefined>(undefined);

	const DAYS_NAMES = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

	// const setSlot = (listItem: GroupListItem) => {
	// 	console.log('🚀 ~ setSlot:', listItem);
	// };

	const getAvailableSlots = (index: number): AvailabilitySlot[] => {
		return availabilitiesList
			.filter((d) => d.day_of_week === index)
			.map((d) => ({
				startTime: d.start_time,
				endTime: d.end_time,
			})) as AvailabilitySlot[];
	};

	const onConfirm = () => {
		console.log('🚀 ~ onConfirm:', newSlots);
		setSlots(newSlots);
		saveChanges && saveChanges();
	};

	return (
		<>
			<Button type="primary" onClick={() => onConfirm()} className="my-4">
				Guardar cambios
			</Button>
			<Carousel
				ref={carouselRef}
				arrows={true}
				style={carouselStyle}
				className="bg-white bg-opacity-50"
			>
				{DAYS_NAMES.map((day, index) => {
					const availableSlots = getAvailableSlots(index);
					return (
						<div key={index}>
							<section className={STYLES.CONTENT}>
								<h2 className={STYLES.TITLE}>{day}:</h2>

								<RangePicker
									format={'h:mm a'}
									minuteStep={30}
									mode={['time', 'time']}
									minDate={dayjs('2024-09-24 8:00')}
									maxDate={dayjs('2024-09-24 22:00')}
									needConfirm={false}
									use12Hours
								/>

								<Button type="default" onClick={() => onConfirm()} className="my-4">
									Agregar rango
								</Button>

								<p className="my-1 text-gray-500">Rangos en este día: {availableSlots.length}</p>
								<DaySlots availableSlots={availableSlots} />
							</section>
						</div>
					);
				})}
			</Carousel>
		</>
	);
};
