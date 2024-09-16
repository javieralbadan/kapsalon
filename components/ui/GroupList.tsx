'use client';
import { GroupListItem } from '@/types/ui';
import { Button, Empty, Flex } from 'antd';

interface Props {
	dataList: GroupListItem[];
	onSelectOption: (listItem: GroupListItem) => void;
	vertical?: boolean;
}

export const GroupList = ({ dataList, onSelectOption, vertical = true }: Props) => {
	return (
		<Flex gap="middle" align="center" justify="center" vertical={vertical} wrap>
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
							<span className="text-base leading-6">{listItem.name}</span>
							{listItem.description && (
								<span className="text-xs text-green-700">{listItem.description}</span>
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
