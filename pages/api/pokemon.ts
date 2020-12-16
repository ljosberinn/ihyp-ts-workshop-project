import { NextApiRequest, NextApiResponse } from "next";

const ENDPOINT =
  "https://ihyp-ts-workshop-dummy-backend.ljosberinn.vercel.app/api";

// eslint-disable-next-line import/no-default-export
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const param = req.query.id ?? req.query.name ?? "all";

  try {
    if (Array.isArray(param)) {
      throw new TypeError(
        "invalid id or name: only singular queries supported"
      );
    }

    if (param.startsWith("-")) {
      throw new Error("invalid id or name");
    }

    const url = `${ENDPOINT}/${param}`;

    const response = await fetch(url);
    const json = await response.json();

    res.json(json);
  } catch (error) {
    res.json({
      error:
        error instanceof Error
          ? `${error.name}: ${error.message}`
          : "unknown error",
    });
  }
}
