'use client';
import LegalBreadcrumb from '@/components/layout/LegalBreadcrumb';
import { FormUserInfoType } from '@/types/messages';
import { Button, Form, Input, Typography } from 'antd';

const { Title, Paragraph } = Typography;

const DeleteDataPage = () => {
  const [deleteUserDataForm] = Form.useForm();

  const onFinish = (values: FormUserInfoType) => {
    console.log('Datos recibidos:', values);
    // TODO: Create a register in DB
  };

  return (
    <section className="legal-container">
      <LegalBreadcrumb currentPage="Eliminar Datos" />

      <Title level={2}>SOLICITUD ELIMINAR DATOS</Title>

      <div style={{ padding: '50px', maxWidth: '600px', margin: '0 auto' }}>
        <Paragraph>Por favor, ingrese sus datos para darse de baja.</Paragraph>
        <Form form={deleteUserDataForm} layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="firstName"
            label="Nombre"
            rules={[{ required: true, message: 'Por favor, ingrese su nombre' }]}
          >
            <Input placeholder="Ingrese su nombre" />
          </Form.Item>
          <Form.Item
            name="lastName"
            label="Apellido"
            rules={[{ required: true, message: 'Por favor, ingrese su apellido' }]}
          >
            <Input placeholder="Ingrese su apellido" />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Número de WhatsApp"
            rules={[{ required: true, message: 'Por favor, ingrese su número de WhatsApp' }]}
          >
            <Input placeholder="Ingrese su número de WhatsApp" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Enviar
            </Button>
          </Form.Item>
        </Form>
      </div>
    </section>
  );
};

export default DeleteDataPage;
