'use client';
import type { GetProps } from 'antd';
import { Form, Input } from 'antd';
import { useState } from 'react';
import { SubmitButton } from './ui/SubmitButton';

type OTPProps = GetProps<typeof Input.OTP>;

interface ValuesType {
	[key: string]: string;
}

interface Props {
	codeOTP: string;
	confirmAppointment: (values: ValuesType) => void;
	isSending: boolean;
}

export const CodeOTPForm = ({ codeOTP, confirmAppointment, isSending }: Props) => {
	const [otpForm] = Form.useForm();
	const [currentOTP, setCurrentOTP] = useState<string>('');

	const onChange: OTPProps['onChange'] = (text) => setCurrentOTP(text);
	const isCodeComplete = currentOTP.length === 6;
	const isCurrentCodeWrong = isCodeComplete && currentOTP !== codeOTP;

	return (
		<Form form={otpForm} disabled={!codeOTP} onFinish={confirmAppointment}>
			<Form.Item name="verificationCode" className="mb-4">
				<Input.OTP onChange={onChange} status={isCurrentCodeWrong ? 'error' : ''} />
			</Form.Item>

			<SubmitButton
				form={otpForm}
				isDisabled={!isCodeComplete || isCurrentCodeWrong}
				isLoading={isSending}
			>
				Confirmar cita
			</SubmitButton>
		</Form>
	);
};
