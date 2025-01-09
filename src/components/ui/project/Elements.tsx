export const MainTitle = (title: string) => {
  return (
    <h1
      className="animate-fade-up font-display mt-20 bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center text-3xl font-bold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm [text-wrap:balance] sm:text-4xl md:text-7xl md:leading-[5rem] dark:from-white"
      style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
    >
      {title}
    </h1>
  )
}
