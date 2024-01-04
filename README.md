# LLM Telegram Publisher Bot

## Описание

LLM Telegram Publisher Bot - бот для автоматической генерации постов с помощью LLM (OpenAI ChatGPT) и автопубликации их в телеграм-канал. Этот бот предоставляет возможность настройки параметров LLM, кастомизации промпта и планирования публикаций с использованием cron-формата.

## Основные функции

- **Генерация контента с помощью LLM:** Используйте мощность OpenAI ChatGPT для создания уникальных и интересных постов.
- **Настройка параметров LLM:** Настройте параметры модели языка для получения желаемого результата.
- **Кастомизация промпта:** Определите свой собственный промпт для направления генерации контента.
- **Расписание публикаций:** Автоматизируйте публикации с помощью cron-расписания и учетом временной зоны.
- **Простота установки и запуска:** Быстрый старт с помощью bun и docker.

## Установка

Перед началом убедитесь, что у вас установлен [bun](https://bun.sh) (v1.0.20 или выше).

1. Клонируйте репозиторий:

```bash
git clone https://github.com/tikhomirovv/llm-telegram-publisher-bot
cd llm-telegram-publisher-bot
```

2. Установите зависимости:

```bash
bun install
```

## Конфигурация

Перед запуском бота, необходимо настроить следующие параметры:

1. Создайте файл `.env` (или скопируйте `.env.example`) и укажите в нем токен вашего бота, идентификатор канала и ключ OpenAI:

```env
TELEGRAM_BOT_TOKEN="paste_bot_token_here"
TELEGRAM_CHAT_ID="@your_channel_id"
OPENAI_KEY="your_openai_key"
```

2. Настройте параметры LLM, промпт и расписание в конфигурационном файле.

Конфигурация лежит в [./config](./config). По-умолчанию загружается [default.json](./config/default.json), можно переопределить конфигурацию добавлением файлика с окружением (`{NODE_ENV_VAR}.json`, `production.json` например) или локальный `local.json` / `local-{NOTE_ENV_VAR}.json`.

 - Подробнее о файлах конфигурации: https://github.com/node-config/node-config/wiki/Configuration-Files#file-load-order
 - Подробнее о формате cron-расписания: https://www.npmjs.com/package/node-cron#cron-syntax
 - Подробнее о настройках для ChatGPT: https://platform.openai.com/docs/api-reference/chat/create

## Запуск

Чтобы запустить бота, используйте следующую команду:

```bash
# development mode
make dev

# or production mode
make start

# or build docker image, create and run container
make build && make run
```

## Поддержка

Если у вас возникли вопросы или предложения, пожалуйста, создайте issue в этом репозитории.

## Лицензия

Открытая лицензия MIT - см. [LICENSE](LICENSE).
