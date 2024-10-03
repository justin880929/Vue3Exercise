export function createRegex(...types: string[]) {
  let totalLg = "[^";
  if (types.includes("sEng")) {
    totalLg += "a-z";
  }
  if (types.includes("bEng")) {
    totalLg += "A-Z";
  }
  if (types.includes("num")) {
    totalLg += "0-9";
  }
  if (types.includes("ch")) {
    totalLg += "\u4e00-\u9fa5";
  }
  totalLg += "]"
  return new RegExp(totalLg, "g")
}