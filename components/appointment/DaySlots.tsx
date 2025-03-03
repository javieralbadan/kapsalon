import { Loading } from '@/components/ui/Loading';
import { SCHEDULE_APPOINTMENT } from '@/constants/dates';
import { SlotContentProps } from '@/types/appointments';
import { GroupListItem } from '@/types/ui';
import { getDayTimeRange, getUpcomingDays } from '@/utils/mappers/staffAvailability';
import { Button, Empty } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import GroupListButton from './GroupListButton';

const DaySlots = ({ availablities, selectedItemId, setOption }: SlotContentProps) => {
	const [dayTimeMap, setDayTimeMap] = useState<Map<string, GroupListItem[]>>(new Map());
	const [extensionCount, setExtensionCount] = useState<number>(0);
	const [isLoading, setIsLoading] = useState(true);

	const daysList = getUpcomingDays(availablities, extensionCount);

	const updateDayTimeMap = useCallback(
		(extensionCount: number) => {
			const dayTimeRange = getDayTimeRange({ availablities, extensionCount, dayTimeMap });
			setDayTimeMap(dayTimeRange);
		},
		[availablities, dayTimeMap],
	);

	useEffect(() => {
		const initData = async () => {
			// eslint-disable-next-line @typescript-eslint/await-thenable
			await updateDayTimeMap(0);
			setIsLoading(false);
		};
		void initData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleShowMoreDays = () => {
		if (extensionCount < SCHEDULE_APPOINTMENT.MAX_DAYS_EXTENSIONS) {
			setIsLoading(true);
			const newExtensionCount = extensionCount + 1;
			setExtensionCount(newExtensionCount);
			updateDayTimeMap(newExtensionCount);
			setIsLoading(false);
		}
	};

	if (isLoading || dayTimeMap.size === 0) {
		return <Loading />;
	}

	if (availablities.length === 0) return <Empty />;

	return (
		<>
			{Array.from(dayTimeMap.entries()).map(([dateString, timeSlots]) => {
				const dayItem = daysList.find((day) => day.id === dateString);
				if (!dayItem) return <Empty key="empty" />;

				return (
					<div key={dateString} className="mb-4 w-full border-b pb-4 last:border-b-0">
						<h3 className="mb-2 font-medium">{dayItem.name}</h3>
						<div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8">
							{timeSlots.map(({ id, name }) => (
								<GroupListButton
									key={id}
									id={id}
									name={name}
									isSelected={selectedItemId === id}
									onSelectOption={(listItem) => setOption({ key: 'dayTime', listItem })}
								/>
							))}
						</div>
					</div>
				);
			})}

			{extensionCount < SCHEDULE_APPOINTMENT.MAX_DAYS_EXTENSIONS && (
				<Button className="mx-auto mt-4 block" onClick={() => void handleShowMoreDays()}>
					↓ Mostrar más días ↓
				</Button>
			)}
		</>
	);
};

export default DaySlots;
