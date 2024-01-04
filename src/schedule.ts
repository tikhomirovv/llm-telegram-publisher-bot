import cron from "node-cron"
import config from "config"

const schedule: string[] = config.get("schedule")
const timezone: string = config.get("timezone")
const options = { sheduled: true, timezone }
let tasks: cron.ScheduledTask[] = []

export function start(fn: () => void) {
  tasks = schedule.map((expression) => cron.schedule(expression, fn, options))
}

export function stop() {
  tasks.forEach((task) => task.stop())
  tasks = []
}
