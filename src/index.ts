import config from "config"
import { Telegraf } from "telegraf"
import logger from "@/logger"
import { env } from "@/env"
import { getPromptHTML } from "@/prompt"
import { start as scheduleStart, stopAll as scheduleStop } from "@/schedule"
import { generate as generatePost } from "@/generator"

const bot = new Telegraf(env.TELEGRAM_BOT_TOKEN)
const user: string = config.get("id")

type Channel = {
  chat_id: string
  schedule: string[]
  prompt: string
  html?: boolean
  temperature?: number
}

const channels: Channel[] = config.get("channels")
channels.forEach((channel) => {
  scheduleStart(channel.schedule, async () => {
    let prompt: string = channel.prompt
    let extra = {}
    if (channel.html) {
      prompt += "\n\n" + getPromptHTML()
      extra = { parse_mode: "html" }
    }
    const message = await generatePost(user, prompt, channel.temperature)
    logger.debug("[Index] Prompt:", prompt)
    logger.debug("[Index] Generated post:", message)
    bot.telegram
      .sendMessage(channel.chat_id, message, extra)
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
