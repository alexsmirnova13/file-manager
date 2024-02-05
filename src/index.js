// const readline = require("readline");
import readline from "readline";
// const path = require("path");
// import path from "path";
// const os = require('os');
import os from "os";
import path from "path";
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
  //   console.log("-------------");
  //   console.log(path.resolve(process.cwd(), string));

  const newDirectory = path.resolve(process.cwd(), string);
  process.chdir(newDirectory);
  //   console.log(string);
  //   console.log(process.cwd());
  //   console.log("-------------");
  console.log(`Moved to upper directory: ${process.cwd()}`);
};

const startFileManager = () => {
  //   console.log("FileManager is now running. You can enter commands.");

  const homeDirectory = os.homedir();

  try {
    process.chdir(homeDirectory);
    // console.log(`Changed to home directory: ${process.cwd()}`);
    // console.log(`You are currently in ${process.cwd()}`); // добавлять везде
  } catch (error) {
    console.error(`Error changing to home directory: ${error.message}`);
  }
  const userName = process.argv
    .find((arg) => arg.startsWith("--"))
    .split("=")[1]; // ловить ошибки,если нет аргументов
  console.log(`Welcome to the File Manager, ${userName}!`);
  //   console.log(`You entered: ${input}`);
  console.log(`You are currently in ${process.cwd()}`);
  rl.on("line", (input) => {
    // console.log(input, "input");
    // console.log(input.trim().toLowerCase().startsWith("cd"));
    // console.log(input.trim().toLowerCase());
    if (input.trim().toLowerCase() === "exit") {
      console.log("Goodbye!");
      rl.close();
    } else if (input.trim().toLowerCase() === "up") {
      up();
    } else if (input.trim().toLowerCase().startsWith("cd ")) {
      cd(input.trim().split(" ")[1]);
    } else {
      // Добавьте здесь логику обработки других команд
      console.log("Invalid input");
    }
  });

  process.on("exit", () => {
    console.log(`\nThank you for using File Manager, ${userName}, goodbye!\n`);
  });
};

startFileManager();
