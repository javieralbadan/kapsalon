'use client';
import ClientErrorBoundary from '@/components/ui/ClientErrorBoundary';
import { Loading } from '@/components/ui/Loading';
import { LockOutlined } from '@ant-design/icons';
import { Card, InputNumber, message, Result } from 'antd';
import { Suspense, useState } from 'react';

const TEMP_ACCESS_CODE = '2443';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [accessGranted, setAccessGranted] = useState(false);

  const handleChange = (value: string | number | null | undefined) => {
    if (value === undefined || value === null || value === '') return;

    const cleanValue = String(value);
    if (cleanValue === TEMP_ACCESS_CODE) {
      setAccessGranted(true);
      message.destroy();
    } else if (cleanValue.length === 10) {
      message.warning('Número no válido');
    }
  };

  if (!accessGranted) {
    return (
      <div className="flex h-screen flex-col items-center justify-center">
        <Result
          status="403"
          title="Acceso restringido"
          icon={<LockOutlined />}
          extra={
            <Card className="m-auto w-full max-w-[500px]">
              <InputNumber
                autoFocus
                controls={false}
                onChange={handleChange}
                prefix={<LockOutlined />}
                placeholder="Código de acceso"
                style={{ width: '100%', textAlign: 'center' }}
              />
            </Card>
          }
        />
      </div>
    );
  }

  return (
    <ClientErrorBoundary>
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </ClientErrorBoundary>
  );
}
