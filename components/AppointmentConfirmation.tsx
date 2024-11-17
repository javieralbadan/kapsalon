'use client';
import { AppointmentCreationType } from '@/types/appointments';
import { Button, Card, Result } from 'antd';
import { useState } from 'react';
import { CodeOTPForm } from './CodeOTPForm';
import { UserInfoForm } from './UserInfoForm';

interface Props {
	appointment: AppointmentCreationType;
	goBack: () => void;
}

interface ValuesType {
	[key: string]: string;
}

export const AppointmentConfirmation = ({ appointment, goBack }: Props) => {
	const [codeOTP, setCodeOTP] = useState<string>('');
	const [customerInfo, setCustomerInfo] = useState<ValuesType>({});
	const [isSending, setIsSending] = useState<boolean>(false);

	const isConfirmDisabled: boolean =
		!appointment.barber.id ||
		!appointment.service.id ||
		!appointment.day.id ||
		!appointment.time.id;

	const confirmAppointment = (codeOTP: ValuesType) => {
		setIsSending(true);
		console.log('confirmAppointment:', { appointment, customerInfo });
		console.log('Form:', codeOTP);
		console.log('confirmAppointment · Create user & appointment in DB');
		// TODO: Create appointment in DB
		setTimeout(() => setIsSending(false), 2000);
	};

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
				<Card bordered={true} className="m-auto max-w-[400px]">
					<h2>Confirma tu cita</h2>
					<div className="flex flex-col items-center justify-center gap-0">
						<p>💇 Servicio: {appointment.service.name}</p>
						<p>🍺 Barbero: {appointment.barber.name}</p>
						<p>
							📅 {appointment.day.name}, {appointment.time.name}
						</p>
					</div>

					<p className="my-3 leading-5 text-gray-500">
						Si todo pinta bien, porfa añade tu info. Si no, puedes
						<span
							className={`ml-1 underline decoration-blue-400 text-${
								!codeOTP ? 'blue' : 'gray'
							}-400`}
							onClick={() => !codeOTP && goBack}
						>
							volver y editar
						</span>
						.
					</p>

					<UserInfoForm
						codeOTP={codeOTP}
						setCodeOTP={setCodeOTP}
						setCustomerInfo={setCustomerInfo}
					/>
					<CodeOTPForm
						codeOTP={codeOTP}
						confirmAppointment={confirmAppointment}
						isSending={isSending}
					/>
				</Card>
			)}
		</>
	);
};
