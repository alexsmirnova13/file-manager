import os from "os";
import path from "path";
import { createBrotliCompress } from "zlib";
import { pipeline } from "stream/promises";
import { createReadStream, createWriteStream } from "fs";
import { colors } from "../utils.js";

const compress = async (pathFrom, pathTo) => {
  if (!pathFrom || !pathTo) {
    console.log(
      colors.error + colors.bold + "Enter two arguments" + colors.user
    );
    return;
  }
  try {
    const source = createReadStream(path.resolve(process.cwd(), pathFrom));
    const destination = createWriteStream(path.resolve(process.cwd(), pathTo));
    source.on("error", (err) => {
      console.error(
        colors.error +
          colors.bold +
          `Read stream error: ${err.message}` +
          colors.error
      );
      return;
    });

    destination.on("error", (err) => {
      console.error(
        colors.error +
          colors.bold +
          `Write stream error: ${err.message}` +
          colors.user
      );
      return;
    });

    await pipeline(source, createBrotliCompress(), destination);
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
export default compress;
