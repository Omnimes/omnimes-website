import { FaInfoCircle } from "react-icons/fa"

// BO-1439: jedno wspólne objaśnienie na stronie (wcześniej dwie różne ramki z ciemnoszarym
// tekstem na ciemnoczerwonym tle, słabo czytelne). Biały tekst, zaokrąglone rogi.
export const Callout = ({ title, text }: { title?: string; text: string }) => (
  <div className="flex items-start gap-4 rounded-2xl bg-gradient-to-r from-pink-600 to-purple-700 p-5 text-white shadow-lg">
    <FaInfoCircle className="mt-0.5 shrink-0 text-2xl text-white/90" aria-hidden />
    <div>
      {title && <p className="font-semibold">{title}</p>}
      <p className={`text-base leading-relaxed text-white ${title ? "mt-1" : ""}`}>{text}</p>
    </div>
  </div>
)
