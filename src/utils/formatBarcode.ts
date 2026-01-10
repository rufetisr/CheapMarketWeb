// src/utils/barcode.ts

export const normalizeBarcode = (value: string): string => {
  return value.replace(/\D/g, ""); // keep digits only
};

const GROUPS_BY_LENGTH: Record<number, number[]> = {
  3: [3],
  4: [3, 1],
  5: [3, 2],
  6: [3, 3],
  7: [3, 4],
  8: [4, 4],
  9: [3, 4, 2],
  10: [4, 4, 2],
  11: [3, 4, 4],
  12: [4, 4, 4],
  13: [3, 4, 4, 2],
  14: [4, 4, 4, 2],
  15: [3, 4, 4, 4],
  16: [4, 4, 4, 4],
  17: [3, 4, 4, 4, 2],
};

export const formatBarcode = (value: string): string => {
  const digits = normalizeBarcode(value);

  // must be > 2 (your note)
  if (digits.length <= 2) return digits;

  const groups = GROUPS_BY_LENGTH[digits.length];
  if (!groups) {
    // fallback: group by 4 if length not in your table
    return digits.replace(/(\d{4})(?=\d)/g, "$1 ");
  }

  let i = 0;
  const parts: string[] = [];
  for (const size of groups) {
    parts.push(digits.slice(i, i + size));
    i += size;
  }
  return parts.join(" ");
};
