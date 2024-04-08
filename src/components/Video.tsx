type Props = {
    id: string
}

export default function Video({ id }: Props) {
    return (
            <iframe
                src={`https://www.youtube.com/embed/${id}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                className="flex justify-center align-middle w-full aspect-video my-6"
            />
    );
}