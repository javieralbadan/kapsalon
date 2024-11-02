'use client';
import { AppointmentCreationType } from '@/types/appointments';
import { Button, Card, Result, Space } from 'antd';
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
	const isConfirmDisabled: boolean =
		!appointment.barber.id ||
		!appointment.service.id ||
		!appointment.day.id ||
		!appointment.time.id;

	const confirmAppointment = (codeOTP: ValuesType) => {
		console.log('confirmAppointment:', { appointment, customerInfo });
		console.log('Form:', codeOTP);
		console.log('confirmAppointment · Create appointment in DB');
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
				<Card title="Confirma tu cita" bordered={true} className="m-auto w-[400px]">
					<Space direction="vertical" size="middle" style={{ display: 'flex' }}>
						<div className="mb-4 mt-2 flex flex-col items-center justify-center gap-0">
							<p>💇 Servicio: {appointment.service.name}</p>
							<p>🍺 Barbero: {appointment.barber.name}</p>
							<p>
								📅 {appointment.day.name}, {appointment.time.name}
							</p>

							<Button danger onClick={goBack} className="mt-4">
								Editar algo
							</Button>
						</div>

						<UserInfoForm setCodeOTP={setCodeOTP} setCustomerInfo={setCustomerInfo} />
						<CodeOTPForm codeOTP={codeOTP} confirmAppointment={confirmAppointment} />
					</Space>
				</Card>
			)}
		</>
	);
};
