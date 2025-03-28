import {
  MessageBodyRequest,
  UseSendVerificationCodeProps,
  UseSendVerificationCodeReturn,
} from '@/types/messages';
import { useState } from 'react';

const generateOTP = () => Math.floor(1000 + Math.random() * 9000).toString();
const formatPhoneNumber = (phone: string): string => {
  const phoneStr = String(phone);
  const cleanPhone = phoneStr.replace(/\D/g, '');

  return cleanPhone.startsWith('57') ? '+' + cleanPhone : '+57' + cleanPhone;
};

export const useSendVerificationCode = ({
  setCodeOTP,
  userForm,
}: UseSendVerificationCodeProps): UseSendVerificationCodeReturn => {
  const [isSending, setIsSending] = useState<boolean>(false);

  const sendVerificationCode = async (phoneNumber: string) => {
    setIsSending(true);

    const to = formatPhoneNumber(phoneNumber);
    const randomCode: string = generateOTP();

    try {
      const bodyRequest: MessageBodyRequest = {
        templateName: 'verify_whatsapp',
        to,
        components: [
          {
            type: 'body',
            parameters: [
              {
                type: 'text',
                text: randomCode,
              },
            ],
          },
          {
            type: 'button',
            sub_type: 'url',
            index: '0',
            parameters: [
              {
                type: 'text',
                text: randomCode,
              },
            ],
          },
        ],
      };

      const response = await fetch('/api/sendMessage', {
        method: 'POST',
        body: JSON.stringify(bodyRequest),
      });

      if (!response.ok) {
        throw new Error(`Error al enviar mensaje: ${response.status} ${response.statusText}`);
      }

      setCodeOTP(randomCode);
    } catch (error) {
      console.error(error instanceof Error ? error.message : 'Error desconocido');
      setCodeOTP('');
      userForm.setFields([
        {
          name: 'phone',
          errors: ['No se pudo enviar el código. Por favor, contacta directamente a la barbería.'],
        },
      ]);
    } finally {
      setIsSending(false);
    }
  };

  return {
    isSending,
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    sendVerificationCode,
  };
};
