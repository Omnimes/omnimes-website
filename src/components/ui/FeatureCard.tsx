import { DescriptionSecondary } from "./Description"

export const FeatureCard = ({
  title,
  desc,
  icon,
}: {
  title: string
  desc: string
  icon: React.ReactNode
}) => {
  return (
    <article className="flex flex-col py-6 md:flex-row">
      <header className="mb-4 mr-4 flex flex-row items-start">
        <div className="bg-secondary-100/80 mr-3 flex items-center justify-center rounded-full p-2 text-pink-500 md:mr-0">
          {icon}
        </div>
        <h3 className="text-md font-bold leading-5 md:hidden">{title}</h3>
      </header>
      <section>
        <h3 className="text-md mb-3 hidden font-bold leading-5 md:block">{title}</h3>
        <DescriptionSecondary text={desc} />
      </section>
    </article>
  )
}
