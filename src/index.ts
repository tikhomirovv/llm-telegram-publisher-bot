import { Telegraf } from "telegraf"
import logger from "@/logger"
import { env } from "@/env"

const bot = new Telegraf(env.TELEGRAM_BOT_TOKEN)
bot.start((ctx) => ctx.reply("Welcome!"))

const channelId = env.TELEGRAM_CHAT_ID
const message = "Привет, это сообщение из бота 2!"

bot.telegram
  .sendMessage(channelId, message)
  .then((result) => {
    // Сообщение успешно отправлено
    logger.debug("Message sent", result)
  })
  .catch((error) => {
    // Произошла ошибка при отправке сообщения
    logger.error("Message send error", error)
  })
