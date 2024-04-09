import { Button, Card, CardFooter, Image, Link } from '@nextui-org/react'

export const CardAuthor = ({
  image,
  name,
  occupation,
  github,
  linkedin,
}: {
  image: string
  name: string
  occupation: string
  github?: string
  linkedin?: string
}) => {
  return (
    <div className="sm:max-w-auto max-w-[300px] text-center text-gray-500 dark:text-gray-400">
      <Card isFooterBlurred className="w-90 col-span-12 h-[300px] sm:col-span-7">
        <Image
          alt="Relaxing app background"
          className="z-0 h-full w-full object-cover"
          src={image}
          removeWrapper
        />
        <CardFooter className="absolute bottom-0 z-1 border-t-1 border-default-600 bg-black/40 dark:border-default-100">
          <div className="flex flex-grow items-center gap-2">
            <div className="flex flex-col text-left">
              <p className="text-tiny text-white">{name}</p>
              <p className="text-tiny font-bold uppercase text-primary-500">{occupation}</p>
            </div>
          </div>
          {github && (
            <Button
              isIconOnly
              role="button"
              as={Link}
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-transparent p-1 text-white"
            >
              <svg
                height="24"
                viewBox="0 0 24 24"
                width="24"
                aria-hidden="true"
                focusable="false"
                tabIndex={-1}
              >
                <path
                  clipRule="evenodd"
                  d="M12.026 2c-5.509 0-9.974 4.465-9.974 9.974 0 4.406 2.857 8.145 6.821 9.465.499.09.679-.217.679-.481 0-.237-.008-.865-.011-1.696-2.775.602-3.361-1.338-3.361-1.338-.452-1.152-1.107-1.459-1.107-1.459-.905-.619.069-.605.069-.605 1.002.07 1.527 1.028 1.527 1.028.89 1.524 2.336 1.084 2.902.829.091-.645.351-1.085.635-1.334-2.214-.251-4.542-1.107-4.542-4.93 0-1.087.389-1.979 1.024-2.675-.101-.253-.446-1.268.099-2.64 0 0 .837-.269 2.742 1.021a9.582 9.582 0 0 1 2.496-.336 9.554 9.554 0 0 1 2.496.336c1.906-1.291 2.742-1.021 2.742-1.021.545 1.372.203 2.387.099 2.64.64.696 1.024 1.587 1.024 2.675 0 3.833-2.33 4.675-4.552 4.922.355.308.675.916.675 1.846 0 1.334-.012 2.41-.012 2.737 0 .267.178.577.687.479C19.146 20.115 22 16.379 22 11.974 22 6.465 17.535 2 12.026 2z"
                  fill="currentColor"
                  fillRule="evenodd"
                ></path>
              </svg>
            </Button>
          )}
          {linkedin && (
            <Button
              isIconOnly
              role="button"
              as={Link}
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-transparent p-1 text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                width="21"
                viewBox="0 0 448 512"
                aria-hidden="true"
                focusable="false"
                fill={'white'}
              >
                <path d="M100.3 448H7.4V148.9h92.9zM53.8 108.1C24.1 108.1 0 83.5 0 53.8a53.8 53.8 0 0 1 107.6 0c0 29.7-24.1 54.3-53.8 54.3zM447.9 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z" />
              </svg>
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
