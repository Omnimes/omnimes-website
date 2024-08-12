import { AnchorIcon } from '@/components/ui/Icons';
import { Button, Link } from '@nextui-org/react';
import {useTranslations} from 'next-intl';
// Note that `app/[locale]/[...rest]/page.tsx`
// is necessary for this page to render.

export default function NotFoundPage() {
  const t = useTranslations('NotFound');

  return (
    <div className="flex flex-col items-start justify-start md:mt-24 md:flex-row md:items-center md:justify-center md:space-x-6">
      <div className="space-x-2 pb-8 pt-6 md:space-y-5">
        <h1 className="text-6xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 md:border-r-2 md:px-6 md:text-8xl md:leading-14">
          404
        </h1>
      </div>
      <div className="max-w-md">
        <p className="mb-4 text-xl font-bold leading-normal md:text-2xl">
          {t('title')}
        </p>
        <p className="mb-8">
          {t('description')}  
        </p>
         <Button
            as={Link}
            href="/"
            showAnchorIcon
            anchorIcon={<AnchorIcon />}
            aria-label={t('action')}
            aria-labelledby={t('action')}
            title={t('action')}
            role="button"
            className="bg-gradient-to-tr from-[#FF1CF7] to-[#b249f8] text-white shadow-lg"
          >
            {t('action')} 
          </Button>
      </div>
    </div>
  );
}