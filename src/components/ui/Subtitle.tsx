export const Subtitle = ({ text }: { text: string }) => {
  return (
    <small className="relative inline-flex">
      <span className="font-caveat text-primary-500 mb-1 text-lg font-medium sm:mb-0">{text}</span>
      <svg
        className="fill-primary-500 absolute bottom-0"
        xmlns="http://www.w3.org/2000/svg"
        width="132"
        height="4"
      >
        <path
          fillOpacity=".4"
          fillRule="evenodd"
          d="M131.014 2.344s-39.52 1.318-64.973 1.593c-25.456.24-65.013-.282-65.013-.282C-.34 3.623-.332 1.732.987 1.656c0 0 39.52-1.32 64.973-1.593 25.455-.24 65.012.282 65.012.282 1.356.184 1.37 1.86.042 1.999"
        />
      </svg>
    </small>
  )
}

export const SubtitleNormal = ({ text }: { text: string }) => {
  return <small className="text-primary-500 text-base font-semibold leading-7">{text}</small>
}
