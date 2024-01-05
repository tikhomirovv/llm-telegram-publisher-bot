import logger from "@/logger"
import { chatgpt } from "@/chatgpt"
import { Role, type Message } from "@/chatgpt"

export async function generate(
  user: string,
  prompt: string,
  temperature?: number
): Promise<string> {
  const message: Message = { role: Role.User, content: prompt }
  const completion = await chatgpt.chat(user, [message], temperature)
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
