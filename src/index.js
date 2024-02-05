import readline from "readline";
import os from "os";
import path from "path";

import { copyFile, mkdir, readdir } from "fs/promises";
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const up = () => {
  const parentDir = path.dirname(process.cwd());
  try {
    process.chdir(parentDir);
    console.log(`Moved to upper directory: ${process.cwd()}`); // нельзя подняться выше хоум директории?
  } catch (error) {
    console.error(`Error moving to upper directory: ${error.message}`);
  }
};

const cd = (string) => {
  const newDirectory = path.resolve(process.cwd(), string);
  process.chdir(newDirectory);
  console.log(`Moved to upper directory: ${process.cwd()}`);
};

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
      console.table(listToView);
    } else {
      console.log("Current directory is empty");
    }
  } catch (err) {
    throw new Error(err.message);
  }
};

const startFileManager = () => {
  const homeDirectory = os.homedir();
  try {
    process.chdir(homeDirectory);
  } catch (error) {
    console.error(`Error changing to home directory: ${error.message}`);
  }
  const userName = process.argv
    .find((arg) => arg.startsWith("--"))
    .split("=")[1]; // ловить ошибки,если нет аргументов
  console.log(`Welcome to the File Manager, ${userName}!`);
  console.log(`You are currently in ${process.cwd()}`);
  rl.on("line", async (input) => {
    if (input.trim().toLowerCase() === "exit") {
      console.log("Goodbye!");
      rl.close();
    } else if (input.trim().toLowerCase() === "up") {
      up();
    } else if (input.trim().toLowerCase().startsWith("cd ")) {
      cd(input.trim().split(" ")[1]);
    } else if (input.trim().toLowerCase() === "ls") {
      await ls();
    } else {
      console.log("Invalid input");
    }
  });

  process.on("exit", () => {
    console.log(`\nThank you for using File Manager, ${userName}, goodbye!\n`);
  });
};

startFileManager();
