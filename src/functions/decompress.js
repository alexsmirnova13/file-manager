import os from "os";
import path from "path";
import { createBrotliDecompress } from "zlib";
import { pipeline } from "stream/promises";
import { createReadStream, createWriteStream } from "fs";
import { colors } from "../utils.js";

const decompress = async (pathFrom, pathTo) => {
  if (!pathFrom || !pathTo) {
    console.log(
      colors.error + colors.bold + "Enter one argument" + colors.user
    );
    return;
  }
  try {
    const source = createReadStream(path.resolve(process.cwd(), pathFrom));
    const destination = createWriteStream(path.resolve(process.cwd(), pathTo));
    await pipeline(source, createBrotliDecompress(), destination);

    console.log(colors.user + colors.bold + "Done!" + colors.user);
  } catch (err) {
    console.log(
      colors.error +
        colors.bold +
        `Operation failed : ${err.message} ` +
        colors.user
    );
  }
};

export default decompress;
