'use client';
import AppointmentsList from '@/components/dashboard/AppointmentsList';
import ClientErrorBoundary from '@/components/ui/ClientErrorBoundary';
import { Loading } from '@/components/ui/Loading';
import { useGetApptsByStaff } from '@/hooks/useAppointments';
import { AppointmentStatus } from '@/types/appointments';
import { Col, Empty, Row, Space, Switch, Typography } from 'antd';
import { notFound } from 'next/navigation';
import { useState } from 'react';

const TEMP_BARBER_ID = '2fb39ad1-c200-4011-a2ef-0616919ec80b';
const { Title } = Typography;

const Dashboard = () => {
  const { isLoading, error, data } = useGetApptsByStaff(TEMP_BARBER_ID);
  const [showCancelled, setShowCancelled] = useState<boolean>(false);

  if (isLoading) return <Loading />;
  if (error) return notFound();

  const visibleAppointments = data.filter(({ appt }) =>
    showCancelled ? true : appt.status !== AppointmentStatus.Cancelled,
  );

  return (
    <div
      className="mx-auto mb-[40px] flex w-full flex-col items-center justify-center p-4"
      style={{ maxWidth: '500px' }}
    >
      <h1>Dashboard</h1>
      <ClientErrorBoundary>
        {data?.length ? (
          <>
            <Row justify="space-between" className="my-4 w-full">
              <Col xs={12} className="flex justify-start">
                <Title level={5}>Citas futuras:</Title>
              </Col>
              <Col xs={12} className="flex justify-end">
                <Space align="center" className="mb-4">
                  <span>
                    Ver canceladas
                    {!showCancelled && ` (${data.length - visibleAppointments.length})`}
                  </span>
                  <Switch
                    checked={showCancelled}
                    onChange={setShowCancelled}
                    checkedChildren="SI"
                    unCheckedChildren="NO"
                  />
                </Space>
              </Col>
            </Row>
            <AppointmentsList list={visibleAppointments} />
          </>
        ) : (
          <Empty description="No existen citas a futuro" className="my-4" />
        )}
      </ClientErrorBoundary>
    </div>
  );
};

export default Dashboard;
