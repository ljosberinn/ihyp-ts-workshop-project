import { NextComponentType } from "next";
import { NextRouter } from "next/dist/next-server/lib/router/router";
import "../src/styles/core.css";

type AppProps = {
  Component: NextComponentType;
  pageProps: Record<string, unknown>;
  router: NextRouter;
  error?: Error;
};

// eslint-disable-next-line import/no-default-export
export default function App({
  Component,
  pageProps,
}: //   router,
//   error,
AppProps): JSX.Element {
  return <Component {...pageProps} />;
}
