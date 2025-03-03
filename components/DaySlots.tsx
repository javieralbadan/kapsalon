import { AvailabilitySlot } from '@/types/staffAvailability';
import { formatTime } from '@/utils/formatters';
import { DeleteFilled } from '@ant-design/icons';

interface Props {
	availableSlots: AvailabilitySlot[] | [];
	removeAvailability: (removeId: string) => void;
	saveChanges?: () => void;
}

const SLOT_HEIGHT = 40;
const SLOT_HALF_HEIGHT = SLOT_HEIGHT / 2;
const STARTING_HOUR = 6;

const getSlotSize = (time: string) => {
	const posYAxis: number = +time.split(':')[0] - STARTING_HOUR;
	const isHalf: boolean = time.split(':')[1] === '30';
	const halfHeight: number = isHalf ? SLOT_HALF_HEIGHT : 0;

	return { posYAxis, halfHeight };
};

export const DaySlots = ({ availableSlots, removeAvailability }: Props) => {
	return (
		<div className="relative w-full">
			<GridHours />

			<div className="absolute inset-0 ml-[60px] flex w-[calc(100%-60px)] flex-col">
				{availableSlots.map(({ id, startTime, endTime }, index) => {
					const { posYAxis: topBorder, halfHeight: startOnHalf } = getSlotSize(startTime);
					const { posYAxis: bottomBorder, halfHeight: endOnHalf } = getSlotSize(endTime);

					const topPos = topBorder * SLOT_HEIGHT + startOnHalf;
					const height = (bottomBorder - topBorder) * SLOT_HEIGHT + endOnHalf;
					const timeLabel = `${formatTime({ time24h: startTime })} - ${formatTime({
						time24h: endTime,
					})}`;

					return (
						<div
							key={index}
							className="absolute bg-green-500 bg-opacity-50 pt-4"
							style={{
								top: `${topPos}px`,
								height: `${height}px`,
								left: '0',
								right: '0',
							}}
						>
							<DeleteFilled
								className="absolute right-1 top-1"
								onClick={() => removeAvailability(id)}
							/>
							<span className="text-base font-bold text-white drop-shadow-md">{timeLabel}</span>
						</div>
					);
				})}
			</div>
		</div>
	);
};

const GridHours = () => {
	const HOURS = Array.from({ length: 24 }, (_, i) => i);
	const rowHour = HOURS.filter((value) => value >= STARTING_HOUR);

	return (
		<div className="flex flex-col">
			{rowHour.map((hour) => (
				<div key={hour} className="flex h-10 items-start justify-between border-b border-gray-300">
					<div className="w-12 text-gray-700">
						{hour}
						{hour === 6 ||
							(hour > 12 && (
								<div className="-mt-1 text-xs text-gray-400">
									({hour === 6 ? '6am' : formatTime({ time24h: `${hour}` })})
								</div>
							))}
					</div>
				</div>
			))}
		</div>
	);
};
