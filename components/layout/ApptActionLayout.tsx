'use client';
import ClientErrorBoundary from '@/components/ui/ClientErrorBoundary';
import { Loading } from '@/components/ui/Loading';
import { useGetAppointment } from '@/hooks/useAppointments';
import { AppointmentStatus, ApptActionEditionType } from '@/types/appointments';
import { getColombiaNowISO } from '@/utils/formatters';
import { SmileOutlined } from '@ant-design/icons';
import { Button, Result } from 'antd';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ReactNode } from 'react';
import ApptStatusTag from '../appointment/ApptStatusTag';
import ApptSummaryCard from '../appointment/ApptSummaryCard';

export interface ApptActionLayoutProps {
  params: { id: string };
  title: string;
  actionType: 'edit' | 'cancel';
  children: (data: ApptActionEditionType) => ReactNode;
}

export const ApptActionLayout = ({
  params,
  title,
  actionType,
  children,
}: ApptActionLayoutProps) => {
  const { isLoading, error, data } = useGetAppointment(params.id);

  if (isLoading) {
    return <Loading />;
  }

  if (error || !data) {
    return notFound();
  }

  const { appt, dateTime, customer, shop, barber, service } = data;
  const { Confirmed, Rescheduled } = AppointmentStatus;
  const canEdit = appt?.status === Confirmed || appt?.status === Rescheduled;

  const apptDateTime = new Date(appt?.dateTimeISO || '');
  const isInTheFuture = apptDateTime > getColombiaNowISO();

  return (
    <div className="mt-0 p-4 text-center md:mt-4">
      <h1>{title}</h1>
      <ClientErrorBoundary>
        {canEdit ? (
          <>
            <ApptSummaryCard
              apptToEdit={data}
              actionType={actionType}
              isInTheFuture={isInTheFuture}
            />
            {children({ appt, dateTime, customer, shop, barber, service, isInTheFuture })}
          </>
        ) : (
          <Result
            status="500"
            title="La cita no puede ser modificada"
            subTitle={<ApptStatusTag status={appt.status as AppointmentStatus} />}
            icon={<SmileOutlined />}
            extra={
              <Link href="/">
                <Button type="primary">Volver al inicio</Button>
              </Link>
            }
          />
        )}
      </ClientErrorBoundary>
    </div>
  );
};
