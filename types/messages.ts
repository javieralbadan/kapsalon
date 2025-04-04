import { FormInstance } from 'antd';

interface ComponentsParamsType {
  type: string;
  text: string;
}

export interface ComponentsType {
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

// Create appointment - user info
export interface CodeOTPType {
  verificationCode: string;
}

export interface FormUserInfoType {
  firstName: string;
  lastName: string;
  phone: string;
}

export interface UseSendVerificationCodeProps {
  setCodeOTP: (val: string) => void;
  userForm: FormInstance;
}

export interface UseSendVerificationCodeReturn {
  isSending: boolean;
  sendVerificationCode: (phoneNumber: string) => void;
}
