import { GroupList } from '@/components/appointment/GroupList';
import { useisMobile } from '@/hooks/useIsMobile';
import {
	AppointmentCreationType,
	AppointmentStepperProps,
	BarbersContentProps,
	ServicesContentProps,
	SetOptionParams,
	SlotContentProps,
} from '@/types/appointments';
import type { GroupListItem } from '@/types/ui';
import { getUpcomingDays, mapTimeSlotList } from '@/utils/mappers/staffAvailability';
import { Button, Steps } from 'antd';
import { useEffect, useState } from 'react';
import AppointmentConfirmation from './AppointmentConfirmation';
import DaySlot from './DaySlot';

const STYLES = {
	CONTAINER:
		'max-w-[800px] mx-auto p-4 border border-gray-300 rounded-2xl flex flex-col min-h-[calc(100vh-180px)]',
	CONTENT: 'flex flex-col items-center flex-grow overflow-y-auto',
	CONTENT_INNER: 'w-full py-4',
	TITLE: 'mb-4 text-lg font-semibold',
};

const AppointmentStepper = ({
	barbers,
	services,
	shops,
	availablities,
}: AppointmentStepperProps) => {
	const isMobile = useisMobile();
	const [currentStep, setCurrentStep] = useState<number>(0);
	const [dayTimeMap, setDayTimeMap] = useState<Map<string, GroupListItem[]>>(new Map());
	const [appointment, setAppointment] = useState<AppointmentCreationType>({
		barber: { id: '', name: '' },
		service: { id: '', name: '' },
		dayTime: { id: '', name: '' },
	});

	useEffect(() => {
		if (availablities.length === 0) return;

		const daysList = getUpcomingDays(availablities);
		const dayTimeRange = new Map<string, GroupListItem[]>();

		daysList.forEach((day) => {
			const dateISOString = day.id as string;
			const dayOfWeek = new Date(dateISOString).getDay();

			const availableDay = availablities.find((item) => item.day_of_week === dayOfWeek);
			if (!availableDay) return;

			const timeSlots = mapTimeSlotList({
				dateISOString,
				startTime: availableDay.start_time,
				endTime: availableDay.end_time,
			});

			dayTimeRange.set(dateISOString, timeSlots);
		});

		setDayTimeMap(dayTimeRange);
	}, [availablities]);

	const setOption = ({ key, listItem }: SetOptionParams) => {
		setAppointment({ ...appointment, [key]: listItem });
		nextStep();
	};

	const prevStep = () => setCurrentStep(currentStep - 1);
	const nextStep = () => setCurrentStep(currentStep + 1);

	const steps = [
		{
			title: 'Barbero',
			content: (
				<BarbersContent
					list={barbers}
					selectedItemId={appointment.barber.id}
					shops={shops}
					setOption={setOption}
				/>
			),
		},
		{
			title: 'Servicio',
			content: (
				<ServicesContent
					list={services}
					selectedItemId={appointment.service.id}
					setOption={setOption}
				/>
			),
		},
		{
			title: 'Día y Hora',
			content: (
				<SlotsContent
					list={dayTimeMap}
					slots={availablities}
					selectedItemId={appointment.dayTime.id}
					setOption={setOption}
				/>
			),
		},
		{
			title: 'Confirmación',
			content: <AppointmentConfirmation appointment={appointment} goBack={prevStep} />,
		},
	];

	return (
		<div className={STYLES.CONTAINER}>
			<div className="mb-4">
				<Steps
					current={currentStep}
					items={steps.map(({ title }) => ({ title }))}
					type={isMobile ? 'inline' : 'default'}
				/>
			</div>

			<div className="flex justify-start">
				<Button color="blue" variant="dashed" disabled={currentStep === 0} onClick={prevStep}>
					← Atrás
				</Button>
			</div>

			<section className={STYLES.CONTENT}>
				<div className={STYLES.CONTENT_INNER}>{steps[currentStep].content}</div>
			</section>
		</div>
	);
};

const BarbersContent = ({ list, selectedItemId, shops, setOption }: BarbersContentProps) => (
	<>
		<h2 className={STYLES.TITLE}>Selecciona un barbero:</h2>
		<GroupList
			dataList={list}
			onSelectOption={(listItem) => setOption({ key: 'barber', listItem })}
			selectedItemId={selectedItemId}
		/>
		{list.length === 1 && <p className="mt-4">Próximamente más barberos de {shops[0].name}</p>}
	</>
);

const ServicesContent = ({ list, selectedItemId, setOption }: ServicesContentProps) => (
	<>
		<h2 className={STYLES.TITLE}>Selecciona un servicio:</h2>
		<GroupList
			dataList={list}
			onSelectOption={(listItem) => setOption({ key: 'service', listItem })}
			selectedItemId={selectedItemId}
		/>
	</>
);

const SlotsContent = ({ list, slots, selectedItemId, setOption }: SlotContentProps) => (
	<>
		<h2 className={STYLES.TITLE}>Selecciona día y hora:</h2>
		{list.size > 0 ? (
			Array.from(list.entries()).map(([dateString, timeSlots]) => {
				const daysList = getUpcomingDays(slots);
				const dayItem = daysList.find((day) => day.id === dateString);
				if (!dayItem) return null;

				return (
					<div key={dateString} className="mb-4 w-full border-b pb-4 last:border-b-0">
						<h3 className="mb-2 font-medium">{dayItem.name}</h3>
						<DaySlot
							timeSlots={timeSlots}
							selectedItemId={selectedItemId}
							onSelectOption={(listItem) => setOption({ key: 'dayTime', listItem })}
						/>
					</div>
				);
			})
		) : (
			<p>No hay horarios disponibles</p>
		)}
	</>
);

export default AppointmentStepper;
