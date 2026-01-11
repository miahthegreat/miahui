import * as React from "react"
import { cn } from "@/lib/utils"

export interface ImageProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string
  alt: string
  width?: number
  height?: number
  fill?: boolean
  priority?: boolean
  quality?: number
  placeholder?: "blur" | "empty"
  blurDataURL?: string
}

// Lazy load Next.js Image component
let NextImage: any = null
let nextImageLoaded = false

const loadNextImage = async (): Promise<boolean> => {
  if (nextImageLoaded) {
    return NextImage !== null
  }
  
  try {
    // Try to dynamically import next/image
    const nextImageModule = await import('next/image')
    NextImage = nextImageModule.default
    nextImageLoaded = true
    return true
  } catch {
    nextImageLoaded = true
    return false
  }
}

const ImageComponent = React.forwardRef<HTMLImageElement, ImageProps>(
  ({ className, src, alt, width, height, fill, priority, quality, placeholder, blurDataURL, ...props }, ref) => {
    const [useNextImage, setUseNextImage] = React.useState(false)

    React.useEffect(() => {
      // Try to load Next.js Image on mount
      loadNextImage().then((available) => {
        if (available && NextImage && (width || height || fill)) {
          setUseNextImage(true)
        }
      })
    }, [width, height, fill])

    // Use Next.js Image if available and dimensions are provided
    if (useNextImage && NextImage && (width || height || fill)) {
      const NextImageComponent = NextImage
      return (
        <NextImageComponent
          src={src}
          alt={alt}
          width={fill ? undefined : width}
          height={fill ? undefined : height}
          fill={fill}
          priority={priority}
          quality={quality}
          placeholder={placeholder}
          blurDataURL={blurDataURL}
          className={cn(className)}
          {...props}
        />
      )
    }

    // Fallback to regular img tag
    return (
      <img
        ref={ref}
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={cn(
          "object-cover",
          className
        )}
        {...props}
      />
    )
  }
)
ImageComponent.displayName = "Image"

export { ImageComponent as Image }

