import { ComponentsType, MessageBodyRequest } from '@/types/messages';
import { formatPhoneNumber } from '@/utils/formatters';
import { useState } from 'react';

interface SendMessageProps {
  templateName: string;
  to: string;
  components: ComponentsType[];
}

export const useSendWhatsAppMessage = () => {
  const [isSending, setIsSending] = useState<boolean>(false);

  const sendMessage = async ({ templateName, to, components }: SendMessageProps) => {
    setIsSending(true);
    const formattedPhone = formatPhoneNumber(to);

    try {
      const bodyRequest: MessageBodyRequest = {
        templateName,
        to: formattedPhone,
        components,
      };

      const response = await fetch('/api/sendMessage', {
        method: 'POST',
        body: JSON.stringify(bodyRequest),
      });

      if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Error desconocido',
      };
    } finally {
      setIsSending(false);
    }
  };

  return { isSending, sendMessage };
};
