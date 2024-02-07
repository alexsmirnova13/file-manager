import { readdir } from "fs/promises";
import { colors } from "../utils.js";

const ls = async () => {
  try {
    const listFiles = await readdir(process.cwd(), {
      withFileTypes: true,
    });

    const listTable = listFiles
      .filter((item) => {
        return item.isFile() || item.isDirectory();
      })
      .map((item) => {
        return {
          Name: item.name,
          Type: item.isFile() ? "file" : "directory",
        };
      });

    if (listTable.length) {
      const byTypeAndName = (a, b) => {
        if (a.Type > b.Type) return 1;
        if (a.Type < b.Type) return -1;
        if (a.Name.toLowerCase() > b.Name.toLowerCase()) return 1;
        return -1;
      };
      listTable.sort(byTypeAndName);
      console.table(listTable);
    } else {
      console.log(
        colors.error + colors.bold + "Current directory is empty" + colors.user
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

export default ls;
