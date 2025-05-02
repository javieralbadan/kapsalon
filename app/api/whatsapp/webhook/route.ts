import { MessageBodyRequest } from '@/types/messages';
import { getBarberAccessComponents } from '@/utils/messageComponents';
import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export function GET(request: NextRequest) {
  console.log('🚀 ~ GET ~ Webhook recibido:', new Date().toISOString());
  const searchParams = request.nextUrl.searchParams;
  console.log('🚀 ~ GET ~ searchParams:', searchParams);
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');
  console.log(`🚀 ~ GET params: mode=${mode}, token=${token}, challenge=${challenge}`);

  if (mode === 'subscribe' && token === process.env.META_VERIFY_TOKEN) {
    console.log('🚀 ~ GET ~ Verificación exitosa, respondiendo con challenge');
    return new NextResponse(challenge, { status: 200 });
  }

  console.log('🚀 ~ GET ~ Verificación fallida');
  return new NextResponse('Verificación fallida', { status: 403 });
}

interface WebhookBody {
  entry: [
    {
      changes: [
        {
          value: {
            messages: [
              {
                from: string;
                text: { body: string };
              },
            ];
          };
        },
      ];
    },
  ];
}

export async function POST(request: NextRequest) {
  try {
    console.log('Webhook POST recibido:', new Date().toISOString());
    const body = (await request.json()) as WebhookBody;
    console.log('Payload completo:', JSON.stringify(body));

    if (!body.entry || !body.entry[0].changes || !body.entry[0].changes[0].value.messages) {
      console.log('No es un mensaje de WhatsApp o formato incorrecto');
      // Siempre devolver 200 OK a la API de WhatsApp
      return NextResponse.json({ success: true }, { status: 200 });
    }

    const message = body.entry[0].changes[0].value.messages[0];
    const phoneNumber = message.from;
    console.log('🚀 ~ POST ~ phoneNumber:', phoneNumber);
    const formattedPhone = `+${phoneNumber}`; // Asegura formato internacional que coincide con el de Supabase
    console.log(`Mensaje recibido de ${phoneNumber}: ${JSON.stringify(message)}`);

    const supabase = await createClient();
    // Buscar usuario por teléfono
    const { data: user, error: userError } = await supabase
      .from('staff')
      .select('*')
      .eq('phone_number', formattedPhone)
      .single();

    if (userError) {
      console.error('Error al buscar usuario:', userError);
      return NextResponse.json({ success: true }, { status: 200 });
    }

    if (!user) {
      console.log('Usuario no registrado');
      return NextResponse.json({ success: true }, { status: 200 });
    }

    console.log(`Usuario encontrado: ${user.first_name} ${user.last_name}`);
    // Generar Magic Link
    const { data: link, error: linkError } = await supabase.auth.admin.generateLink({
      type: 'magiclink',
      email: user.email,
      options: { redirectTo: '/dashboard' },
    });

    if (linkError) {
      console.log('Error al generar el Magic Link:', linkError.message);
      return NextResponse.json({ success: true }, { status: 200 });
    }

    // Enviar respuesta por WhatsApp
    const bodyRequest: MessageBodyRequest = {
      templateName: 'magic_link',
      to: formattedPhone,
      components: getBarberAccessComponents({
        barberName: user.first_name,
        link: link.properties.action_link,
      }),
    };

    // await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/send-message`
    await fetch('/api/send-message', {
      method: 'POST',
      body: JSON.stringify(bodyRequest),
    });

    console.log('Mensaje enviado con éxito');
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error en el webhook:', error);
    // Importante: Siempre devolver 200 OK a la API de WhatsApp, incluso en caso de error
    return NextResponse.json({ success: true }, { status: 500 });
  }
}
