import { FormInstance } from 'antd';

// Tipos base para parámetros
interface BasicParamType {
  type: string;
  text: string;
}

interface NamedParamType extends BasicParamType {
  parameter_name: string;
}

// Tipos de componentes
interface BodyComponentType<T extends BasicParamType> {
  type: 'body';
  parameters: T[];
}

interface ButtonComponentType {
  type: 'button';
  sub_type: 'url' | 'quick_reply';
  index: number;
  parameters: BasicParamType[];
}

// Auth Components:
// Primer elemento BodyComponent con BasicParamType, seguido de ButtonComponent
export type AuthComponentsType = [BodyComponentType<BasicParamType>, ButtonComponentType];

// Utility Components:
// Primer elemento BodyComponent con NamedParamType
// Opcionalmente seguido de ButtonComponent
export type UtilityComponentsType = [BodyComponentType<NamedParamType>, ...ButtonComponentType[]];

export interface MessageBodyRequest {
  templateName: string;
  to: string;
  components: AuthComponentsType | UtilityComponentsType;
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

export interface UseVerificationCodeProps {
  setCodeOTP: (val: string) => void;
  userForm: FormInstance;
}

export interface UseVerificationCodeReturn {
  isSending: boolean;
  sendCode: (phoneNumber: string) => void;
}
