import { useIsMobile } from '@/hooks/useIsMobile';
import { AppointmentDetailsData } from '@/types/appointments';
import { formatDateTime } from '@/utils/formatters';
import { statusMapper } from '@/utils/mappers/appointment';
import { CalendarOutlined, ScissorOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Card, Col, Row, Space, Tag } from 'antd';

const AppointmentsList = ({ data }: { data: AppointmentDetailsData[] }) => {
  const isMobile = useIsMobile();

  return (
    <div className="w-full" style={{ maxWidth: '500px' }}>
      {data.map((item) => (
        <Card key={item.id} style={{ marginBottom: 8 }}>
          <Row gutter={[16, 16]} align="middle">
            <Col xs={24} md={18}>
              <div>
                <p className="mb-2">
                  <Tag bordered={false} color={statusMapper[item.status].color} className="mr-2">
                    {statusMapper[item.status].text}
                  </Tag>
                </p>
                <p>
                  <CalendarOutlined className="mr-2" />
                  {formatDateTime({ dateString: item.date_time })}
                </p>
                <p>
                  <UserOutlined className="mr-2" />
                  {item.customers?.first_name} {item.customers?.last_name}
                </p>
                <p>
                  <ScissorOutlined className="mr-2" />
                  {item.services?.name}
                </p>
              </div>
            </Col>
            <Col xs={24} md={6} className="flex justify-end">
              <Space size="small" direction={isMobile ? 'horizontal' : 'vertical'} align="end">
                <Button size="small" onClick={() => console.log('Editar', item.id)}>
                  Editar
                </Button>
                <Button size="small" danger onClick={() => console.log('Eliminar', item.id)}>
                  Eliminar
                </Button>
              </Space>
            </Col>
          </Row>
        </Card>
      ))}
    </div>
  );
};

export default AppointmentsList;
