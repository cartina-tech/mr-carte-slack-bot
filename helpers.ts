export const randomizeStringArr = (data: string[]) =>
  data[Math.floor(Math.random() * data.length)];

export const extractWords = (text: string): string[] => {
  const t = text.replace(/[^A-Za-z0-9åäöÅÄÖ]+/g, " ");
  return t.trim().split(" ");
};
