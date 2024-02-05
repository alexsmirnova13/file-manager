import readline from "readline";
import os from "os";

import up from "./functions/up.js";
import cd from "./functions/cd.js";
import ls from "./functions/ls.js";
import cat from "./functions/cat.js";
import add from "./functions/add.js";
import rn from "./functions/rn.js";
import cp from "./functions/cp.js";
import mv from "./functions/mv.js";
import osFunc from "./functions/os.js";
import hash from "./functions/hash.js";
import compress from "./functions/compress.js";
import decompress from "./functions/decompress.js";
import { colors } from "./utils.js";
import { rm } from "./functions/rm.js";
// import { colors } from "./utils.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

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
  console.log(
    colors.default +
      colors.bold +
      `Welcome to the File Manager, ${userName}!` +
      colors.user
  );
  console.log(
    colors.system +
      colors.bold +
      `You are currently in ${process.cwd()}` +
      colors.user
  );
  rl.on("line", async (input) => {
    if (input.trim().toLowerCase() === ".exit") {
      rl.close();
    } else if (input.trim().toLowerCase() === "up") {
      up();
      console.log(
        colors.system +
          colors.bold +
          `You are currently in ${process.cwd()}` +
          colors.user
      );
    } else if (input.trim().toLowerCase().split(" ")[0] === "cd") {
      cd(input.trim().split(" ")[1]);
      console.log(
        colors.system +
          colors.bold +
          `You are currently in ${process.cwd()}` +
          colors.user
      );
    } else if (input.trim().toLowerCase() === "ls") {
      await ls();
      console.log(
        colors.system +
          colors.bold +
          `You are currently in ${process.cwd()}` +
          colors.user
      );
    } else if (input.trim().toLowerCase().split(" ")[0] === "cat") {
      await cat(input.trim().split(" ")[1]);
      console.log(
        colors.system +
          colors.bold +
          `You are currently in ${process.cwd()}` +
          colors.user
      );
    } else if (input.trim().toLowerCase().split(" ")[0] === "add") {
      await add(input.trim().split(" ")[1]);
      console.log(
        colors.system +
          colors.bold +
          `You are currently in ${process.cwd()}` +
          colors.user
      );
    } else if (input.trim().toLowerCase().split(" ")[0] === "rn") {
      await rn(input.trim().split(" ")[1], input.trim().split(" ")[2]);
      console.log(
        colors.system +
          colors.bold +
          `You are currently in ${process.cwd()}` +
          colors.user
      );
    } else if (input.trim().toLowerCase().split(" ")[0] === "cp") {
      await cp(input.trim().split(" ")[1], input.trim().split(" ")[2]);
      console.log(
        colors.system +
          colors.bold +
          `You are currently in ${process.cwd()}` +
          colors.user
      );
    } else if (input.trim().toLowerCase().split(" ")[0] === "mv") {
      await mv(input.trim().split(" ")[1], input.trim().split(" ")[2]);
      console.log(
        colors.system +
          colors.bold +
          `You are currently in ${process.cwd()}` +
          colors.user
      );
    } else if (input.trim().toLowerCase().split(" ")[0] === "rm") {
      rm(input.trim().split(" ")[1]);
      console.log(
        colors.system +
          colors.bold +
          `You are currently in ${process.cwd()}` +
          colors.user
      );
    } else if (input.trim().toLowerCase().split(" ")[0] === "os") {
      osFunc(input.trim().split(" ")[1]);
      console.log(
        colors.system +
          colors.bold +
          `You are currently in ${process.cwd()}` +
          colors.user
      );
    } else if (input.trim().toLowerCase().split(" ")[0] === "hash") {
      await hash(input.trim().split(" ")[1]);
      console.log(
        colors.system +
          colors.bold +
          `You are currently in ${process.cwd()}` +
          colors.user
      );
    } else if (input.trim().toLowerCase().split(" ")[0] === "compress") {
      await compress(input.trim().split(" ")[1], input.trim().split(" ")[2]);
      console.log(
        colors.system +
          colors.bold +
          `You are currently in ${process.cwd()}` +
          colors.user
      );
    } else if (input.trim().toLowerCase().split(" ")[0] === "decompress") {
      await decompress(input.trim().split(" ")[1], input.trim().split(" ")[2]);
      console.log(
        colors.system +
          colors.bold +
          `You are currently in ${process.cwd()}` +
          colors.user
      );
    } else {
      console.log(colors.error + colors.bold + "Invalid input" + colors.error);
      console.log(
        colors.system +
          colors.bold +
          `You are currently in ${process.cwd()}` +
          colors.user
      );
    }
  });

  process.on("exit", () => {
    console.log(
      colors.default +
        colors.bold +
        `Thank you for using File Manager, ${userName}, goodbye!` +
        colors.default
    );
  });
};

startFileManager();
