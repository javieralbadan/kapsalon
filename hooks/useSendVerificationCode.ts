import { UseSendVerificationCodeProps, UseSendVerificationCodeReturn } from '@/types/messages';
import { getVerificationComponents } from '@/utils/messageComponents';
import { useSendWhatsAppMessage } from './useSendWhatsAppMessage';

export const useSendVerificationCode = ({
  setCodeOTP,
  userForm,
}: UseSendVerificationCodeProps): UseSendVerificationCodeReturn => {
  const { sendMessage, isSending } = useSendWhatsAppMessage();

  const sendVerificationCode = async (phoneNumber: string) => {
    const generateOTP = () => Math.floor(1000 + Math.random() * 9000).toString();
    const randomCode: string = generateOTP();

    try {
      const { success, error } = await sendMessage({
        templateName: 'verify_whatsapp',
        to: phoneNumber,
        components: getVerificationComponents(randomCode),
      });

      if (error) throw new Error(error);

      console.log('🚀 ~ sendVerificationCode ~ success:', success);
      setCodeOTP(randomCode);
    } catch (error) {
      console.error(error);
      setCodeOTP('');
      userForm.setFields([
        {
          name: 'phone',
          errors: ['No se pudo enviar el código. Por favor, contacta directamente a la barbería.'],
        },
      ]);
    }
  };

  return {
    isSending,
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    sendVerificationCode,
  };
};
