'use client';
import { GroupListItem } from '@/types/ui';
import { CheckCircleOutlined } from '@ant-design/icons';
import { Button } from 'antd';

interface Props extends GroupListItem {
  onSelectOption: (listItem: GroupListItem) => void;
}

const GroupListButton = ({ id, name, description, isSelected, onSelectOption }: Props) => {
  return (
    <Button
      className="flex h-full flex-col items-center gap-0 py-1"
      variant="outlined"
      color={isSelected ? 'primary' : 'default'}
      size="large"
      onClick={() => onSelectOption({ id, name })}
    >
      <span className="text-base leading-6">
        {name}
        {isSelected && <CheckCircleOutlined className="ml-1" />}
      </span>
      {description && (
        <span className={`text-xs text-${isSelected ? 'gray-400' : 'green-700'}`}>
          {description}
        </span>
      )}
    </Button>
  );
};

export default GroupListButton;
