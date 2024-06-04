import { ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const sortImagesByDate = (images: ImageGallery[]) => {
  return images.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB.getTime() - dateA.getTime();
  });
};

export const extractOrientationNumber = (orientation: string): number | null => {
  if(orientation == undefined) return null
  const match = orientation.match(/\d+/);
  return match ? parseInt(match[0], 10) : null;
}

export function text({ url, host }: { url: string, host: string }) {
  return `Activate your account ${host}\n${url}\n\n`
}

export function textLogin({ url, host }: { url: string, host: string }) {
  return `Sign-in link for ${host}\n${url}\n\n`
}

export function html(params: { url: string }) {
  const { url } = params

  const brandColor = "#111111"
  const color = {
    background: "#f4f4f4",
    text: "#111111",
    mainBackground: "#ffffff",
    buttonBackground: brandColor,
    buttonBorder: brandColor,
    buttonText: "#f4f4f4",
  }

  return `
<body style="background: ${color.background};padding:40px;">
  <table width="100%" border="0" cellspacing="20" cellpadding="0" style="background: ${color.mainBackground}; max-width: 600px; margin: 0 auto; border-radius: 10px; width:100%; padding:40px;">
    <tr>
      <td align="left" style="padding: 10px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
        <strong>Welcome to OmniMES</strong>,
      </td>
    </tr>
    <tr>
      <td align="left" style="padding: 10px 0px; font-size: 16px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
        Click the link below to activate your account.
      </td>
    </tr>
    <tr>
      <td align="left" style="padding: 20px 0;">
        <table border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td align="center" style="border-radius: 5px;" bgcolor="${color.buttonBackground}">
              <a href="${url}" target="_blank" style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${color.buttonText}; text-decoration: none; border-radius: 5px; padding: 10px 20px; border: 1px solid ${color.text}; display: inline-block; font-weight: bold;">
                Activate Account
              </a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td align="left" style="padding: 10px 0px; font-size: 16px; font-family: Helvetica, Arial, sans-serif; color:${color.text};">
        <small>This link expires in <strong>24 hours</strong> and can only be used once.</small>
      </td>
    </tr>
    <tr>
      <td align="left" style="padding: 0px 0px 10px 0px; font-size: 12px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
        If you did not request this email you can safely ignore it.
      </td>
    </tr>
  </table>
</body>
`
}

export function htmlLogin(params: { url: string }) {
  const { url } = params

  const brandColor = "#111111"
  const color = {
    background: "#f4f4f4",
    text: "#111111",
    mainBackground: "#ffffff",
    buttonBackground: brandColor,
    buttonBorder: brandColor,
    buttonText: "#f4f4f4",
  }

  return `
<body style="background: ${color.background};padding:40px;">
  <table width="100%" border="0" cellspacing="20" cellpadding="0" style="background: ${color.mainBackground}; max-width: 600px; margin: 0 auto; border-radius: 10px; width:100%; padding:40px;">
    <tr>
      <td align="left" style="padding: 10px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
        <strong>Hey 👋,</strong>
      </td>
    </tr>
    <tr>
      <td align="left" style="padding: 10px 0px; font-size: 16px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
        Click the link below to sign in to your account.
      </td>
    </tr>
    <tr>
      <td align="left" style="padding: 20px 0;">
        <table border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td align="center" style="border-radius: 5px;" bgcolor="${color.buttonBackground}">
              <a href="${url}" target="_blank" style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${color.buttonText}; text-decoration: none; border-radius: 5px; padding: 10px 20px; border: 1px solid ${color.text}; display: inline-block; font-weight: bold;">
                Sign in
              </a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td align="left" style="padding: 10px 0px; font-size: 16px; font-family: Helvetica, Arial, sans-serif; color:${color.text};">
        <small>This link expires in <strong>24 hours</strong> and can only be used once.</small>
      </td>
    </tr>
    <tr>
      <td align="left" style="padding: 0px 0px 10px 0px; font-size: 12px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
        If you did not try to log into your account, you can safely ignore it.
      </td>
    </tr>
  </table>
</body>
`
}