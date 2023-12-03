import fs from "fs/promises";
import path, { dirname } from "path";

import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

function parseNumberString(input: { [key: string]: string }): string {
  const matchedGroups = Object.entries(input ?? {}).filter(
    ([, value]) => value !== undefined
  );

  return matchedGroups[0][0].replace("n", "");
}

function findNumber(input: string): string {
  let returnValue: { value: string; index: number }[] = [];

  const numberRegex =
    /(?=(?<n1>one))|(?=(?<n2>two))|(?=(?<n3>three))|(?=(?<n4>four))|(?=(?<n5>five))|(?=(?<n6>six))|(?=(?<n7>seven))|(?=(?<n8>eight))|(?=(?<n9>nine))/g;

  let matches = numberRegex.exec(input);

  if (matches !== null) {
    returnValue.push({
      value: parseNumberString(matches.groups ?? {}),
      index: matches.index,
    });
  }

  while ((matches = numberRegex.exec(input)) != null) {
    returnValue.push({
      value: parseNumberString(matches.groups ?? {}),
      index: matches.index,
    });

    if (matches.index === numberRegex.lastIndex) {
      numberRegex.lastIndex++;
    }
  }

  input.split("").forEach((char, index) => {
    if (!isNaN(parseInt(char))) {
      returnValue.push({
        value: char,
        index: index,
      });
    }
  });

  returnValue.sort((a, b) => a.index - b.index);

  return `${returnValue[0].value}${returnValue[returnValue.length - 1].value}`;
}

const file = await fs.readFile(
  path.join(__dirname, "./calibration.txt"),
  "utf-8"
);

const lines = file.split("\n");
let sum = 0;
for (let line of lines) {
  line = line.replace("\r", "");
  const numberOutput = findNumber(line);
  console.log(`${line} ${numberOutput}`);
  sum += parseInt(numberOutput);
}
console.log(sum);
