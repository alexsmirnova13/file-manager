import path from "path";
import { colors } from "../utils.js";

const cd = (string) => {
  if (!string) {
    console.log(
      colors.error + colors.bold + "Enter one argument" + colors.user
    );
    return;
  }
  try {
    let newDirectory;

    if (string.startsWith("\\") || string.startsWith("/")) {
      const cuttedStr = string.slice(1);
      newDirectory = path.resolve(process.cwd(), cuttedStr);
    } else {
      newDirectory = path.resolve(process.cwd(), string);
    }

    process.chdir(newDirectory);
    console.log(
      colors.user +
        colors.bold +
        `Moved to upper directory: ${process.cwd()}` +
        colors.user
    );
  } catch (err) {
    console.log(colors.error + colors.bold + err.message + colors.user);
  }
};

export default cd;
