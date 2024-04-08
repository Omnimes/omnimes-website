export const DescriptionPrimary = ({ text }: {text: string}) => {
    return (
        <p className="mt-6 mb-10 text-lg leading-8 text-gray-500 dark:text-gray-400">
            {text}
        </p>
    )
}

export const DescriptionSecondary = ({ text }: {text: string}) => {
    return (
        <p className="text-base font-normal text-default-500">{text}</p>
    )
}