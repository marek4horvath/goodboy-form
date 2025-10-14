'use client';

import React from 'react';
import { AppLayout } from '@/components/Layout/Layout';
import { Stepper } from '@/components/Stepper/Stepper';

export default function HomePage() {
  return (
    <AppLayout>
      <Stepper />
    </AppLayout>
  );
}
