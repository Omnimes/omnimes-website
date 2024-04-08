import { DescriptionSecondary } from "./Description";

export const FeatureCard = ({ title, desc, icon }: { title: string; desc: string, icon: React.ReactNode }) => {
  return (
    <article className="flex flex-col md:flex-row pb-6 pt-6">
      <header className="mb-4 mr-4 flex flex-row items-start">
        <div className="mr-3 flex items-center justify-center rounded-full bg-secondary-100/80 p-2 text-pink-500 md:mr-0">
          {icon}
        </div>
        <h6 className="text-md font-bold leading-5 md:hidden">{title}</h6>
      </header>
      <section>
        <h6 className="mb-3 hidden text-md font-bold leading-5 md:block">{title}</h6>
        <DescriptionSecondary text={desc} />
      </section>
    </article>
  )
}
