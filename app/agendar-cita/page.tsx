import AppointmentStepperWrapper from '@/components/appointment/AppointmentStepperWrapper';
import ClientErrorBoundary from '@/components/ui/ClientErrorBoundary';
import { Loading } from '@/components/ui/Loading';
import { Suspense } from 'react';

const ScheduleAppointmentPage = () => {
	return (
		<div className="p-4 text-center">
			<h1>Agendar cita</h1>
			<ClientErrorBoundary>
				<Suspense fallback={<Loading />}>
					<AppointmentStepperWrapper />
				</Suspense>
			</ClientErrorBoundary>
		</div>
	);
};

export default ScheduleAppointmentPage;
