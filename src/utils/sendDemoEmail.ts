import { DemoFormData } from "@/components/FormDemo"

export const sendDemoEmail = async (data: DemoFormData) => {
  try {
    const res = await fetch(`/api/demo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    const { error, status, message } = await res.json()

    if (message) {
      return { message, type: "success" }
    }
    if (status == 500) {
      throw new Error(error)
    }
    if (!message || error || !res.ok) {
      throw new Error(error)
    }
  } catch (err: unknown) {
    return { message: err, type: "error" }
  }
}