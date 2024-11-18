'use client';
import { OTP_RULES } from '@/utils/formValidationRules';
import { Form, Input } from 'antd';
import { useState } from 'react';
import { SubmitButton } from './ui/SubmitButton';

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

	const onChange = (value: string) => {
		const numericValue = value.replace(/[^0-9]/g, '').slice(0, 6);
		setCurrentOTP(numericValue);
		otpForm.setFieldsValue({ verificationCode: numericValue });
	};

	const isCodeComplete = currentOTP.length === 6;
	const isCurrentCodeWrong = isCodeComplete && currentOTP !== codeOTP;

	return (
		<Form form={otpForm} disabled={!codeOTP} onFinish={confirmAppointment}>
			<Form.Item
				name="verificationCode"
				className="mb-6"
				rules={OTP_RULES(codeOTP)}
				validateTrigger={['onChange', 'onBlur']}
			>
				<Input
					maxLength={6}
					onChange={(e) => onChange(e.target.value)}
					style={{ width: '180px', letterSpacing: '0.8em', textAlign: 'center' }}
					pattern="[0-9]*"
					type="numeric"
				/>
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
