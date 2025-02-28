'use client';
import { GroupListItem } from '@/types/ui';
import { Empty, Flex } from 'antd';
import GroupListButton from './GroupListButton';

interface Props {
	dataList: GroupListItem[] | [];
	onSelectOption: (listItem: GroupListItem) => void;
	selectedItemId: string | number | null;
	vertical?: boolean;
}

export const GroupList = ({ dataList, onSelectOption, selectedItemId, vertical = true }: Props) => {
	if (dataList.length === 0) {
		return <Empty />;
	}

	return (
		<Flex gap="middle" align="center" justify="center" vertical={vertical} wrap>
			{dataList.map((listItem) => (
				<GroupListButton
					key={listItem.id}
					id={listItem.id}
					name={listItem.name}
					description={listItem.description}
					isSelected={selectedItemId === listItem.id}
					onSelectOption={() => onSelectOption(listItem)}
				/>
			))}
		</Flex>
	);
};
