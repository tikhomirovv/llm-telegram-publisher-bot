import Logger from "js-logger"
import { env } from "./env"
import config from "config"
import OpenAI from "openai"

type Parameters = {
  model: string
  temperature?: number
  presence_penalty?: number
}

export enum Role {
  User = "user",
  System = "system",
  Assistant = "assistant",
}

export type Message = {
  content: string
  role: Role
}

class ChatGPT {
  private openai: OpenAI
  private params: Parameters

  constructor(apiKey: string, params: Parameters) {
    this.openai = new OpenAI({ apiKey })
    this.params = params
  }

  async chat(user: string, messages: Message[]) {
    try {
      return await this.openai.chat.completions.create({
        user,
        messages,
        ...this.params,
      })
    } catch (e: any) {
      Logger.error(`[GPT] Error while chat completion`, e)
    }
  }
}

const defaultParams: Parameters = {
  model: "gpt-3.5-turbo",
  temperature: 0.1,
}
const params = config.has("gpt_params") ? config.get("gpt_params") || {} : {}
export const chatgpt = new ChatGPT(env.OPENAI_KEY, {
  ...defaultParams,
  ...params,
} as Parameters)
