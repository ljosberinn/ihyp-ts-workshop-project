import type { ButtonHTMLAttributes } from "react";

export function Button({
  children,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement>): JSX.Element {
  return (
    <button type="button" {...rest}>
      {children}
    </button>
  );
}
