export enum Environment {
  Production = "production",
  Development = "development",
}

interface Env {
  TELEGRAM_BOT_TOKEN: string
  OPENAI_KEY: string
  ENV: Environment
}

export const env: Env = {
  TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN!,
  OPENAI_KEY: process.env.OPENAI_KEY!,
  ENV: (process.env.NODE_ENV as Environment) || Environment.Production,
}

export const isProduction = process.env.NODE_ENV !== Environment.Development
