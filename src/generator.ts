import config from "config"
import logger from "@/logger"
import { chatgpt } from "@/chatgpt"
import { Role, type Message } from "@/chatgpt"

const user: string = config.get("id")
const prompt: string = config.get("prompt")
const message: Message = { role: Role.User, content: prompt }

export async function generate(): Promise<string> {
  const completion = await chatgpt.chat(user, [message])
  if (!completion) {
    throw new Error("[Generator] ChatGPT response error", completion)
  }
  logger.debug("[Generator] completion", completion)
  const usage = completion.usage
  const replyMessage = completion.choices[0].message
  if (!replyMessage || !replyMessage.content) {
    logger.error("[Generator] Empty message", completion)
    throw new Error("[Generator] Empty message")
  }
  logger.debug("[Generator] Tokens used", {
    user,
    usage: usage,
  })
  return replyMessage.content
}
