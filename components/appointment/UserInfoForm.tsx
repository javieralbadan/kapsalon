import { PHONE_FORMATTER, USER_INFO_RULES, USER_PHONE_RULES } from '@/utils/formValidationRules';
import { UserOutlined, WhatsAppOutlined } from '@ant-design/icons';
import { Form, Input, InputNumber } from 'antd';
import { useState } from 'react';
import { SubmitButton } from '../ui/SubmitButton';

interface ValuesType {
  [key: string]: string;
}

interface Props {
  codeOTP: string;
  setCodeOTP: (val: string) => void;
  setCustomerInfo: (values: ValuesType) => void;
}

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

const UserInfoForm = ({ codeOTP, setCodeOTP, setCustomerInfo }: Props) => {
  const [userForm] = Form.useForm();
  const [isSending, setIsSending] = useState<boolean>(false);

  const sendVerificationCode = (values: ValuesType) => {
    setIsSending(true);
    setCustomerInfo(values);
    const randomCode: string = generateOTP();
    console.log('Enviando código OTP:', randomCode);
    setCodeOTP(randomCode);
    // TODO: Send via Twillio
    // TODO: Save in storage with expired timestamp
    setTimeout(() => setIsSending(false), 2000);
  };

  return (
    <Form form={userForm} disabled={!!codeOTP} layout="horizontal" onFinish={sendVerificationCode}>
      <Form.Item
        name="firstName"
        className="mb-3"
        rules={USER_INFO_RULES('nombre')}
        validateTrigger={['onChange', 'onBlur']}
      >
        <Input prefix={<UserOutlined />} placeholder="Nombre" />
      </Form.Item>

      <Form.Item
        name="lastName"
        className="mb-3"
        rules={USER_INFO_RULES('apellido')}
        validateTrigger={['onChange', 'onBlur']}
      >
        <Input prefix={<UserOutlined />} placeholder="Apellido" />
      </Form.Item>

      <Form.Item
        name="phone"
        className="mb-3"
        rules={USER_PHONE_RULES}
        validateTrigger={['onChange', 'onBlur']}
      >
        <InputNumber
          controls={false}
          formatter={PHONE_FORMATTER}
          maxLength={12}
          parser={(value) => value!.replace(/\D/g, '')}
          prefix={<WhatsAppOutlined />}
          placeholder="WhatsApp"
          style={{ width: '100%' }}
        />
      </Form.Item>

      <div className="mb-3 flex flex-col items-center gap-2">
        <p className="leading-5 text-gray-500">
          Debemos confirmar tu WhatsApp por medio de un código de verificación
        </p>

        <SubmitButton form={userForm} isDisabled={!!codeOTP} isLoading={isSending}>
          {codeOTP ? 'Código enviado' : 'Enviar código'}
        </SubmitButton>
      </div>
    </Form>
  );
};

export default UserInfoForm;
