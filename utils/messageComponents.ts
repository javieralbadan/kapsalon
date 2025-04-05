import { ComponentsType } from '@/types/messages';

// TEMPLATE: verify_whatsapp
export const getVerificationComponents = (code: string): ComponentsType[] => [
  {
    type: 'body',
    parameters: [{ type: 'text', text: code }],
  },
  {
    type: 'button',
    sub_type: 'url',
    index: 0,
    parameters: [{ type: 'text', text: code }],
  },
];

interface StaffConfirmationComponentsParams {
  date: string;
  service: string;
  price: string;
  client: string;
}

/*
TEMPLATE: confirm_appointment_staff
Una nueva cita ha sido confirmada:
📆 {{date}}
‍💈 {{service}} → {{price}}
👨‍ {{client}}
*/
export const getStaffConfirmationComponents = ({
  date,
  service,
  price,
  client,
}: StaffConfirmationComponentsParams): ComponentsType[] => [
  {
    type: 'body',
    parameters: [
      { type: 'text', text: date },
      { type: 'text', text: service },
      { type: 'text', text: price },
      { type: 'text', text: client },
    ],
  },
];

interface CustomerConfirmationComponentsParams {
  service: string;
  price: string;
  date: string;
  address: string;
  appointmentId: string;
}

/*
TEMPLATE: confirm_appointment_user
Tu cita ha sido confirmada:
‍💈 {{service}} → {{price}}
📆 {{date}}
📍 {{address}}

¡Te esperamos! 👋

Botón 1 (url dinámica): https://kapsalon.vercel.app/editar-cita/{{appointmentId}}
Botón 2 (url dinámica): https://kapsalon.vercel.app/cancelar-cita/{{appointmentId}}
*/
export const getCustomerConfirmationComponents = ({
  service,
  price,
  date,
  address,
  appointmentId,
}: CustomerConfirmationComponentsParams): ComponentsType[] => [
  {
    type: 'body',
    parameters: [
      { type: 'text', text: service },
      { type: 'text', text: price },
      { type: 'text', text: date },
      { type: 'text', text: address },
    ],
  },
  {
    type: 'button',
    sub_type: 'url',
    index: 0,
    parameters: [{ type: 'text', text: appointmentId }],
  },
  {
    type: 'button',
    sub_type: 'url',
    index: 1,
    parameters: [{ type: 'text', text: appointmentId }],
  },
];
