import { Children } from "react";

import { className } from "../utils/className";
import type { WithChildren } from "../utils/types";

type SummaryProps = WithChildren<{
  color: "red" | "green";
  category: "Types" | "Weaknesses";
}>;

export function Summary({
  color,
  category,
  children,
}: SummaryProps): JSX.Element {
  const amountOfChildren = Array.isArray(children) ? children.length : 1;

  return (
    <details>
      <summary className={color}>{category}</summary>

      <div className="my-4">
        {Children.map(children, (child, index) => {
          const isNotLast = index !== amountOfChildren - 1;
          const classes = className(
            "p-2 radius-5",
            color === "green" ? "bg-lightgreen" : "bg-lightcoral",
            isNotLast && "mr-2"
          );

          return (
            // eslint-disable-next-line react/no-array-index-key
            <span className={classes} key={index}>
              {child}
            </span>
          );
        })}
      </div>
    </details>
  );
}
