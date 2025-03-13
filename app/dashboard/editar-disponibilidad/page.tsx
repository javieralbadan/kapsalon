'use client';
import { createAvailabilityInDB, getAvailabilitiesFromDB } from '@/api/staffAvailability';
import { EditAvailabilityCarousel } from '@/components/EditAvailabilityCarousel';
import { Loading } from '@/components/ui/Loading';
import { StaffAvailabilityInsert, StaffAvailabilityRow } from '@/types/staffAvailability';
import { Button, Empty, message } from 'antd';
import { useEffect, useState } from 'react';

interface AddRangeProps {
  dayOfWeek: number;
  startTime: string;
  endTime: string;
}

const EditAvailability = () => {
  const [isError, setError] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [availabilitiesList, setAvailabilitiesList] = useState<StaffAvailabilityRow[] | []>([]);
  const [newSlots, setSlots] = useState<StaffAvailabilityRow | null>(null);
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    const fetchData = async () => {
      const { data: slots, error: errorAvailability } = await getAvailabilitiesFromDB();
      console.log('errorAvailability, slots', errorAvailability, slots);
      if (!errorAvailability && slots?.length) {
        setAvailabilitiesList(slots);
      }

      setError(!!errorAvailability);
      setLoading(false);
    };

    void fetchData();
  }, []);

  const removeAvailability = async (removeId: string) => {
    const newAvailabilities = availabilitiesList.filter(({ id }) => id !== removeId);
    console.log({ newAvailabilities });
    setAvailabilitiesList(newAvailabilities);

    await messageApi.success('Rango eliminado');
    await messageApi.info('Cambios sin guardar aún');
  };

  const addRange = async ({ dayOfWeek, startTime, endTime }: AddRangeProps) => {
    const newRange: StaffAvailabilityInsert = {
      is_available: true,
      staff_member_id: '2fb39ad1-c200-4011-a2ef-0616919ec80b',
      day_of_week: dayOfWeek,
      end_time: endTime,
      start_time: startTime,
    };
    const { data, error } = await createAvailabilityInDB(newRange);
    if (!error && data && data.length) {
      setAvailabilitiesList([...availabilitiesList, ...data]);
      await messageApi.success('Rango agregado');
    } else {
      await messageApi.error('Error al crear rango');
    }

    // await messageApi.info('Recuerda guarda cambios');
  };

  const saveChanges = () => {
    console.log('🚀 ~ saveChanges:', newSlots);
    setSlots(newSlots);
  };

  return (
    <>
      {contextHolder}
      <div className="p-4 text-center">
        <h1>Editar disponibilidad</h1>
        {isLoading && <Loading />}
        {!isLoading && isError && (
          <div className="flex h-[calc(100vh-180px)] items-center justify-center">
            <Empty description="No fue posible cargar los datos" />
          </div>
        )}
        {!isLoading && !isError && (
          <>
            <Button type="primary" onClick={() => saveChanges()} className="my-4">
              Guardar cambios
            </Button>

            <EditAvailabilityCarousel
              availabilitiesList={availabilitiesList}
              addRange={addRange}
              removeAvailability={removeAvailability as (removeId: string) => void}
            />
          </>
        )}
      </div>
    </>
  );
};

export default EditAvailability;
