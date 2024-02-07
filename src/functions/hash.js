import { createHash } from "crypto";
import { readFile } from "fs/promises";
import { colors } from "../utils.js";

const hash = async (path) => {
  if (!path) {
    console.log(
      colors.error + colors.bold + "Enter one argument" + colors.user
    );
    return;
  }
  try {
    const data = await readFile(path);
    const hash = createHash("sha256").update(data);
    const hex = hash.digest("hex");
    console.log(colors.user + colors.bold + hex + colors.user);
  } catch (err) {
    console.log(
      colors.error +
        colors.bold +
        `Operation failed : ${err.message} ` +
        colors.user
    );
  }
};

export default hash;
