import { AppointmentStatus } from '@/types/appointments';
import { statusMapper } from '@/utils/mappers/appointment';
import { Tag } from 'antd';

const ApptStatusTag = ({ status }: { status: AppointmentStatus }) => {
  if (!status) {
    return null;
  }

  return (
    <Tag bordered={false} color={statusMapper[status].color} className="mr-2">
      {statusMapper[status].text}
    </Tag>
  );
};

export default ApptStatusTag;
