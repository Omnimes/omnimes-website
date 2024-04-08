import { getLocalePrimaryDialects } from "@/data/locales";

export default function getFormattedDate(dateString: string, locale: string): string {
    const lang = getLocalePrimaryDialects(locale);
    return new Intl.DateTimeFormat(lang, { dateStyle: 'long' }).format(new Date(dateString))
}