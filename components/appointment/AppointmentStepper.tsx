import { GroupList } from '@/components/ui/GroupList';
import { IS_MOBILE } from '@/constants/ui';
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

const AppointmentStepper = ({ barbers, services, shops, slots }: AppointmentStepperProps) => {
	const [currentStep, setCurrentStep] = useState<number>(0);
	const [dayTimeMap, setDayTimeMap] = useState<Map<string, GroupListItem[]>>(new Map());
	const [appointment, setAppointment] = useState<AppointmentCreationType>({
		barber: { id: '' },
		service: { id: '' },
		day: { id: '' },
		time: { id: '' },
	});

	useEffect(() => {
		if (slots.length === 0) return;

		const daysList = getUpcomingDays(slots);
		const newDayTimeMap = new Map<string, GroupListItem[]>();

		daysList.forEach((day) => {
			const dateString = day.id as string;
			const dayOfWeek = new Date(dateString).getDay();

			const availableDay = slots.find((item) => item.day_of_week === dayOfWeek);
			if (!availableDay) return;

			const mappedSlots = mapTimeSlotList({
				date: dateString,
				startTime: availableDay.start_time,
				endTime: availableDay.end_time,
			});

			newDayTimeMap.set(dateString, mappedSlots);
		});

		setDayTimeMap(newDayTimeMap);
	}, [slots]);

	const setOption = ({ key, listItem, timeItem }: SetOptionParams) => {
		if (key === 'dayTime' && timeItem) {
			setAppointment({
				...appointment,
				day: listItem,
				time: timeItem,
			});
		} else {
			setAppointment({ ...appointment, [key]: listItem });
		}

		nextStep();
	};

	const prevStep = () => setCurrentStep(currentStep - 1);
	const nextStep = () => setCurrentStep(currentStep + 1);

	const steps = [
		{
			title: 'Barbero',
			content: <BarbersContent list={barbers} shops={shops} setOption={setOption} />,
		},
		{
			title: 'Servicio',
			content: <ServicesContent list={services} setOption={setOption} />,
		},
		{
			title: 'Día y Hora',
			content: <SlotsContent list={dayTimeMap} slots={slots} setOption={setOption} />,
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
					type={IS_MOBILE ? 'inline' : 'default'}
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

const BarbersContent = ({ list, shops, setOption }: BarbersContentProps) => (
	<>
		<h2 className={STYLES.TITLE}>Selecciona un barbero:</h2>
		<GroupList
			dataList={list}
			onSelectOption={(listItem) => setOption({ key: 'barber', listItem })}
		/>
		{list.length === 1 && <p className="mt-4">Próximamente más barberos de {shops[0].name}</p>}
	</>
);

const ServicesContent = ({ list, setOption }: ServicesContentProps) => (
	<>
		<h2 className={STYLES.TITLE}>Selecciona un servicio:</h2>
		<GroupList
			dataList={list}
			onSelectOption={(listItem) => setOption({ key: 'service', listItem })}
		/>
	</>
);

const SlotsContent = ({ list, slots, setOption }: SlotContentProps) => (
	<>
		<h2 className={STYLES.TITLE}>Selecciona día y hora:</h2>
		{list.size > 0 ? (
			Array.from(list.entries()).map(([dateString, timeSlots]) => {
				const daysList = getUpcomingDays(slots);
				const dayItem = daysList.find((day) => day.id === dateString);
				if (!dayItem) return null;

				return (
					<DaySlot
						key={dateString}
						dateString={dateString}
						dayItem={dayItem}
						timeSlots={timeSlots}
						setOption={setOption}
					/>
				);
			})
		) : (
			<p>No hay horarios disponibles</p>
		)}
	</>
);

export default AppointmentStepper;
