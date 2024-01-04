import { Telegraf } from "telegraf"
import logger from "@/logger"

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN!)
bot.start((ctx) => ctx.reply("Welcome!"))

bot.launch()

const signals = ["SIGINT", "SIGTERM", "SIGQUIT"]
signals.forEach((signal: string) =>
  process.on(signal, () => {
    logger.info("[App] Exit", signal)
    bot.stop(signal)
    process.exit()
  })
)
