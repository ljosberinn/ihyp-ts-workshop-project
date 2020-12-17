import type { ReactElement, ReactText } from "react";

export type WithChildren<Props = {}> = {
  children: ReactElement | ReactElement[] | ReactText[] | ReactText;
} & Props;
