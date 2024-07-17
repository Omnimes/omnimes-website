import { sendResetRequestDeveloper } from "@/actions/become-developer";
import { Button } from "@/components/atoms/Button";
import { CustomLink } from "@/components/Link";

interface Props {
    status: 'belongs' | 'noData' | 'sended',
    data: {
        id: string;
        name: string;
        nip: string;
        phoneNumber: string;
        email: string;
        website: string;
      } | null,
    haveRequest: boolean,
    userId: string,
}

export const ComponentFormBlurInfo = ({status, data, haveRequest, userId}: Props) => {
    
    const reset = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();
        sendResetRequestDeveloper(userId);
    }

    if(haveRequest) {
        return <BlurComponent
                    title={"Twoja prośba została przesłana!"}
                    text={"Już w krótce otrzymasz informację czy zostaniesz developerem OmniMES."}
                >
                    <Button variant={"outline"} onClick={(e) => reset(e)}>
                        Zrezygnuj
                    </Button>
                </BlurComponent>
    }
    if(status == "noData") {
        return <BlurComponent 
                    title={"Uzupełnij dane o firmie"} 
                    text={"Aby zostać developerem musisz uzupełnić dane o firmie."} 
                >
                     <CustomLink 
                        href="/dashboard/settings" 
                        className="h-10 py-1 px-4 inline-flex shadow items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background whitespace-nowrap border border-input hover:bg-accent hover:text-accent-foreground"
                    >
                        Przejdź do ustawień
                    </CustomLink>
                </BlurComponent>
    } else if (status == "sended") {
        return <BlurComponent 
                    title={"Już wkrótce będziesz mógł zostać developerem"} 
                    text={"Twoja prośba o dołączenie do firmy oczekuje na potwierdzenie."} 
                />
    } else if (status == "belongs") {
        return null
    }
    return null
}
 
const BlurComponent = ({title, text, children}: {title: string, text: string, children?: React.ReactNode}) => {
    return (
        <div className="absolute z-10 w-full h-full backdrop-blur-md border flex flex-col justify-center items-center gap-4 p-4">
            <h3 className="text-2xl font-medium">
                {title}
            </h3>
            <p className="pb-4">
                {text}
            </p>
            {children}
        </div>
    )
}