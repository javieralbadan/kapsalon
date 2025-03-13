import { Rule } from 'antd/es/form';

export const USER_INFO_RULES = (fieldName: string): Rule[] => [
  {
    required: true,
    message: `Ingresa tu ${fieldName}`,
  },
  {
    type: 'string',
    min: 3,
    max: 20,
    whitespace: true,
  },
];

export const USER_PHONE_RULES: Rule[] = [
  {
    validator: (_, value: string) => {
      if (!value) {
        return Promise.reject('Ingresa tu número de WhatsApp');
      }

      const numberValue: string = value ? value.toString().replace(/\D/g, '') : '';
      if (numberValue.length !== 10) {
        return Promise.reject('Ingresa los 10 dígitos de tu WhatsApp');
      }

      return Promise.resolve();
    },
  },
];

export const PHONE_FORMATTER = (value: string | undefined): string => {
  if (!value) return '';
  const phoneNumber = value.toString().replace(/\D/g, '');
  const phoneNumberLength = phoneNumber.length;
  if (phoneNumberLength < 4) return phoneNumber;
  if (phoneNumberLength < 7) return `${phoneNumber.slice(0, 3)} ${phoneNumber.slice(3)}`;
  return `${phoneNumber.slice(0, 3)} ${phoneNumber.slice(3, 6)} ${phoneNumber.slice(6)}`;
};

export const OTP_RULES = (codeOTP: string): Rule[] => [
  { required: true, message: 'Por favor, ingrese el código OTP' },
  { len: 6, message: 'El código OTP debe tener 6 dígitos' },
  { pattern: /^\d+$/, message: 'El código OTP solo debe contener números' },
  {
    validator: (_, value: string) => {
      if (value && value.length === 6 && value !== codeOTP) {
        return Promise.reject('El código ingresado es incorrecto');
      }
      return Promise.resolve();
    },
  },
];
