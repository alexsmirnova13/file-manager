import path from "path";
import { colors } from "../utils.js";

const up = () => {
  try {
    const parentDir = path.dirname(process.cwd());
    process.chdir(parentDir);
    console.log(
      colors.user +
        colors.bold +
        `Moved to upper directory: ${process.cwd()}` +
        colors.user
    );
  } catch (error) {
    console.log(
      colors.error +
        colors.bold +
        `Error moving to upper directory: ${error.message}` +
        colors.user
    );
  }
};

export default up;
