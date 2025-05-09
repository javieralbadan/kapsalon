import { WHATSAPP_TEMPLATES } from '@/constants/whatsappTemplates';
import { UseVerificationCodeProps, UseVerificationCodeReturn } from '@/types/messages';
import { getVerificationComponents } from '@/utils/messageComponents';
import { useWhatsAppMessage } from './useWhatsAppMessage';

export const useVerificationCode = ({
  setCodeOTP,
  userForm,
}: UseVerificationCodeProps): UseVerificationCodeReturn => {
  const { sendMessage, isSending } = useWhatsAppMessage();

  const sendCode = async (phoneNumber: string) => {
    const generateOTP = () => Math.floor(1000 + Math.random() * 9000).toString();
    const randomCode: string = generateOTP();

    try {
      const { error } = await sendMessage({
        templateName: WHATSAPP_TEMPLATES.verifyPhoneNumber,
        to: phoneNumber,
        components: getVerificationComponents(randomCode),
      });

      if (error) throw new Error(error);

      setCodeOTP(randomCode);
    } catch (error) {
      console.error(error);
      setCodeOTP('');
      userForm.setFields([
        {
          name: 'phone',
          errors: ['Falló el envío del código. Intenta más tarde.'],
        },
      ]);
    }
  };

  return {
    isSending,
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    sendCode,
  };
};
