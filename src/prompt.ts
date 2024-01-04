import fs from "fs"
import path from "path"
import logger from "@/logger"

const srcPath = path.resolve(__dirname)

enum PromptFile {
  HTML = "html.md",
}

function getPromptFromFile(fileName: PromptFile): string {
  try {
    const filePath = path.join(srcPath, "prompts", fileName)
    const prompt: Buffer = fs.readFileSync(filePath)
    return prompt.toString()
  } catch (error) {
    logger.error("[Prompt] Get prompt from file error", error)
    throw new Error("[Prompt] An error occurred")
  }
}

export function getPromptHTML() {
  return getPromptFromFile(PromptFile.HTML)
}
