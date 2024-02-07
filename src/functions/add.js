import path from "path";
import { writeFile } from "fs/promises";
import { colors } from "../utils.js";

const add = async (string) => {
  if (!string) {
    console.log(
      colors.error + colors.bold + "Enter one argument" + colors.error
    );
    return;
  }
  try {
    const filePath = path.join(process.cwd(), string);
    await writeFile(filePath, "", { flag: "wx" });
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

export default add;
