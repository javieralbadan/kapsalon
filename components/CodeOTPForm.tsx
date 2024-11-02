import type { GetProps } from 'antd';
import { Flex, Form, Input } from 'antd';
import { useState } from 'react';
import { SubmitButton } from './ui/SubmitButton';

type OTPProps = GetProps<typeof Input.OTP>;

interface ValuesType {
	[key: string]: string;
}

interface Props {
	codeOTP: string;
	confirmAppointment: (values: ValuesType) => void;
}

export const CodeOTPForm = ({ codeOTP, confirmAppointment }: Props) => {
	const [otpForm] = Form.useForm();
	const [enabledSubmit, setEnabledSubmit] = useState<boolean>(false);

	const onChange: OTPProps['onChange'] = (text) => {
		setEnabledSubmit(text === codeOTP);
	};

	return (
		<Form
			form={otpForm}
			disabled={!codeOTP}
			layout="horizontal"
			labelCol={{ span: 6 }}
			onFinish={confirmAppointment}
		>
			<div className="-mt-4 flex flex-col items-center gap-2">
				<Form.Item name="verificationCode" hasFeedback validateStatus="success">
					<Input.OTP onChange={onChange} />
				</Form.Item>
			</div>

			<Flex gap="small" justify="center">
				<SubmitButton form={otpForm} isDisabled={!enabledSubmit}>
					Confirmar cita
				</SubmitButton>
			</Flex>
		</Form>
	);
};
