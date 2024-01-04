import cron from "node-cron"
import config from "config"
import logger from "@/logger"

const timezone: string = config.get("schedule_timezone")
const options = { sheduled: true, timezone }
let tasks: cron.ScheduledTask[] = []

export function start(schedule: string[], fn: () => void) {
  tasks.push(
    ...schedule.map((expression) => cron.schedule(expression, fn, options))
  )
}

export function stopAll() {
  tasks.forEach((task) => task.stop())
  tasks = []
}
