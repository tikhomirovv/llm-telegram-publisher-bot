import { Telegraf } from "telegraf"
import logger from "@/logger"
import { env } from "@/env"
import { start as scheduleStart, stop as scheduleStop } from "@/schedule"
import { generate as generatePost } from "@/generator"

const bot = new Telegraf(env.TELEGRAM_BOT_TOKEN)
const channelId = env.TELEGRAM_CHAT_ID

async function generateAndPost() {
  const message = await generatePost()
  bot.telegram
    .sendMessage(channelId, message)
    .then((result) => logger.debug("Message sent", result))
    .catch((e) => logger.error("Message send error", e))
}

scheduleStart(generateAndPost)

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
