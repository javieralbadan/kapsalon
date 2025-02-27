'use client';
import { GroupListItem } from '@/types/ui';
import { CheckCircleOutlined } from '@ant-design/icons';
import { Button, Empty, Flex } from 'antd';
import { useState } from 'react';

interface Props {
	dataList: GroupListItem[];
	onSelectOption: (listItem: GroupListItem) => void;
	vertical?: boolean;
}

export const GroupList = ({ dataList, onSelectOption, vertical = true }: Props) => {
	const [selectedItemId, setSelectedItemId] = useState<string | number | null>(null);

	const handleSelectOption = (listItem: GroupListItem) => {
		setSelectedItemId(listItem.id);
		onSelectOption(listItem);
	};

	return (
		<Flex gap="middle" align="center" justify="center" vertical={vertical} wrap>
			{dataList.length ? (
				dataList.map((listItem) => {
					const isSelected = selectedItemId === listItem.id;

					return (
						<Button
							key={listItem.id}
							className="flex h-full flex-col items-center gap-0"
							variant={isSelected ? 'solid' : 'outlined'}
							size="large"
							onClick={() => handleSelectOption(listItem)}
						>
							<span className="text-base leading-6">
								{listItem.name}
								{isSelected && <CheckCircleOutlined className="ml-1" />}
							</span>
							{listItem.description && (
								<span className={`text-xs text-${isSelected ? 'gray-400' : 'green-700'}`}>
									{listItem.description}
								</span>
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
