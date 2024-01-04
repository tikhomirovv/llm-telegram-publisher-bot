import Logger from "js-logger"
import { Environment } from "@/types/env.d"

// Log messages will be written to the window's console.
Logger.useDefaults()
const LoggerLevel =
  process.env.NODE_ENV === Environment.Production ? Logger.WARN : Logger.DEBUG
Logger.info("Logger init", LoggerLevel)
Logger.setLevel(LoggerLevel)

export default Logger
