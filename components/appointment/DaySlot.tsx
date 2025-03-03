import { GroupListItem } from '@/types/ui';
import GroupListButton from './GroupListButton';

interface Props {
	timeSlots: GroupListItem[];
	selectedItemId: string | number | null;
	onSelectOption: (listItem: GroupListItem) => void;
}

const DaySlot = ({ timeSlots, selectedItemId, onSelectOption }: Props) => (
	<div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8">
		{timeSlots.map(({ id, name }) => {
			return (
				<GroupListButton
					key={id}
					id={id}
					name={name}
					isSelected={selectedItemId === id}
					onSelectOption={() => onSelectOption({ id, name })}
				/>
			);
		})}
	</div>
);

export default DaySlot;
