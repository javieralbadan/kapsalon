import { MessageBodyRequest } from '@/types/messages';
import { handleNextErrorResponse, handleNextSuccessResponse } from '@/utils/mappers/nextResponse';

const WHATSAPP_API_URL = 'https://graph.facebook.com/v22.0';
const PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;
const ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;

export async function POST(req: Request) {
  try {
    const { templateName, to, components } = (await req.json()) as MessageBodyRequest;

    if (!to || !components) {
      return handleNextErrorResponse('Faltan parámetros');
    }

    const bodyRequest = {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      type: 'template',
      to,
      template: {
        language: { code: 'es_CO' },
        name: templateName,
        components,
      },
    };

    const response = await fetch(`${WHATSAPP_API_URL}/${PHONE_NUMBER_ID}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
      body: JSON.stringify(bodyRequest),
    });

    const result: unknown = await response.json();
    if (!response.ok) {
      const { error } = result as { error: { message: string } };
      return handleNextErrorResponse((error as Error) || 'Error al enviar el mensaje');
    }

    return handleNextSuccessResponse({ success: true, response: result });
  } catch (error) {
    return handleNextErrorResponse(error as Error);
  }
}
