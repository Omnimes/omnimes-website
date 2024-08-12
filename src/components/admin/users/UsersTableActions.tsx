'use client'

import { Button } from '@/components/ui/Button';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useState, useTransition } from 'react';
import { LuLoader2 } from 'react-icons/lu';

type Props = {
    offset: number | null;
    prevOffset: number | null;
    totalUsers: number | null;
}
export const UserTableActions = ({ offset, prevOffset, totalUsers }: Props) => {
    const t = useTranslations("AdminUsers")
    const [isPending, startTransition] = useTransition();
    const [activeButton, setActiveButton] = useState<'prev' | 'next' | null>(null);
    const router = useRouter();
    const pathname = usePathname();

    function onClick(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        e.stopPropagation();
        setActiveButton('next');
        startTransition(() => {
            router.replace(`${pathname}/?offset=${offset}`);
        });
    }
    function onClickPrev(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        e.stopPropagation();
        setActiveButton('prev');
        startTransition(() => {
            router.replace(`${pathname}/?offset=${prevOffset}`);
        });
    }

    return (
        <div className="flex items-center justify-end space-x-2 py-4 flex-wrap gap-2">
            <div className="flex-1 text-sm text-muted-foreground">
                {t("allUsers")}: {totalUsers}
            </div>
            <div className="space-x-2 flex items-center">
                <Button
                    className="w-fit"
                    variant="primary"
                    aria-label={t('prev')}
                    aria-labelledby={t('prev')}
                    title={t('prev')}
                    role="button"
                    disabled={prevOffset == null || Number(offset) == 1 || (isPending && activeButton === 'next')}
                    onClick={(e) => onClickPrev(e)}
                >
                    <span className="flex gap-2 items-center">
                        {isPending && activeButton === 'prev' && <LuLoader2 className="animate-spin" />}{t("prev")}
                    </span>
                </Button>
                <Button
                    className="w-fit"
                    variant="primary"
                    aria-label={t('next')}
                    aria-labelledby={t('next')}
                    title={t('next')}
                    role="button"
                    disabled={offset == null || (isPending && activeButton === 'prev')}
                    onClick={(e) => onClick(e)}
                >
                    <span className="flex gap-2 items-center">
                        {isPending && activeButton === 'next' && <LuLoader2 className="animate-spin" />}{t("next")}
                    </span>
                </Button>
            </div>
        </div>
    )
}