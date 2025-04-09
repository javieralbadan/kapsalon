import { MessageBodyRequest } from '@/types/messages';
import { formatPhoneNumber } from '@/utils/formatters';
import { useState } from 'react';

export const useSendWhatsAppMessage = () => {
  const [isSending, setIsSending] = useState<boolean>(false);

  const sendMessage = async ({ templateName, to, components }: MessageBodyRequest) => {
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

      if (!response.ok) {
        const result: unknown = await response.json();
        throw new Error((result as { error: string })?.error || 'Error al enviar el mensaje');
      }

      return { success: true, error: null };
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
