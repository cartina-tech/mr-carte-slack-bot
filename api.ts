export const getWeek = async () => {
  const res = await fetch(`${Deno.env.get("WEEK_REST_API_URL")}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.headers.get("x-week-number");
};
