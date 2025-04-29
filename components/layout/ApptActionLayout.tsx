'use client';
import ClientErrorBoundary from '@/components/ui/ClientErrorBoundary';
import { Loading } from '@/components/ui/Loading';
import { useGetAppointment } from '@/hooks/useAppointments';
import { AppointmentStatus, AppointmentUI } from '@/types/appointments';
import { CustomerUI } from '@/types/customers';
import { ShopUI } from '@/types/shops';
import { StaffMemberUI } from '@/types/staffMembers';
import { GroupListItem } from '@/types/ui';
import { getColombiaNowISO } from '@/utils/formatters';
import { Card } from 'antd';
import { notFound } from 'next/navigation';
import { ReactNode, Suspense } from 'react';

export interface ApptActionLayoutProps {
  params: { id: string };
  title: string;
  actionMessage: (isInTheFuture: boolean) => string;
  children: (data: {
    appt: AppointmentUI;
    customer: CustomerUI;
    shop: ShopUI;
    barber: StaffMemberUI;
    service: GroupListItem;
    isInTheFuture: boolean;
  }) => ReactNode;
}

export const ApptActionLayout = ({
  params,
  title,
  actionMessage,
  children,
}: ApptActionLayoutProps) => {
  const { data, isLoading, error } = useGetAppointment(params.id);

  if (!isLoading && (error || !data)) {
    notFound();
  }

  const { appt, customer, shop, barber, service } = data || {};
  const isValidData = !!data && !!appt && !!customer && !!shop && !!barber && !!service;
  const { Confirmed, Rescheduled } = AppointmentStatus;
  const canEdit = appt?.status === Confirmed || appt?.status === Rescheduled;

  if (!isLoading && (!isValidData || !canEdit)) {
    notFound();
  }

  const apptDateTime = new Date(appt?.dateTimeISO || '');
  const isInTheFuture = apptDateTime > getColombiaNowISO();

  return (
    <div className="mt-0 p-4 text-center md:mt-4">
      <h1>{title}</h1>
      <ClientErrorBoundary>
        <Suspense fallback={<Loading />}>
          {isLoading ? (
            <Loading />
          ) : isValidData ? (
            <>
              <Card className="m-auto max-w-[400px]">
                <div className="flex flex-col items-center justify-center gap-0">
                  <p>Hola {`${customer?.firstName}`}, estos son los datos de tu cita:</p>
                  <p className="mb-3 font-extralight">ID: {appt.id}</p>
                  <p>💇 Servicio: {service.name}</p>
                  <p>🍺 Barbero: {barber.name}</p>
                  <p>📅 Fecha: {appt.dateTime}</p>

                  <p className="mt-3 leading-5 text-gray-500">{actionMessage(isInTheFuture)}</p>
                </div>
              </Card>
              {children({ appt, customer, shop, barber, service, isInTheFuture })}
            </>
          ) : (
            <p>La cita no puede ser modificada. Estado: {`${appt?.status}`}</p>
          )}
        </Suspense>
      </ClientErrorBoundary>
    </div>
  );
};
