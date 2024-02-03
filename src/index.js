// const readline = require("readline");
import readline from "readline";
// const path = require("path");
// import path from "path";
// const os = require('os');
import os from "os";
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

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
    if (input.trim().toLowerCase() === "exit") {
      console.log("Goodbye!");
      rl.close();
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
