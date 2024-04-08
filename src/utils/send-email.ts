import { FormData } from "@/components/Form";
export const sendEmail = async (data: FormData, locale: string) => {
    try {
        const res = await fetch(`/api/form`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        const { error, status, message } = await res.json();
        
      if (message) {
          return { message: message, type: "success" }
      }  
      if (status == 500) {
        throw new Error(error);
    }
    if (!message || error || !res.ok) {
        throw new Error(error);
    }
    } catch (err: any) {
        return { message: err, type: "error" }
    }
};