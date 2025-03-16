import { MessageBodyRequest } from '@/types/messages';
import { NextResponse } from 'next/server';

const WHATSAPP_API_URL = 'https://graph.facebook.com/v22.0';
const PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;
const ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;

export async function POST(req: Request) {
  try {
    const { templateName, to, components } = (await req.json()) as MessageBodyRequest;

    if (!to || !components) {
      return NextResponse.json({ error: 'Faltan parámetros' }, { status: 400 });
    }

    const bodyRequest = {
      messaging_product: 'whatsapp',
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
      return NextResponse.json((result as { error: unknown })?.error, { status: response.status });
    }

    return NextResponse.json({ success: true, response: result });
  } catch (error) {
    return NextResponse.json(
      {
        error: (error as Error)?.message || 'Error interno',
        details: (error as { error_data?: unknown })?.error_data || null,
      },
      { status: error instanceof Error ? 500 : 400 },
    );
  }
}
