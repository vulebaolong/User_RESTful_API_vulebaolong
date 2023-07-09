import { promises as fs } from "fs";
import moment from "moment";
import path from "path";

const filenName = path.join(__dirname, "../logs", "logs.log");
export const logFile = async (msg: any) => {
    const currentTime = moment().format("DD/MM/YYYY HH:mm:ss");
    const currentLog = `${currentTime} --- ${msg}\n`
    try {
        fs.appendFile(filenName, currentLog);
    } catch (error) {
        console.error(error);
    }
};

export const logTer = async (msg: any) => {
    const currentTime = moment().format("DD/MM/YYYY HH:mm:ss");
    console.log(`${currentTime} --- ${msg}`);
};
