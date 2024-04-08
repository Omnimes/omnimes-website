import { AbstractBackground } from './decorate/AbstractBackground';
import { Heading } from './atoms/Heading';
import { DescriptionPrimary } from './atoms/Description';
import { useTranslations } from 'next-intl';
import { Form } from './Form';
export const FormContact = () => {
  const t = useTranslations('Contact');
  return (
    <div className="isolate">
      <AbstractBackground />
      <section className="mx-auto max-w-2xl text-center">
        <Heading text={t("title")} />
        <DescriptionPrimary
          text={t("description")}
        />
      </section>
      <Form />
    </div>
  )
}
