import os from "os";
import { colors } from "../utils.js";

const osFunc = (command) => {
  if (!command) {
    console.log(
      colors.error + colors.bold + "Enter one argument" + colors.user
    );
    return;
  }
  switch (command) {
    case "--EOL":
      console.log("End-Of-Line (EOL):", JSON.stringify(os.EOL));
      break;
    case "--cpus":
      const cpus = os.cpus();
      console.log("CPUs Information:");
      cpus.forEach((cpu, index) => {
        console.log(
          `CPU ${index + 1}: Model - ${cpu.model}, Clock rate - ${
            cpu.speed / 1000
          } GHz`
        );
      });
      console.log("Total CPUs:", cpus.length);
      break;
    case "--homedir":
      console.log("Home Directory:", os.homedir());
      break;
    case "--username":
      console.log("Current System User Name:", os.userInfo().username);
      break;
    case "--architecture":
      console.log("CPU Architecture:", os.arch());
      break;
    default:
      console.log(
        colors.error +
          colors.bold +
          "Invalid argument. Please use one of the following: --EOL, --cpus, --homedir, --username, --architecture" +
          colors.user
      );
  }
};

export default osFunc;
