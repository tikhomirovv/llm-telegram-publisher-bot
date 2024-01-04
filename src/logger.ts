import Logger from "js-logger"
import { isProduction } from "@/env"

// Log messages will be written to the window's console.
Logger.useDefaults()
const LoggerLevel = isProduction ? Logger.WARN : Logger.DEBUG
Logger.info("Logger init", LoggerLevel)
Logger.setLevel(LoggerLevel)

export default Logger
