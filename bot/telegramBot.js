const TelegramBot = require("node-telegram-bot-api");
const OpenAI = require("openai");
const axios = require("axios");
require("dotenv").config();

// Инициализация бота
const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });

// Инициализация OpenAI (нужно будет добавить ваш API ключ в .env)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Хранение контекста пользователей
const userContexts = new Map();

// Команда /start
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const welcomeMessage = `
🤖 Привет! Я твой персональный ИИ-помощник!

Что я умею:
💬 Отвечать на любые вопросы
🎨 Генерировать изображения по описанию
🧠 Помогать в решении задач
📚 Обучать и объяснять

Основные команды:
/help - показать все команды
/image [описание] - сгенерировать изображение
/clear - очистить контекст диалога

Просто напиши мне свой вопрос или запрос! 🚀
  `;

  const keyboard = {
    reply_markup: {
      inline_keyboard: [
        [
          { text: "💬 Задать вопрос", callback_data: "ask_question" },
          { text: "🎨 Создать изображение", callback_data: "generate_image" },
        ],
        [
          { text: "📋 Помощь", callback_data: "help" },
          { text: "🔄 Очистить диалог", callback_data: "clear_context" },
        ],
      ],
    },
  };

  bot.sendMessage(chatId, welcomeMessage, keyboard);
});

// Команда /help
bot.onText(/\/help/, (msg) => {
  const chatId = msg.chat.id;
  const helpMessage = `
📋 Список команд:

🤖 Основные функции:
• Просто напиши любой вопрос - получишь умный ответ
• /image [описание] - генерация изображения
• /clear - очистить контекст диалога

🎨 Примеры для генерации изображений:
• /image космический корабль в стиле киберпанк
• /image красивый закат над морем
• /image кот в костюме супергероя

💡 Советы:
• Бот запоминает контекст беседы
• Можешь задавать уточняющие вопросы
• Опиши изображение максимально подробно для лучшего результата

Нужна помощь? Просто спроси! 😊
  `;

  bot.sendMessage(chatId, helpMessage);
});

// Команда /clear
bot.onText(/\/clear/, (msg) => {
  const chatId = msg.chat.id;
  userContexts.delete(chatId);
  bot.sendMessage(
    chatId,
    "🔄 Контекст диалога очищен. Начинаем с чистого листа!",
  );
});

// Команда /image
bot.onText(/\/image (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const imagePrompt = match[1];

  if (
    !process.env.OPENAI_API_KEY ||
    process.env.OPENAI_API_KEY === "your_openai_api_key_here"
  ) {
    bot.sendMessage(
      chatId,
      "❌ OpenAI API ключ не настроен. Обратитесь к администратору.",
    );
    return;
  }

  try {
    bot.sendMessage(
      chatId,
      "🎨 Генерирую изображение... Это может занять несколько секунд.",
    );

    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: imagePrompt,
      n: 1,
      size: "1024x1024",
    });

    const imageUrl = response.data[0].url;

    await bot.sendPhoto(chatId, imageUrl, {
      caption: `🎨 Изображение создано по запросу: "${imagePrompt}"`,
      reply_markup: {
        inline_keyboard: [
          [{ text: "🔄 Создать ещё", callback_data: "generate_another" }],
        ],
      },
    });
  } catch (error) {
    console.error("Ошибка генерации изображения:", error);
    bot.sendMessage(
      chatId,
      "❌ Произошла ошибка при генерации изображения. Попробуйте ещё раз или измените описание.",
    );
  }
});

// Обработка обычных сообщений (ChatGPT)
bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const messageText = msg.text;

  // Игнорируем команды
  if (messageText.startsWith("/")) {
    return;
  }

  if (
    !process.env.OPENAI_API_KEY ||
    process.env.OPENAI_API_KEY === "your_openai_api_key_here"
  ) {
    bot.sendMessage(
      chatId,
      "❌ OpenAI API ключ не настроен. Обратитесь к администратору.",
    );
    return;
  }

  try {
    // Показываем индикатор печати
    bot.sendChatAction(chatId, "typing");

    // Получаем или создаем контекст пользователя
    let userContext = userContexts.get(chatId) || [];

    // Добавляем новое сообщение пользователя
    userContext.push({ role: "user", content: messageText });

    // Ограничиваем контекст (последние 10 сообщений)
    if (userContext.length > 20) {
      userContext = userContext.slice(-20);
    }

    // Системное сообщение
    const systemMessage = {
      role: "system",
      content:
        "Ты дружелюбный и умный ИИ-помощник. Отвечай на русском языке, будь полезным и понятным. Если нужно, используй эмодзи для лучшего восприятия.",
    };

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [systemMessage, ...userContext],
      max_tokens: 1000,
      temperature: 0.7,
    });

    const response = completion.choices[0].message.content;

    // Добавляем ответ ассистента в контекст
    userContext.push({ role: "assistant", content: response });
    userContexts.set(chatId, userContext);

    // Отправляем ответ
    await bot.sendMessage(chatId, response, {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "🎨 Создать изображение", callback_data: "generate_image" },
            { text: "❓ Ещё вопрос", callback_data: "ask_question" },
          ],
        ],
      },
    });
  } catch (error) {
    console.error("Ошибка ChatGPT:", error);
    bot.sendMessage(
      chatId,
      "❌ Произошла ошибка. Попробуйте ещё раз через несколько секунд.",
    );
  }
});

// Обработка callback кнопок
bot.on("callback_query", async (callbackQuery) => {
  const chatId = callbackQuery.message.chat.id;
  const data = callbackQuery.data;

  // Отвечаем на callback_query
  await bot.answerCallbackQuery(callbackQuery.id);

  switch (data) {
    case "ask_question":
      bot.sendMessage(
        chatId,
        "💬 Отлично! Задайте свой вопрос, и я постараюсь помочь вам.",
      );
      break;

    case "generate_image":
      bot.sendMessage(
        chatId,
        '🎨 Опишите изображение, которое хотите создать.\n\nНапример: "космический корабль в стиле киберпанк" или просто используйте команду:\n/image [ваше описание]',
      );
      break;

    case "help":
      bot.sendMessage(
        chatId,
        `
📋 Как пользоваться ботом:

💬 Для обычного чата:
Просто напишите любой вопрос или сообщение

🎨 Для создания изображений:
Используйте команду /image [описание]
Например: /image красивый закат над океаном

🔄 Дополнительные команды:
/clear - очистить историю диалога
/help - показать это сообщение

Бот запоминает контекст беседы, поэтому можете задавать уточняющие вопросы! 😊
      `,
      );
      break;

    case "clear_context":
      userContexts.delete(chatId);
      bot.sendMessage(chatId, "🔄 История диалога очищена!");
      break;

    case "generate_another":
      bot.sendMessage(chatId, "🎨 Опишите новое изображение для генерации:");
      break;
  }
});

// Обработка ошибок
bot.on("error", (error) => {
  console.error("Ошибка бота:", error);
});

bot.on("polling_error", (error) => {
  console.error("Ошибка polling:", error);
});

console.log("🤖 Телеграм-бот запущен!");
console.log("📝 Для работы ChatGPT добавьте OPENAI_API_KEY в файл .env");

module.exports = bot;
