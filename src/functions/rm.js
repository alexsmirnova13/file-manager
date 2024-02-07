import { rm as removeFile } from "fs/promises";
import path from "path";
import { colors } from "../utils.js";

export const rm = async (string) => {
  try {
    const filePath = path.join(process.cwd(), string);
    await removeFile(filePath);
    console.log(colors.user + colors.bold + "Done!" + colors.user);
  } catch (err) {
    console.log(
      colors.error +
        colors.bold +
        `Operation failed:  ${err.message} ` +
        colors.user
    );
  }
};
