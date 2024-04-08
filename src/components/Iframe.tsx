'use client'
export const IFrame = ({src} :{src: string}) => {
  return (
    <iframe src={src}
        data-src="link"
        title="Demo"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        sandbox="allow-forms allow-top-navigation allow-same-origin allow-scripts allow-downloads"
        referrerPolicy="strict-origin-when-cross-origin"
        frameBorder={0}
        loading={"lazy"}
        width={'100%'}
        height={"100%"}
        className='top-0 left-0 right-0 bottom-0 absolute z-[29] mt-[65px] h-[calc(100vh_-_65px)]' /> 
  )
}