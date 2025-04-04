import { ComponentsType } from '@/types/messages';

export const getVerificationComponents = (code: string): ComponentsType[] => [
  {
    type: 'body',
    parameters: [{ type: 'text', text: code }],
  },
  {
    type: 'button',
    sub_type: 'url',
    index: '0',
    parameters: [{ type: 'text', text: code }],
  },
];

interface StaffConfirmationComponentsParams {
  date: string;
  service: string;
  client: string;
}

export const getStaffConfirmationComponents = ({
  date,
  service,
  client,
}: StaffConfirmationComponentsParams): ComponentsType[] => [
  {
    type: 'body',
    parameters: [
      { type: 'text', text: date },
      { type: 'text', text: service },
      { type: 'text', text: client },
    ],
  },
];

interface CustomerConfirmationComponentsParams {
  service: string;
  date: string;
  address: string;
  appointmentId: string;
}

export const getCustomerConfirmationComponents = ({
  service,
  date,
  address,
  appointmentId,
}: CustomerConfirmationComponentsParams): ComponentsType[] => [
  {
    type: 'body',
    parameters: [
      { type: 'text', text: service },
      { type: 'text', text: date },
      { type: 'text', text: address },
    ],
  },
  {
    type: 'button',
    sub_type: 'url',
    index: '0',
    parameters: [{ type: 'text', text: appointmentId }],
  },
  {
    type: 'button',
    sub_type: 'url',
    index: '1',
    parameters: [{ type: 'text', text: appointmentId }],
  },
];
