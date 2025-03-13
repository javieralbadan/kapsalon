'use client';
import { AvailabilitySlot, StaffAvailabilityRow } from '@/types/staffAvailability';
import { Button, Carousel, TimePicker } from 'antd';
import { RangePickerProps } from 'antd/es/date-picker/generatePicker/interface';
import { CSSProperties, useRef, useState } from 'react';
import { DaySlots } from './DaySlots';
const { RangePicker } = TimePicker;

interface AddRangeProps {
  dayOfWeek: number;
  startTime: string;
  endTime: string;
}

interface Props {
  availabilitiesList: StaffAvailabilityRow[] | [];
  removeAvailability: (removeId: string) => void;
  addRange: (props: AddRangeProps) => Promise<void>;
}

const carouselStyle: CSSProperties = {
  margin: '0 auto',
  padding: '1rem',
  height: 'calc(100vh - 180px)',
  maxWidth: '800px',
  border: '1px solid gray',
  borderRadius: '1rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const STYLES = {
  CONTENT:
    'flex flex-col items-center justify-start max-h-[calc(100vh-220px)] w-[calc(100%-100px)] min-w-[220px] mx-auto mb-4 px-4 overflow-y-auto',
  TITLE: 'mb-4',
};

const DAYS_NAMES = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

export const EditAvailabilityCarousel = ({
  availabilitiesList,
  removeAvailability,
  addRange,
}: Props) => {
  const carouselRef = useRef(null);
  const [range, setRange] = useState<[string, string] | [null, null]>([null, null]);

  const getAvailableSlots = (indexDay: number): AvailabilitySlot[] => {
    return availabilitiesList
      .filter((d: StaffAvailabilityRow) => d.day_of_week === indexDay)
      .map((d: StaffAvailabilityRow) => ({
        id: d.id,
        startTime: d.start_time,
        endTime: d.end_time,
      })) as AvailabilitySlot[];
  };

  const onSelectRange: RangePickerProps['onChange'] = (time, timeRange) => {
    console.log('onSelectRange', time, timeRange);
    setRange(timeRange);
  };

  return (
    <Carousel
      ref={carouselRef}
      arrows={true}
      style={carouselStyle}
      className="bg-white bg-opacity-50"
    >
      {DAYS_NAMES.map((day, index) => {
        const availableSlots = getAvailableSlots(index);

        return (
          <div key={index}>
            <section className={STYLES.CONTENT}>
              <h2 className={STYLES.TITLE}>{day}:</h2>

              <RangePicker
                format={'H:mm'}
                minuteStep={30}
                mode={['time', 'time']}
                placeholder={['Hora inicio', 'Hora fin']}
                onChange={onSelectRange}
              />
              {/* disabledTime={{ disabledHours: [0, 1, 2] }} */}

              <Button
                type="default"
                disabled={!range[0] || !range[1]}
                onClick={() => {
                  void addRange({
                    dayOfWeek: index,
                    startTime: range[0] || '',
                    endTime: range[1] || '',
                  });
                }}
                className="my-4"
              >
                Agregar rango
              </Button>

              <p className="my-1 text-gray-500">Rangos en este día: {availableSlots.length}</p>
              <DaySlots availableSlots={availableSlots} removeAvailability={removeAvailability} />
            </section>
          </div>
        );
      })}
    </Carousel>
  );
};
