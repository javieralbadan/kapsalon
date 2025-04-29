import {
  AppointmentEditionType,
  AppointmentToEditType,
  SetOptionParams,
} from '@/types/appointments';
import { useState } from 'react';
import ApptEditionConfirmation from './ApptEditionConfirmation';
import ApptStepper from './ApptStepper';
import ApptStepperFinalStep from './ApptStepperFinalStep';
import SlotsContent from './SlotsContent';

const AppointmentEditionStepper = (appointmentToEdit: AppointmentToEditType) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [appointment, setAppointment] = useState<AppointmentEditionType>({
    ...appointmentToEdit,
    dateTime: { id: '', name: '' },
  });

  const prevStep = () => setCurrentStep((s) => s - 1);
  const nextStep = () => setCurrentStep((s) => s + 1);

  const setOption = ({ key, listItem }: SetOptionParams) => {
    setAppointment((prev) => ({ ...prev, [key]: listItem }));
    nextStep();
  };

  const steps = [
    {
      title: 'Día y Hora',
      content: (
        <SlotsContent
          barber={appointment.barber}
          selectedItemId={appointment.dateTime.id}
          setOption={setOption}
        />
      ),
    },
    {
      title: 'Confirmación',
      content: (
        <ApptStepperFinalStep appt={appointment} goBack={prevStep}>
          <ApptEditionConfirmation appt={appointment} goBack={prevStep} />
        </ApptStepperFinalStep>
      ),
    },
  ];

  return <ApptStepper steps={steps} currentStep={currentStep} onPrev={prevStep} />;
};

export default AppointmentEditionStepper;
