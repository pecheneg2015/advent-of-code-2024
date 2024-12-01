export const getRawLine = async (file: string) => await Deno.readTextFile(file);

export const getRawLines = async (file: string) =>
  (await getRawLine(file)).split(/\r?\n/);
