export const DescriptionPrimary = ({ text }: { text: string }) => {
  return <p className="mb-10 mt-6 text-lg leading-8 text-gray-500 dark:text-gray-400">{text}</p>
}

export const DescriptionSecondary = ({ text }: { text: string }) => {
  return <p className="text-default-500 text-base font-normal">{text}</p>
}
