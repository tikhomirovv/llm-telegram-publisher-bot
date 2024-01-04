import { Telegraf } from "telegraf"
import logger from "@/logger"
import config from "config"
import { env } from "@/env"
import { start as scheduleStart, stopAll as scheduleStop } from "@/schedule"
import { generate as generatePost } from "@/generator"

const bot = new Telegraf(env.TELEGRAM_BOT_TOKEN)
const user: string = config.get("id")

type Channel = {
  chat_id: string
  schedule: string[]
  prompt: string
}

const channels: Channel[] = config.get("channels")
channels.forEach((channel) => {
  scheduleStart(channel.schedule, async () => {
    const message = await generatePost(user, channel.prompt)
    bot.telegram
      .sendMessage(channel.chat_id, message)
      .then((result) => logger.debug("Message sent", result))
      .catch((e) => logger.error("Message send error", e))
  })
})

// bot.start((ctx) => ctx.reply("Welcome!"))
// bot.launch()

const signals = ["SIGINT", "SIGTERM", "SIGQUIT"]
signals.forEach((signal: string) =>
  process.on(signal, () => {
    logger.info("[App] Exit", signal)
    scheduleStop()
    // bot.stop(signal)
    process.exit()
  })
)
