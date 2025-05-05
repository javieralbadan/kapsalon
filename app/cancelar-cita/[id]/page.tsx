'use client';
import ApptCancelButton from '@/components/cancel/ApptCancelButton';
import { ApptActionLayout } from '@/components/layout/ApptActionLayout';
import { INITIAL_SHOP } from '@/constants/shops';
import { Button } from 'antd';
import Link from 'next/link';
import { use, useEffect } from 'react';

const CancelAppointment = ({ params }: { params: Promise<{ id: string }> }) => {
  const resolvedParams = use(params);
  useEffect(() => {
    document.title = 'Kapsalon · Cancela tu cita';
  }, []);

  return (
    <ApptActionLayout params={resolvedParams} title="Cancelar cita" actionType="cancel">
      {({ isInTheFuture, ...dataFromActionLayout }) => (
        <div className="mt-4">
          {isInTheFuture ? (
            <ApptCancelButton appt={dataFromActionLayout} />
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
