import { readdir, rename } from "fs/promises";
import { colors } from "../utils.js";
import path from "path";

const rn = async (name, changedName) => {
  if (!name || !changedName) {
    console.log(
      colors.error + colors.bold + "Enter two arguments" + colors.user
    );
    return;
  }

  try {
    const folderPath = process.cwd();
    const filesNames = await readdir(folderPath);

    if (filesNames.includes(name)) {
      await rename(
        path.join(process.cwd(), name),
        path.join(process.cwd(), changedName)
      );
      console.log(colors.user + colors.bold + "Updated" + colors.user);
    } else {
      console.log(
        colors.error + colors.bold + `There is no such file` + colors.user
      );
    }
  } catch (err) {
    console.log(
      colors.error +
        colors.bold +
        `Operation failed : ${err.message} ` +
        colors.user
    );
  }
};

export default rn;
