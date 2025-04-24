'use client';
import ApptEditionStepper from '@/components/appointment/ApptEditionStepper';
import ClientErrorBoundary from '@/components/ui/ClientErrorBoundary';
import { Loading } from '@/components/ui/Loading';
import { useGetAppointment } from '@/hooks/useAppointments';
import { AppointmentStatus } from '@/types/appointments';
import { getColombiaNowISO } from '@/utils/formatters';
import { Button, Card } from 'antd';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Suspense, use } from 'react';

const INITIAL_SHOP = 'c9446b20';

const EditAppointment = ({ params }: { params: Promise<{ id: string }> }) => {
  const resolvedParams = use(params);
  const { data, isLoading, error } = useGetAppointment(resolvedParams.id);

  if (!isLoading && (error || !data)) {
    notFound();
  }

  const { appt, customer, shop, barber, service } = data || {};
  const isValidData = !!data && !!appt && !!customer && !!shop && !!barber && !!service;
  const isConfirmed = appt?.status === AppointmentStatus.Confirmed;
  if (!isLoading && !isValidData && !isConfirmed) {
    notFound();
  }

  const apptDateTime = new Date(appt?.dateTimeISO || '');
  const isInTheFuture = apptDateTime > getColombiaNowISO();

  return (
    <div className="mt-0 p-4 text-center md:mt-4">
      <h1>Reagendar cita</h1>
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

                  <p className="my-3 leading-5 text-gray-500">
                    {isInTheFuture
                      ? 'Porfa selecciona el nuevo horario'
                      : 'Ya no es posible modificar la cita'}
                  </p>
                </div>
              </Card>
              {isInTheFuture ? (
                <ApptEditionStepper {...data} />
              ) : (
                <Link href={`/${INITIAL_SHOP}/agendar-cita`}>
                  <Button type="primary" className="mt-4">
                    Agendar nueva cita
                  </Button>
                </Link>
              )}
            </>
          ) : (
            <p>La cita no puede ser modificada. Estado: {`${appt?.status}`}</p>
          )}
        </Suspense>
      </ClientErrorBoundary>
    </div>
  );
};

export default EditAppointment;
