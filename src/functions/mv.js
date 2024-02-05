import path from "path";
import {
  promises as fsPromises,
  createReadStream,
  createWriteStream,
} from "fs";
import { colors } from "../utils.js";

const { rm } = fsPromises;

const mv = async (fileDir, fileNewDir) => {
  if (!fileDir || !fileNewDir) {
    console.log(
      colors.error + colors.bold + "Enter two arguments" + colors.user
    );
    return;
  }

  try {
    const fileOldDir = path.resolve(process.cwd(), fileDir);
    const fileNewDirectory = path.resolve(process.cwd(), fileNewDir);

    const streamFrom = createReadStream(fileOldDir);
    const streamTo = createWriteStream(fileNewDirectory);

    // Добавляем обработчики ошибок для потока чтения
    streamFrom.on("error", (err) => {
      console.error(
        colors.error +
          colors.bold +
          `Read stream error: ${err.message}` +
          colors.user
      );
      return;
    });

    streamTo.on("error", (err) => {
      console.error(
        colors.error +
          colors.bold +
          `Write stream error: ${err.message}` +
          colors.user
      );
      return;
    });

    // Ждем завершения потока перед удалением файла
    await new Promise((resolve, reject) => {
      streamFrom.on("end", resolve);
      streamFrom.pipe(streamTo);
    });

    // После успешной передачи данных, удаляем исходный файл
    await rm(fileOldDir);

    console.log(colors.user + colors.bold + "Done!" + colors.user);
  } catch (err) {
    console.log(
      colors.error +
        colors.bold +
        `Operation failed: ${err.message}` +
        colors.error
    );
  }
};

export default mv;
