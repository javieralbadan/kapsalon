import { SetOptionParams } from '@/types/appointments';
import { GroupListItem } from '@/types/ui';
import { Button } from 'antd';

interface Props {
	dateString: string;
	dayItem: GroupListItem;
	timeSlots: GroupListItem[];
	setOption: (params: SetOptionParams) => void;
}

const DaySlot = ({ dateString, dayItem, timeSlots, setOption }: Props) => (
	<div key={dateString} className="mb-4 w-full border-b pb-4 last:border-b-0">
		<h3 className="mb-2 font-medium">{dayItem.name}</h3>

		<div className="flex flex-wrap justify-center gap-2">
			{timeSlots.map((timeSlot) => (
				<Button
					key={timeSlot.id}
					onClick={() =>
						setOption({
							key: 'dayTime',
							listItem: dayItem,
							timeItem: timeSlot,
						})
					}
				>
					{timeSlot.name}
				</Button>
			))}
		</div>
	</div>
);

export default DaySlot;
