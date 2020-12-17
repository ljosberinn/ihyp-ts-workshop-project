export const className = (...args: (string | boolean)[]): string =>
  args.filter(Boolean).join(" ");
