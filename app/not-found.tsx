'use client';
import { SmileOutlined } from '@ant-design/icons';
import { Button, Result } from 'antd';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NotFound() {
  const pathname = usePathname();

  const isFromAppointmentEdit = pathname?.startsWith('/editar-cita/');
  const title = isFromAppointmentEdit ? 'Cita no encontrada' : 'Página no encontrada';

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Result
        status="404"
        title={title}
        subTitle="No logramos encontrar la info que estás buscando"
        icon={<SmileOutlined />}
        extra={
          <Link href="/">
            <Button type="primary">Volver al inicio</Button>
          </Link>
        }
      />
    </div>
  );
}
