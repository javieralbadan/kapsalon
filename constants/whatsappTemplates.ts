export const WHATSAPP_TEMPLATES = {
  confirmAppt: {
    customer: {
      main: 'confirm_appointment_user',
      backup: 'confirm_appointment_user_backup',
    },
    staff: {
      main: 'confirm_appointment_staff',
      backup: 'confirm_appointment_staff_backup',
    },
  },
  // TODO: Create backup templates
  updateAppt: {
    customer: 'update_appointment_user',
    staff: 'update_appointment_staff',
  },
  cancelAppt: {
    customer: 'cancel_appointment_user',
    staff: 'cancel_appointment_staff',
  },
  verifyPhoneNumber: 'verify_phone_number',
};
