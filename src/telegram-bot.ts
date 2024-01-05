import { Telegraf } from "telegraf"
import type { ExtraReplyMessage } from "node_modules/telegraf/typings/telegram-types"
import { env } from "@/env"
import logger from "@/logger"

export type MessageFormat = "Markdown" | "MarkdownV2" | "HTML"

const bot = new Telegraf(env.TELEGRAM_BOT_TOKEN)

export function sendPost(
  chatId: string,
  message: string,
  format: MessageFormat = "Markdown"
) {
  let extra: ExtraReplyMessage = { parse_mode: format }
  bot.telegram
    .sendMessage(chatId, message, extra)
    .then((result) => logger.debug("Message sent", result))
    .catch((e) => logger.error("Message send error", e))
}
