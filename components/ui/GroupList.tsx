'use client';
import { Button, Flex } from 'antd';
import { GroupListItem } from 'types/ui';

interface Props {
	dataList: GroupListItem[];
	onSelectOption: (listItem: GroupListItem) => void;
}

export const GroupList = ({ dataList, onSelectOption }: Props) => {
	return (
		<Flex gap="small" align="center" justify="center" wrap>
			{dataList.map((listItem) => {
				return (
					<Button
						key={listItem.id}
						type="dashed"
						size="large"
						onClick={() => onSelectOption(listItem)}
					>
						{listItem.text}
					</Button>
				);
			})}
		</Flex>
	);
};
