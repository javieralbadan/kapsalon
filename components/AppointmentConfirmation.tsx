'use client';
import { AppointmentCreationType } from '@/types/appointments';
import { Button, Card, Flex, Result } from 'antd';

interface Props {
	appointment: AppointmentCreationType;
	goBack: () => void;
	onConfirm: () => void;
}

export const AppointmentConfirmation = ({ appointment, goBack, onConfirm }: Props) => {
	const isConfirmDisabled: boolean =
		!appointment.barber.id ||
		!appointment.service.id ||
		!appointment.day.id ||
		!appointment.time.id;

	return (
		<>
			{isConfirmDisabled ? (
				<Result
					status="info"
					title="Cita no establecida"
					subTitle="Debes seleccionar todo lo necesario para confirmar tu cita"
					extra={
						<Button type="primary" onClick={goBack}>
							Ir atrás
						</Button>
					}
				/>
			) : (
				<Card title="Está todo bien?" bordered={true} className="m-auto w-[300px]">
					<p>💇 Servicio: {appointment.service.name}</p>
					<p>🍺 Barbero: {appointment.barber.name}</p>
					<p>
						📅 {appointment.day.name}, {appointment.time.name}
					</p>

					<Flex gap="small" className="mt-4">
						<Button danger onClick={goBack}>
							Editar algo
						</Button>
						<Button disabled={isConfirmDisabled} onClick={() => onConfirm()}>
							Si, confirmar cita
						</Button>
					</Flex>
				</Card>
			)}
		</>
	);
};
