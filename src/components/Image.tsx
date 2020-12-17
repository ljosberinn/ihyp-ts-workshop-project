import type { ImgHTMLAttributes } from "react";

type ImageProps = {
  alt: string;
} & Omit<ImgHTMLAttributes<HTMLImageElement>, "loading">;

export function Image({ alt, ...rest }: ImageProps): JSX.Element {
  return <img {...rest} loading="lazy" alt={alt} />;
}
