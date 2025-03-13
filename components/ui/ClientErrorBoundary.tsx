'use client';
import { Empty } from 'antd';
import { PropsWithChildren } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

const ErrorFallback = ({ error }: { error: Error }) => (
  <div className="flex h-[calc(100vh-180px)] items-center justify-center">
    <Empty description={`Error: ${error.message}`} />
  </div>
);

const ClientErrorBoundary: React.FC<PropsWithChildren> = ({ children }) => {
  return <ErrorBoundary FallbackComponent={ErrorFallback}>{children}</ErrorBoundary>;
};

export default ClientErrorBoundary;
