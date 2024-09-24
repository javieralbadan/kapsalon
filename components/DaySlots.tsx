import { AvailabilitySlot } from '@/types/staffAvailability';

const SLOT_HEIGHT = 40;

interface Props {
	availableSlots: AvailabilitySlot[] | [];
	saveChanges?: () => void;
}

export const DaySlots = ({ availableSlots }: Props) => {
	const HOURS = Array.from({ length: 24 }, (_, i) => i);

	return (
		<div className="relative w-full">
			<div className="flex flex-col">
				{HOURS.map((hour) => (
					<div
						key={hour}
						className="flex h-10 items-start justify-between border-b border-gray-300"
					>
						<span className="text-gray-700">{hour < 12 ? `${hour} am` : `${hour - 12} pm`}</span>
					</div>
				))}
			</div>

			<div className="absolute inset-0 ml-[50px] flex w-[calc(100%-50px)] flex-col">
				{availableSlots.map(({ startTime, endTime }, index) => {
					const startNumber: number = +startTime.split(':')[0];
					const endNumber: number = +endTime.split(':')[0];
					const top = `${SLOT_HEIGHT * startNumber}px`;
					const heightNumber = (endNumber - startNumber) * SLOT_HEIGHT;
					const height = `${heightNumber}px`;
					return (
						<div
							key={index}
							className="absolute bg-green-500 bg-opacity-50"
							style={{ left: '0', right: '0', top, height }}
						>
							<span className="text-white">
								{startTime} - {endTime}
							</span>
						</div>
					);
				})}
			</div>
		</div>
	);
};
