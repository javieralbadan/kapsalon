import { FormValuesType } from '@/types/messages';
import { OTP_RULES } from '@/utils/formValidationRules';
import { Form, Input } from 'antd';
import { CSSProperties, useState } from 'react';
import { SubmitButton } from '../ui/SubmitButton';

interface Props {
  codeOTP: string;
  confirmAppointment: (values: FormValuesType) => void;
  isSending: boolean;
}

const OTP_LENGTH = 4; // TODO: Move to a constant file
const INPUT_STYLE: CSSProperties = {
  width: '80px',
  letterSpacing: '0.5em',
  textAlign: 'center',
  paddingRight: '0.3em',
};

const CodeOTPForm = ({ codeOTP, confirmAppointment, isSending }: Props) => {
  const [otpForm] = Form.useForm();
  const [currentOTP, setCurrentOTP] = useState<string>('');

  const onChange = (value: string) => {
    const numericValue = value.replace(/[^0-9]/g, '').slice(0, OTP_LENGTH);
    setCurrentOTP(numericValue);
    otpForm.setFieldsValue({ verificationCode: numericValue });
  };

  const isCodeComplete = currentOTP.length === OTP_LENGTH;
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
          maxLength={OTP_LENGTH}
          onChange={(e) => onChange(e.target.value)}
          style={INPUT_STYLE}
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

export default CodeOTPForm;
