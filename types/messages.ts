import { FormInstance } from 'antd';

interface ComponentsParamsType {
  type: string;
  text: string;
}

interface ComponentsType {
  type: string;
  parameters: ComponentsParamsType[];
  sub_type?: string;
  index?: string;
}

export interface MessageBodyRequest {
  templateName: string;
  to: string;
  components: ComponentsType[];
}

export interface FormValuesType {
  [key: string]: string;
}

export interface UseSendVerificationCodeProps {
  setCustomerInfo: (values: FormValuesType) => void;
  setCodeOTP: (val: string) => void;
  form: FormInstance;
}

export interface UseSendVerificationCodeReturn {
  isSending: boolean;
  sendVerificationCode: (values: FormValuesType) => void;
}
