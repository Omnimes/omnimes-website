import { ImgHTMLAttributes, JSX, useState, type MouseEvent } from "react"

import { CheckButton } from "./CheckButton"
import * as styles from "./styles"
import { getStyle } from "./styles"
import { ImageExtended, ImageProps, StyleFunction } from "./types"

export const Image = <T extends ImageExtended>({
  item,
  thumbnailImageComponent: ThumbnailImageComponent,
  isSelectable = true,
  thumbnailStyle,
  tagStyle,
  tileViewportStyle,
  alt,
  margin,
  index,
  onSelect,
  onClick,
}: ImageProps<T>): JSX.Element => {
  const styleContext = { item }

  const [hover, setHover] = useState(false)

  const thumbnailProps = {
    key: index,
    "data-testid": "grid-gallery-item_thumbnail",
    src: item.src,
    alt: item.alt ? item.alt : "",
    title: typeof item.caption === "string" ? item.caption : null,
    style: getStyle(thumbnailStyle, styles.thumbnail as StyleFunction, styleContext),
  }

  const { key, ...restThumbnailProps } = thumbnailProps

  const handleCheckButtonClick = (event: MouseEvent<HTMLElement>) => {
    if (!isSelectable) {
      return
    }
    onSelect(index, event)
  }

  const handleViewportClick = (event: MouseEvent<HTMLElement>) => {
    onClick(index, event)
  }

  const thumbnailImageProps = {
    item,
    index,
    margin,
    onSelect,
    onClick,
    isSelectable,
    tileViewportStyle,
    thumbnailStyle,
    tagStyle,
    alt,
  }

  return (
    <div
      className="ReactGridGallery_tile"
      data-testid="grid-gallery-item"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={styles.galleryItem({ margin })}
    >
      <div className="ReactGridGallery_tile-icon-bar" style={styles.tileIconBar}>
        <CheckButton
          isSelected={item.isSelected || false}
          isVisible={item.isSelected || (isSelectable && hover)}
          onClick={handleCheckButtonClick}
        />
      </div>

      {!!item.tags && (
        <div className="ReactGridGallery_tile-bottom-bar" style={styles.bottomBar}>
          {item.tags.map((tag, index) => (
            <div key={tag.key || index} title={tag.title} style={styles.tagItemBlock}>
              <span style={getStyle(tagStyle, styles.tagItem, styleContext)}>{tag.value}</span>
            </div>
          ))}
        </div>
      )}

      {!!item.customOverlay && (
        <div className="ReactGridGallery_custom-overlay" style={styles.customOverlay({ hover })}>
          {item.customOverlay}
        </div>
      )}

      <div
        className="ReactGridGallery_tile-overlay"
        style={styles.tileOverlay({
          showOverlay: hover && !item.isSelected && isSelectable,
        })}
      />

      <div
        className="ReactGridGallery_tile-viewport"
        data-testid="grid-gallery-item_viewport"
        style={getStyle(tileViewportStyle, styles.tileViewport as StyleFunction, styleContext)}
        onClick={handleViewportClick}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            const syntheticEvent = new MouseEvent("click") as unknown as MouseEvent<HTMLElement>
            handleViewportClick(syntheticEvent)
          }
        }}
        role="button"
        tabIndex={0}
      >
        {ThumbnailImageComponent ? (
          <ThumbnailImageComponent {...thumbnailImageProps} imageProps={thumbnailProps} />
        ) : (
          /* eslint-disable @next/next/no-img-element */
          <img
            key={key}
            alt={restThumbnailProps.alt || ""}
            {...(restThumbnailProps as Omit<ImgHTMLAttributes<HTMLImageElement>, "key">)}
          />
        )}
      </div>
      {item.thumbnailCaption && (
        <div className="ReactGridGallery_tile-description" style={styles.tileDescription}>
          {item.thumbnailCaption}
        </div>
      )}
    </div>
  )
}
