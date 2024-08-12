'use client'
import { Skeleton } from '@nextui-org/react';
import React, { Suspense } from 'react';
const Spline = React.lazy(() => import('@splinetool/react-spline'));

export default function ComponentSpline({ url }: { url: string }) {
  return (
    <Suspense fallback={<Skeleton className="spline rounded-lg flex justify-center min-h-2 aspect-video" />}>
        <Spline scene={url} className='spline' />
    </Suspense>
  );
}