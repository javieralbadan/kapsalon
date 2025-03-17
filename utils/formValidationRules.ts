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

export const formatName = (name: string): string => {
  if (!name) return '';

  const words = name.trim().toLowerCase().split(/\s+/);
  const formattedWords = words.map((word) => {
    if (word.length === 0) return '';

    const specialCases = ['de', 'la', 'del', 'los', 'las', 'y', 'e'];
    if (specialCases.includes(word) && words.indexOf(word) !== 0) {
      return word;
    }

    return word.charAt(0).toUpperCase() + word.slice(1);
  });

  return formattedWords.join(' ');
};

export const sanitizeName = (input: string): string => {
  if (!input) return '';

  return input.replace(/[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s'-]/g, '');
};

export const prepareNameForDatabase = (name: string): string => {
  if (!name) return '';

  const sanitized = sanitizeName(name);
  return formatName(sanitized);
};

export const USER_PHONE_RULES: Rule[] = [
  {
    validator: (_, value: string) => {
      if (!value) {
        return Promise.reject(new Error('Ingresa tu número de WhatsApp'));
      }

      const numberValue: string = value ? value.toString().replace(/\D/g, '') : '';
      if (numberValue.length !== 10) {
        return Promise.reject(new Error('Ingresa los 10 dígitos de tu WhatsApp'));
      }

      return Promise.resolve();
    },
  },
];

export const phoneFormatter = (value: string | undefined): string => {
  if (!value) return '';
  const phoneNumber = value.toString().replace(/\D/g, '');
  const phoneNumberLength = phoneNumber.length;
  if (phoneNumberLength < 4) return phoneNumber;
  if (phoneNumberLength < 7) return `${phoneNumber.slice(0, 3)} ${phoneNumber.slice(3)}`;
  return `${phoneNumber.slice(0, 3)} ${phoneNumber.slice(3, 6)} ${phoneNumber.slice(6)}`;
};

const OTP_LENGTH = 4; // TODO: Move to a constant file
export const OTP_RULES = (codeOTP: string): Rule[] => [
  { required: true, message: 'Por favor, ingrese el código OTP' },
  { len: OTP_LENGTH, message: `El código OTP debe tener ${OTP_LENGTH} dígitos` },
  { pattern: /^\d+$/, message: 'El código OTP solo debe contener números' },
  {
    validator: (_, value: string) => {
      if (value && value.length === OTP_LENGTH && value !== codeOTP) {
        return Promise.reject(new Error('El código ingresado es incorrecto'));
      }
      return Promise.resolve();
    },
  },
];
