import { extractOrientationNumber } from "@/utils/utils"
import * as exifr from "exifr"

export async function importAll(r: __WebpackModuleApi.RequireContext): Promise<any[]> {
  const images = r.keys().map(r)
  const modules = await Promise.all(images)

  const metaPromises = modules.map(async (module: any) => {
    const metaData = await exifr.parse(module.default.src)
    return {
      src: module.default.src,
      width: module.default.width,
      height: module.default.height,
      title: metaData?.XPTitle || "",
      alt: metaData?.XPTitle || "",
      caption: metaData?.XPSubject || "",
      tags: metaData?.XPKeywords
        ? metaData.XPKeywords.split(";").map((tag: string) => {
            return {
              value: tag,
              title: tag,
            }
          })
        : [],
      date: metaData?.CreateDate,
      orientation: metaData?.Orientation ? extractOrientationNumber(metaData.Orientation) : null,
    }
  })

  return Promise.all(metaPromises)
}
