'use client';
import { GroupListItem } from '@/types/ui';
import { Button, Empty, Flex } from 'antd';

interface Props {
	dataList: GroupListItem[];
	onSelectOption: (listItem: GroupListItem) => void;
}

export const GroupList = ({ dataList, onSelectOption }: Props) => {
	return (
		<Flex gap="small" align="center" justify="center" wrap>
			{dataList.length ? (
				dataList.map((listItem) => {
					return (
						<Button
							key={listItem.id}
							className="flex h-full flex-col items-center gap-0"
							type="dashed"
							size="large"
							onClick={() => onSelectOption(listItem)}
						>
							<span className="text-base leading-4">{listItem.name}</span>
							{listItem.description && (
								<span className="text-xs leading-4 text-green-700">{listItem.description}</span>
							)}
						</Button>
					);
				})
			) : (
				<Empty />
			)}
		</Flex>
	);
};
