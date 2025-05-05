'use client';
import { Loading } from '@/components/ui/Loading';
import { useAvailableSlots } from '@/hooks/useAvailableSlots';
import { SetOptionParams } from '@/types/appointments';
import { StaffMemberUI } from '@/types/staffMembers';
import { mapApptDateTime } from '@/utils/mappers/appointment';
import { Button, Empty } from 'antd';
import { usePathname } from 'next/navigation';
import GroupListButton from './GroupListButton';

interface SlotContentProps {
  barber: StaffMemberUI;
  selectedItemId: string | number | null;
  setOption: (params: SetOptionParams) => void;
}

const SlotsContent = ({ barber, selectedItemId, setOption }: SlotContentProps) => {
  const { slots, isLoading, isLoadingMore, error, pagination, loadMore } = useAvailableSlots(
    barber.id,
  );
  const pathname = usePathname();
  const gridCols = pathname !== '/dashboard' && 'md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8';

  if (isLoading) {
    return <Loading />;
  }

  if (error || slots.length === 0) {
    return <Empty description="Error cargando disponibilidad" />;
  }

  return (
    <div className="mb-4 space-y-4">
      <h2 className="text-xl font-semibold">Selecciona día y hora:</h2>
      {/* main slots = daysWithAvailableSlots */}
      {slots.map((slotGroup) => (
        <div key={slotGroup.id} className="border-b pb-4 last:border-b-0">
          <h3 className="mb-2 text-lg font-medium">{slotGroup.title}</h3>
          <div className={`grid grid-cols-3 gap-2 sm:grid-cols-4 ${gridCols}`}>
            {slotGroup.slots.length === 0 ? (
              <Empty description="No hay horarios disponibles" />
            ) : (
              slotGroup.slots.map(({ id, name }) => (
                <GroupListButton
                  key={`${slotGroup.id}-${id}`}
                  id={id}
                  name={name}
                  isSelected={selectedItemId === id}
                  onSelectOption={(slot) => setOption(mapApptDateTime(slot.id as string))}
                />
              ))
            )}
          </div>
        </div>
      ))}

      {isLoadingMore && (
        <div className="py-4 text-center">
          <Loading />
        </div>
      )}

      {pagination?.hasMore && !isLoadingMore && (
        <Button
          type="primary"
          ghost
          className="mx-auto my-4 block"
          disabled={!pagination.hasMore || isLoadingMore}
          onClick={() => void loadMore()}
        >
          ↓ Mostrar más días ↓
        </Button>
      )}
    </div>
  );
};

export default SlotsContent;
