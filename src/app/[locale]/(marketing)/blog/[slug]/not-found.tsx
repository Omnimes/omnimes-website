import { AnchorIcon } from '@/components/atoms/Icons';
import { Button, Link } from '@nextui-org/react';
export default async function NotFoundPage() {
  // const t = await getTranslations('NotFoundBlog');
 
  return (
    <div className="flex flex-col items-start justify-start md:mt-24 md:flex-row md:items-center md:justify-center md:space-x-6">
      <div className="space-x-2 pb-8 pt-6 md:space-y-5">
        <h1 className="text-6xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 md:border-r-2 md:px-6 md:text-8xl md:leading-14">
          404
        </h1>
      </div>
      <div className="max-w-md">
        <p className="mb-4 text-xl font-bold leading-normal md:text-2xl">
          {/* {t('title')}  */}error
        </p>
        <p className="mb-8"> 
          {/* {t('description')}    */}error
        </p>
         <Button
            as={Link}
            href="/"
            showAnchorIcon
            anchorIcon={<AnchorIcon />}
            className="bg-gradient-to-tr from-[#FF1CF7] to-[#b249f8] text-white shadow-lg"
          >
            {/* {t('action')}   */} error
          </Button>
      </div>
    </div>
  );
}