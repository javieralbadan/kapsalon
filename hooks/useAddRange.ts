import { useCallback } from 'react';

interface AddRangeProps {
  dayOfWeek: number;
  startTime: string;
  endTime: string;
}

interface Props {
  addRange: (props: AddRangeProps) => Promise<void>;
  index: number;
  range: [string | null, string | null];
}

export const useAddRange = ({ addRange, index, range }: Props) => {
  return useCallback(async () => {
    await addRange({
      dayOfWeek: index,
      startTime: range[0] || '',
      endTime: range[1] || '',
    });
  }, [addRange, index, range]);
};
