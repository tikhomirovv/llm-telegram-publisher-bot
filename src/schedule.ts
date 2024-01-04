import cron from "node-cron"
import config from "config"
import logger from "@/logger"

const schedule: string[] = config.get("schedule")
const tasks: cron.ScheduledTask[] = schedule.map((expression) =>
  cron.schedule(expression, scheduledFunction, {
    scheduled: false,
    timezone: "Europe/Moscow",
  })
)

// Функция, которую вы хотите запустить по расписанию
function scheduledFunction() {
  logger.debug("Задача выполнена:", new Date())
}

export function start() {
  tasks.forEach((task) => task.start())
}

export function stop() {
  tasks.forEach((task) => task.stop())
}
