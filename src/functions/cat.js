import { createReadStream } from "fs";
import { colors } from "../utils.js";

const cat = async (string) => {
  if (!string) {
    console.log(
      colors.error + colors.bold + "Enter one argument" + colors.error
    );
    return;
  }
  try {
    let fileToRead;
    if (string.startsWith("\\") || string.startsWith("/")) {
      const cuttedStr = string.slice(1);
      fileToRead = cuttedStr;
    } else {
      fileToRead = string;
    }
    const stream = createReadStream(fileToRead);
    const chunks = [];
    stream.on("error", (err) => {
      console.error(
        colors.error +
          colors.bold +
          `Read stream error: ${err.message}` +
          colors.user
      );
      return;
    });
    for await (const chunk of stream) {
      chunks.push(Buffer.from(chunk));
    }
    const fileData = Buffer.concat(chunks).toString("utf-8");
    console.log(fileData);
  } catch (err) {
    console.log(
      colors.error +
        colors.bold +
        `Operation failed : ${err.message} ` +
        colors.user
    );
  }
};

export default cat;
