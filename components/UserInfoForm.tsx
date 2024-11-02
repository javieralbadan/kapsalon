'use client';
import { Form, Input, Typography } from 'antd';
import { SubmitButton } from './ui/SubmitButton';
const { Text } = Typography;

interface ValuesType {
	[key: string]: string;
}

interface Props {
	setCodeOTP: (val: string) => void;
	setCustomerInfo: (values: ValuesType) => void;
}

const generateOTP = (): string => {
	return Math.floor(100000 + Math.random() * 900000).toString();
};

export const UserInfoForm = ({ setCodeOTP, setCustomerInfo }: Props) => {
	const [userForm] = Form.useForm();

	const sendVerificationCode = (values: ValuesType) => {
		setCustomerInfo(values);
		const codeOTP: string = generateOTP();
		console.log('Enviando código OTP', codeOTP);
		setCodeOTP(codeOTP);
		console.log('sendVerificationCode · Create customer in DB');
	};

	return (
		<Form
			form={userForm}
			layout="horizontal"
			labelCol={{ span: 6 }}
			onFinish={sendVerificationCode}
		>
			<Form.Item
				name="lastName"
				label="Apellido"
				rules={[{ required: true, message: 'Ingresa tu apellido' }]}
			>
				<Input />
			</Form.Item>

			<Form.Item
				name="firstName"
				label="Nombre"
				rules={[{ required: true, message: 'Ingresa tu nombre' }]}
			>
				<Input />
			</Form.Item>

			<Form.Item
				name="phone"
				label="WhatsApp"
				rules={[{ required: true, message: 'Ingresa tu número de WhatsApp' }]}
			>
				<Input />
			</Form.Item>

			<div className="-mt-4 mb-4 flex flex-col items-center gap-2">
				<Text type="secondary">
					Debemos confirmar tu WhatsApp por medio de un código de verificación
				</Text>

				<SubmitButton form={userForm}>Enviar código</SubmitButton>
			</div>
		</Form>
	);
};
