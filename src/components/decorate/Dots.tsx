export const Dots = () => {
  return (
    <span className="relative inline-block">
      <svg
        viewBox="0 0 52 24"
        fill="currentColor"
        className="text-blue-gray-100 absolute left-0 top-0 z-0 -ml-20 -mt-8 w-32 text-primary-500 sm:block lg:-ml-28 lg:-mt-10 lg:w-32"
      >
        <defs>
          <pattern id="07690130-d013-42bc-83f4-90de7ac68f76" x="0" y="0" width=".135" height=".30">
            <circle cx="1" cy="1" r=".7" />
          </pattern>
        </defs>
        <rect fill="url(#07690130-d013-42bc-83f4-90de7ac68f76)" width="52" height="24" />
      </svg>
    </span>
  )
}
