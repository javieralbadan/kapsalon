import { useIsMobile } from '@/hooks/useIsMobile';
import { Button, Steps } from 'antd';

interface Props {
  steps: Array<{ title: string; content: React.ReactNode }>;
  currentStep: number;
  onPrev: () => void;
}

const AppointmentStepper = ({ steps, currentStep, onPrev }: Props) => {
  const isMobile = useIsMobile();

  return (
    <div className="mx-auto flex flex-col p-0 md:p-4" style={{ width: '100%', maxWidth: '800px' }}>
      <div className="mb-4">
        <Steps
          current={currentStep}
          items={steps.map(({ title }) => ({ title }))}
          type={isMobile ? 'inline' : 'default'}
        />
      </div>

      <div className="flex justify-start">
        <Button color="blue" variant="dashed" disabled={currentStep === 0} onClick={onPrev}>
          ← Atrás
        </Button>
      </div>

      <section className="flex flex-grow flex-col items-center overflow-y-auto">
        <div className="mb-4 w-full py-4">{steps[currentStep].content}</div>
      </section>
    </div>
  );
};

export default AppointmentStepper;
