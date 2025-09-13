export type ActionResponse<TBody extends Record<string, unknown>> = {
  status: "success" | "error";
  body: TBody;
};
