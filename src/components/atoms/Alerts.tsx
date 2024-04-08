export const DangerAlert = ({ title, text }: { title: string;  text: string}) => {
  return (
    <div
      className="mb-6 mt-6 rounded-lg bg-danger-50 p-4 text-sm text-danger flex flex-col"
      role="alert"
    >
          <h6 className="font-medium">{title}</h6>
          <p>{text}</p>
    </div>
  )
}

export const SuccessAlert = ({ title, text }: { title: string;  text: string}) => {
  return (
    <div
      className="mb-6 mt-6 rounded-lg bg-success-50 p-4 text-sm text-success flex flex-col"
      role="alert"
    >
          <h6 className="font-medium">{title}</h6>
          <p>{text}</p>
    </div>
  )
}
