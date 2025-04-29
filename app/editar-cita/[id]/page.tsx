'use client';
import ApptEditionStepper from '@/components/appointment/ApptEditionStepper';
import { ApptActionLayout } from '@/components/layout/ApptActionLayout';
import { INITIAL_SHOP } from '@/constants/shops';
import { Button } from 'antd';
import Link from 'next/link';
import { use, useEffect } from 'react';

const EditAppointment = ({ params }: { params: Promise<{ id: string }> }) => {
  const resolvedParams = use(params);
  useEffect(() => {
    document.title = 'Kapsalon · Reagenda tu cita';
  }, []);

  return (
    <ApptActionLayout
      params={resolvedParams}
      title="Reagendar cita"
      actionMessage={(isInTheFuture) =>
        isInTheFuture
          ? 'Porfa selecciona el nuevo horario...'
          : 'Ya no es posible modificar la cita'
      }
    >
      {({ isInTheFuture, ...dataFromActionLayout }) =>
        isInTheFuture ? (
          <ApptEditionStepper {...dataFromActionLayout} />
        ) : (
          <Link href={`/${INITIAL_SHOP}/agendar-cita`}>
            <Button type="primary" className="mt-4">
              Agendar nueva cita
            </Button>
          </Link>
        )
      }
    </ApptActionLayout>
  );
};

export default EditAppointment;
