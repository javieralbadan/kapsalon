'use client';
import { ApptActionLayout } from '@/components/layout/ApptActionLayout';
import { INITIAL_SHOP } from '@/constants/shops';
import { useCancelAppointment } from '@/hooks/useAppointments';
import { Button, message } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { use, useEffect } from 'react';

const CancelAppointment = ({ params }: { params: Promise<{ id: string }> }) => {
  const resolvedParams = use(params);
  const router = useRouter();
  useEffect(() => {
    document.title = 'Kapsalon · Cancela tu cita';
  }, []);

  const { cancelAppointment, isLoading } = useCancelAppointment({
    onSuccess: () => {
      message.success('Cita cancelada exitosamente');
      router.push('/');
    },
    onError: () => void message.error('Error al cancelar la cita'),
  });

  return (
    <ApptActionLayout
      params={resolvedParams}
      title="Cancelar cita"
      actionMessage={(isInTheFuture) =>
        isInTheFuture
          ? '¿Estás seguro de cancelar esta cita?'
          : 'No se puede cancelar una cita pasada'
      }
    >
      {({ isInTheFuture, ...dataFromActionLayout }) => (
        <div className="mt-4">
          {isInTheFuture ? (
            <Button
              type="primary"
              danger
              loading={isLoading}
              onClick={() => void cancelAppointment(dataFromActionLayout)}
              className="mt-4"
            >
              {!isLoading && 'Confirmar cancelación'}
            </Button>
          ) : (
            <Link href={`/${INITIAL_SHOP}/agendar-cita`}>
              <Button type="primary" className="mt-4">
                Agendar nueva cita
              </Button>
            </Link>
          )}
        </div>
      )}
    </ApptActionLayout>
  );
};

export default CancelAppointment;
