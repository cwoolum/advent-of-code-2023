import fs from "fs/promises";
import path, { dirname } from "path";

import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

function sumNumbers(input: string) {
  const chars = input.split("");
  let firstNumber: number | undefined = undefined;
  let lastNumber: number | undefined = undefined;

  for (const char of chars) {
    const number = parseInt(char);
    if (isNaN(number)) continue;

    if (firstNumber === undefined) {
      firstNumber = number;
      continue;
    }

    lastNumber = number;
    continue;
  }

  if (!lastNumber) {
    return `${firstNumber}${firstNumber}`;
  }

  return `${firstNumber}${lastNumber}`;
}

const file = await fs.readFile(
  path.join(__dirname, "./calibration.txt"),
  "utf-8"
);

const lines = file.split("\n");
let sum = 0;
for (const line of lines) {
  sum += parseInt(sumNumbers(line));
}
console.log(sum);
