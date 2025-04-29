import { AuthComponentsType, UtilityComponentsType } from '@/types/messages';

// ******** VERIFICATION ********

/*
TEMPLATE: verify_whatsapp
Tu código de verificación es {{codeOTP}}.
Botón: "Copiar código"
*/
export const getVerificationComponents = (code: string): AuthComponentsType => [
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

// ******** APPOINTMENT CREATION ********
/*
TEMPLATE: confirm_appointment_staff
Una nueva cita ha sido confirmada:
📆 {{date}}
‍💈 {{service}} → {{price}}
👨‍ {{client}}
Botón 1 [Cancelar cita] (url dinámica): https://kapsalon.vercel.app/cancelar-cita/{{appointmentId}}
Botón 1 [Ver citas] (url estática): https://kapsalon.vercel.app/dashboard/agenda
*/

interface ApptCreationStaff {
  date: string;
  service: string;
  price: string;
  client: string;
  appointmentId: string;
}

const getApptCreationStaff = (params: ApptCreationStaff): UtilityComponentsType => [
  {
    type: 'body',
    parameters: [
      { type: 'text', parameter_name: 'date', text: params.date },
      { type: 'text', parameter_name: 'service', text: params.service },
      { type: 'text', parameter_name: 'price', text: params.price },
      { type: 'text', parameter_name: 'client', text: params.client },
    ],
  },
  {
    type: 'button',
    sub_type: 'url',
    index: 0,
    parameters: [{ type: 'text', text: `/${params.appointmentId}` }],
  },
];

/*
TEMPLATE: confirm_appointment_user
Tu cita ha sido confirmada:
‍💈 {{service}} → {{price}}
📆 {{date}}
📍 {{address}}

¡Te esperamos! 👋

Botón 1 [Reagendar] (url dinámica): https://kapsalon.vercel.app/editar-cita/{{appointmentId}}
Botón 2 [Cancelar] (url dinámica): https://kapsalon.vercel.app/cancelar-cita/{{appointmentId}}
*/

interface ApptCreationCustomer {
  service: string;
  price: string;
  date: string;
  address: string;
  appointmentId: string;
}

const getApptCreationCustomer = (params: ApptCreationCustomer): UtilityComponentsType => [
  {
    type: 'body',
    parameters: [
      { type: 'text', parameter_name: 'service', text: params.service },
      { type: 'text', parameter_name: 'price', text: params.price },
      { type: 'text', parameter_name: 'date', text: params.date },
      { type: 'text', parameter_name: 'address', text: params.address },
    ],
  },
  {
    type: 'button',
    sub_type: 'url',
    index: 0,
    parameters: [{ type: 'text', text: `/${params.appointmentId}` }],
  },
  {
    type: 'button',
    sub_type: 'url',
    index: 1,
    parameters: [{ type: 'text', text: `/${params.appointmentId}` }],
  },
];

interface ApptCreationComponents {
  staffComponents: (params: ApptCreationStaff) => UtilityComponentsType;
  customerComponents: (params: ApptCreationCustomer) => UtilityComponentsType;
}

export const getApptCreationComponents: ApptCreationComponents = {
  staffComponents: getApptCreationStaff,
  customerComponents: getApptCreationCustomer,
};

// ******** APPOINTMENT EDITION ********
/*
TEMPLATE: update_appointment_staff
{{client}} ha cambiado su cita. La nueva fecha es:
📆 {{date}}

Espacio liberado (fecha anterior):
✂️ {{original_date}}
Botón 1 [Cancelar cita] (url dinámica): https://kapsalon.vercel.app/cancelar-cita/{{appointmentId}}
Botón 1 [Ver citas] (url estática): https://kapsalon.vercel.app/dashboard/agenda
*/

interface ApptEditionStaff {
  client: string;
  date: string;
  original_date: string;
  appointmentId: string;
}

const getApptEditionStaff = (params: ApptEditionStaff): UtilityComponentsType => [
  {
    type: 'body',
    parameters: [
      { type: 'text', parameter_name: 'client', text: params.client },
      { type: 'text', parameter_name: 'date', text: params.date },
      { type: 'text', parameter_name: 'original_date', text: params.original_date },
    ],
  },
  {
    type: 'button',
    sub_type: 'url',
    index: 0,
    parameters: [{ type: 'text', text: `/${params.appointmentId}` }],
  },
];

/*
TEMPLATE: update_appointment_user
La nueva fecha de tu cita es:
📆 {{date}}

Botón 1 [Reagendar] (url dinámica): https://kapsalon.vercel.app/editar-cita/{{appointmentId}}
Botón 2 [Cancelar] (url dinámica): https://kapsalon.vercel.app/cancelar-cita/{{appointmentId}}
*/

interface ApptEditionCustomer {
  date: string;
  appointmentId: string;
}

const getApptEditionCustomer = (params: ApptEditionCustomer): UtilityComponentsType => [
  {
    type: 'body',
    parameters: [{ type: 'text', parameter_name: 'date', text: params.date }],
  },
  {
    type: 'button',
    sub_type: 'url',
    index: 0,
    parameters: [{ type: 'text', text: `/${params.appointmentId}` }],
  },
  {
    type: 'button',
    sub_type: 'url',
    index: 1,
    parameters: [{ type: 'text', text: `/${params.appointmentId}` }],
  },
];

interface ApptEditionComponents {
  staffComponents: (params: ApptEditionStaff) => UtilityComponentsType;
  customerComponents: (params: ApptEditionCustomer) => UtilityComponentsType;
}

export const getApptEditionComponents: ApptEditionComponents = {
  staffComponents: getApptEditionStaff,
  customerComponents: getApptEditionCustomer,
};

// ******** APPOINTMENT CANCELATION ********
/*
TEMPLATE: cancel_appointment_staff
⛔ {{client}} ha cancelado la cita del {{date}}
Botón 1 [Ver citas] (url estática): https://kapsalon.vercel.app/dashboard/agenda
*/

interface ApptCancelStaff {
  client: string;
  date: string;
}

const getApptCancelStaff = (params: ApptCancelStaff): UtilityComponentsType => [
  {
    type: 'body',
    parameters: [
      { type: 'text', parameter_name: 'date', text: params.date },
      { type: 'text', parameter_name: 'client', text: params.client },
    ],
  },
];

/*
TEMPLATE: cancel_appointment_user
Tu cita para el día {{date}} ha sido cancelada.👍
Botón 1 [Agendar nueva cita] (url estática): https://kapsalon.vercel.app/
*/

interface ApptCancelCustomer {
  date: string;
}

const getApptCancelCustomer = (params: ApptCancelCustomer): UtilityComponentsType => [
  {
    type: 'body',
    parameters: [{ type: 'text', parameter_name: 'date', text: params.date }],
  },
];

interface ApptCancelComponents {
  staffComponents: (params: ApptCancelStaff) => UtilityComponentsType;
  customerComponents: (params: ApptCancelCustomer) => UtilityComponentsType;
}

export const getApptCancelComponents: ApptCancelComponents = {
  staffComponents: getApptCancelStaff,
  customerComponents: getApptCancelCustomer,
};
