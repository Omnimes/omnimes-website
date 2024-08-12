'use client';

import { Input } from '@/components/ui/Input';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { useTransition, useEffect, useRef, useState } from 'react';
import { LuLoader2, LuSearch } from 'react-icons/lu';

export function Search(props: { value?: string }) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState(props.value);
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const t = useTranslations("AdminUsers");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (value === undefined) {
      return;
    } else if (value) {
      params.set('q', value);
    } else {
      params.delete('q');
    }

    startTransition(() => {
      // All navigations are transitions automatically
      // But wrapping this allow us to observe the pending state
      router.replace(`${pathname}/?${params.toString()}`);
    });
  }, [router, value]);

  return (
    <div className="relative w-full">
      <LuSearch className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
      <Input
        ref={inputRef}
        value={value ?? ''}
        onInput={(e) => {
          setValue(e.currentTarget.value);
        }}
        spellCheck={false}
        className="w-full shadow-none appearance-none pl-8"
        placeholder={t("searchUsers")}
      />
      {isPending && <LuLoader2 className="animate-spin absolute top-2.5 right-2.5" />}
    </div>
  );
}