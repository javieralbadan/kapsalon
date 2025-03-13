'use client';

import { AppLogo } from '@/components/AppLogo';
import { Button } from 'antd';
import Link from 'next/link';

const CLASSES = {
  FLEX_CENTER: 'flex flex-col items-center justify-center',
  CONTAINER: 'h-[calc(100vh-39px)] max-w-[1400px]',
  LOGO: 'max-h-[300px] px-20 sm:px-24 md:h-auto md:max-h-[600px] md:w-1/2 md:p-4',
};

const HomePage = () => {
  return (
    <div className={`${CLASSES.CONTAINER} ${CLASSES.FLEX_CENTER} m-auto md:flex-row-reverse`}>
      <div className={`${CLASSES.FLEX_CENTER} ${CLASSES.LOGO}`}>
        <AppLogo style="blue" />
      </div>
      <div className={`${CLASSES.FLEX_CENTER} p-8 md:w-1/2 md:px-4 lg:px-24`}>
        <h1 className="mb-8 text-center text-4xl font-bold text-black md:text-6xl">
          Agenda tu cita de <span className="-highlight-text font-bold">barbería</span> en segundos
        </h1>
        <Link href="/agendar-cita">
          <Button type="primary">Agendar</Button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
