export const MainTitle = (title: any) => {
    return (
        <h1
       className="mt-20 animate-fade-up font-display bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center text-3xl font-bold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm [text-wrap:balance] dark:from-white sm:text-4xl md:text-7xl md:leading-[5rem]"
       style={{ animationDelay: '0.15s', animationFillMode: 'forwards' }}
      >
            {title}
      </h1>
    )
}