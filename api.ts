export const getWeek = async (weekUrl: string) => {
  console.log(weekUrl);
  const res = await fetch(weekUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.headers.get("x-week-number");
};
