'use client';

import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { useTransition, useEffect, useState } from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/Select"
import { LuLoader2 } from 'react-icons/lu';

export function SearchRole(props: { value?: string }) {
  const router = useRouter();
  const [value, setValue] = useState(props.value);
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const t = useTranslations("AdminUsers");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (value === undefined) {
      return;
    } else if (value && value !== 'all') {
      params.set('r', value);
    } else {
      params.delete('r');
    }

    startTransition(() => {
      // All navigations are transitions automatically
      // But wrapping this allow us to observe the pending state
      router.replace(`${pathname}/?${params.toString()}`);
    });
  }, [router, value]);

  return (
    <div className="relative">
        <Select disabled={isPending} onValueChange={(e) => {setValue(e)}} defaultValue={t('all')}>
            <SelectTrigger className="w-[180px] h-9">
              <SelectValue placeholder={t("placeholderRole")}>
                <span className="flex gap-2 items-center">
                  {isPending && <LuLoader2 className="animate-spin" />}
                  {t(value ?? 'all')}
                </span>
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="all">{t("all")}</SelectItem>
                <SelectItem value="admin">{t("admin")}</SelectItem>
                <SelectItem value="developer">{t("developer")}</SelectItem>
                <SelectItem value="user">{t("user")}</SelectItem>
            </SelectContent>
        </Select>
    </div>
  );
}