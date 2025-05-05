import ApptEditionStepper from '@/components/appointment/ApptEditionStepper';
import { useIsMobile } from '@/hooks/useIsMobile';
import { AppointmentEditionType, AppointmentStatus } from '@/types/appointments';
import { getColombiaNowISO } from '@/utils/formatters';
import { CalendarOutlined, ScissorOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Card, Col, Modal, Row, Space } from 'antd';
import { useState } from 'react';
import ApptStatusTag from '../appointment/ApptStatusTag';
import ApptSummaryCard from '../appointment/ApptSummaryCard';
import ApptCancelButton from '../cancel/ApptCancelButton';

type ApptEditionType = 'edit' | 'cancel';

const AppointmentsList = ({ list }: { list: AppointmentEditionType[] }) => {
  const isMobile = useIsMobile();
  const [currentAppt, setCurrentAppt] = useState<AppointmentEditionType | null>(null);
  const [showEditModal, setShowEditModal] = useState<ApptEditionType | ''>('');

  const isEditable = ({ appt }: AppointmentEditionType) => {
    const apptDateTime = new Date(appt.dateTimeISO || '');
    const isInTheFuture = apptDateTime > getColombiaNowISO();

    const { Confirmed, Rescheduled } = AppointmentStatus;
    const canEdit = appt.status === Confirmed || appt.status === Rescheduled;

    return isInTheFuture && canEdit;
  };

  const handleEditAppt = (item: AppointmentEditionType, typeEdition: ApptEditionType) => {
    setCurrentAppt(item);
    setShowEditModal(typeEdition);
  };

  return (
    <>
      <div className="w-full">
        {list.map((apptToEdit) => (
          <Card key={apptToEdit.appt.id} style={{ marginBottom: 8 }}>
            <Row gutter={[16, 16]} align="middle">
              <Col xs={24} md={18}>
                <p className="mb-2">
                  <ApptStatusTag status={apptToEdit.appt.status as AppointmentStatus} />
                </p>
                <p>
                  <CalendarOutlined className="mr-2" />
                  {apptToEdit.appt.dateTime}
                </p>
                <p>
                  <UserOutlined className="mr-2" />
                  {apptToEdit.customer.firstName} {apptToEdit.customer.lastName}
                </p>
                <p>
                  <ScissorOutlined className="mr-2" />
                  {apptToEdit.service.name}
                </p>
              </Col>
              {isEditable(apptToEdit) && (
                <Col xs={24} md={6} className="flex justify-end">
                  <Space size="small" direction={isMobile ? 'horizontal' : 'vertical'} align="end">
                    <Button size="small" onClick={() => handleEditAppt(apptToEdit, 'edit')}>
                      Editar
                    </Button>
                    <Button
                      size="small"
                      danger
                      onClick={() => handleEditAppt(apptToEdit, 'cancel')}
                    >
                      Eliminar
                    </Button>
                  </Space>
                </Col>
              )}
            </Row>
          </Card>
        ))}
      </div>

      <Modal
        open={!!showEditModal}
        centered
        width={550}
        title={showEditModal === 'edit' ? 'Reagendar cita' : 'Cancelar cita'}
        style={{ textAlign: 'center' }}
        okButtonProps={{ style: { display: 'none' } }}
        cancelText="Cerrar"
        onCancel={() => setShowEditModal('')}
      >
        <ApptSummaryCard
          apptToEdit={currentAppt}
          actionType={showEditModal || 'edit'}
          isInTheFuture
        />
        {currentAppt && showEditModal === 'edit' && <ApptEditionStepper {...currentAppt} />}
        {currentAppt && showEditModal === 'cancel' && <ApptCancelButton appt={currentAppt} />}
      </Modal>
    </>
  );
};

export default AppointmentsList;
