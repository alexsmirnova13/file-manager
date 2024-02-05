import path from "path";
import { createReadStream, createWriteStream } from "fs";
import { colors } from "../utils.js";

const cp = async (fileDir, fileNewDir) => {
  if (!fileDir || !fileNewDir) {
    console.log(
      colors.error + colors.bold + "Enter two arguments" + colors.error
    );
    return;
  }

  try {
    const fileOldDir = path.resolve(process.cwd(), fileDir);
    const fileNewDirectory = path.resolve(process.cwd(), fileNewDir);

    // Создаем поток чтения с обработчиком ошибок
    const streamFrom = createReadStream(fileOldDir);
    streamFrom.on("error", (err) => {
      console.error(
        colors.error +
          colors.bold +
          `Read stream error: ${err.message}` +
          colors.user
      );
      return;
    });

    const streamTo = createWriteStream(fileNewDirectory);

    // Добавляем обработчики ошибок для потока записи
    streamTo.on("error", (err) => {
      console.error(
        colors.error +
          colors.bold +
          `Write stream error: ${err.message}` +
          colors.user
      );
      return;
    });

    // Передача данных из потока чтения в поток записи
    streamFrom.pipe(streamTo);

    console.log(colors.user + colors.bold + "Done!" + colors.user);
  } catch (err) {
    console.log(
      colors.error +
        colors.bold +
        `Operation failed: ${err.message}` +
        colors.user
    );
  }
};

export default cp;
