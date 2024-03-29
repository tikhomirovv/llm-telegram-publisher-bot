import config from "config"
import logger from "@/logger"
import { getPromptHTML } from "@/prompt"
import { start as scheduleStart, stopAll as scheduleStop } from "@/schedule"
import { generate as generatePost } from "@/generator"
import { sleep } from "bun"
import { sendPost } from "@/telegram-bot"

const user: string = config.get("id")

type Post = {
  chat_id: string
  schedule: string[]
  delay_window_min?: number
  prompt: string
  html?: boolean
  temperature?: number
}

const posts: Post[] = config.get("posts")
posts.forEach((post) => {
  scheduleStart(post.schedule, async () => {
    // time window
    const delay = getDelay(post.delay_window_min)
    await sleep(delay)

    // generate prompt
    let prompt: string = post.prompt
    if (post.html) {
      prompt += "\n\n" + getPromptHTML()
    }
    const message = await generatePost(user, prompt, post.temperature)
    logger.debug("[Index] Prompt:", prompt)
    logger.debug("[Index] Generated post:", message)

    // send
    sendPost(post.chat_id, message, post.html ? "HTML" : "Markdown")
  })
})

// Get random delay from 0 to `delayWindow` value in ms
function getDelay(delayWindowMin?: number): number {
  const maxDelayMilliseconds = +(delayWindowMin || 0) * 60 * 1000
  return Math.floor(Math.random() * maxDelayMilliseconds)
}

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
