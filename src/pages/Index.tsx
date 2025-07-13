import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Icon from "@/components/ui/icon";
import { useState } from "react";

const Index = () => {
  const [showChatDemo, setShowChatDemo] = useState(false);
  const [showImageDemo, setShowImageDemo] = useState(false);

  const startTelegramBot = () => {
    // Открываем ссылку на бота в новой вкладке
    window.open("https://t.me/zommzommbot", "_blank");
  };

  const startChat = () => {
    setShowChatDemo(true);
  };

  const generateImage = () => {
    setShowImageDemo(true);
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-lg flex items-center justify-center">
              <Icon name="Bot" size={20} className="text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">
              AI Assistant Bot
            </span>
          </div>
          <Button
            variant="outline"
            className="hover-scale"
            onClick={startTelegramBot}
          >
            <Icon name="Send" size={16} className="mr-2" />
            Запустить в Telegram
          </Button>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <Badge className="mb-6 bg-blue-100 text-blue-700 hover:bg-blue-200 animate-fade-in">
            🚀 Персональный ИИ-помощник
          </Badge>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
            Твой <span className="gradient-text">умный помощник</span> в
            Telegram
          </h1>

          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto animate-fade-in">
            Современный телеграм-бот с ChatGPT и генерацией изображений.
            Отвечает на любые вопросы и создает картинки по твоему запросу.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-scale-in">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 text-white hover-scale"
              onClick={startChat}
            >
              <Icon name="MessageCircle" size={20} className="mr-2" />
              Начать чат
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="hover-scale"
              onClick={generateImage}
            >
              <Icon name="Image" size={20} className="mr-2" />
              Генерировать изображение
            </Button>
          </div>

          {/* Bot Preview Image */}
          <div className="relative max-w-2xl mx-auto animate-fade-in">
            <img
              src="/img/a2c3fd05-ee62-46a8-8289-00da0c73d304.jpg"
              alt="Telegram Bot Interface"
              className="rounded-2xl shadow-2xl hover-scale"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-500/20 to-transparent rounded-2xl"></div>
          </div>

          {/* Chat Demo Modal */}
          {showChatDemo && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
              <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 animate-scale-in">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold">Демо чата с ИИ</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowChatDemo(false)}
                  >
                    <Icon name="X" size={20} />
                  </Button>
                </div>
                <div className="space-y-4 mb-4">
                  <div className="bg-gray-100 rounded-lg p-3">
                    <p className="text-sm">
                      👤 Привет! Расскажи про искусственный интеллект
                    </p>
                  </div>
                  <div className="bg-blue-500 text-white rounded-lg p-3">
                    <p className="text-sm">
                      🤖 Привет! Искусственный интеллект (ИИ) — это технология,
                      которая позволяет машинам выполнять задачи, требующие
                      человеческого интеллекта: распознавание речи, принятие
                      решений, решение проблем...
                    </p>
                  </div>
                </div>
                <Button
                  className="w-full bg-gradient-to-r from-blue-500 to-emerald-500 text-white"
                  onClick={startTelegramBot}
                >
                  Попробовать в Telegram
                </Button>
              </div>
            </div>
          )}

          {/* Image Demo Modal */}
          {showImageDemo && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
              <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 animate-scale-in">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold">
                    Демо генерации изображений
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowImageDemo(false)}
                  >
                    <Icon name="X" size={20} />
                  </Button>
                </div>
                <div className="space-y-4 mb-4">
                  <div className="bg-gray-100 rounded-lg p-3">
                    <p className="text-sm">
                      👤 Создай картинку: космический корабль в стиле киберпанк
                    </p>
                  </div>
                  <div className="bg-emerald-500 text-white rounded-lg p-3">
                    <p className="text-sm">🎨 Генерирую изображение... ⏳</p>
                  </div>
                  <div className="bg-white border-2 border-emerald-200 rounded-lg p-3">
                    <div className="w-full h-32 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold">
                        🚀 Космический корабль
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Изображение сгенерировано ИИ
                    </p>
                  </div>
                </div>
                <Button
                  className="w-full bg-gradient-to-r from-blue-500 to-emerald-500 text-white"
                  onClick={startTelegramBot}
                >
                  Попробовать в Telegram
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Основные возможности</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Все что нужно для полноценного ИИ-помощника в одном боте
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="hover-scale animate-fade-in">
            <CardHeader>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Icon name="Brain" size={24} className="text-blue-600" />
              </div>
              <CardTitle>ChatGPT Integration</CardTitle>
              <CardDescription>
                Мощный ИИ для ответов на любые вопросы и решения задач
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <Icon
                    name="Check"
                    size={16}
                    className="text-green-500 mr-2"
                  />
                  Умные ответы на вопросы
                </li>
                <li className="flex items-center">
                  <Icon
                    name="Check"
                    size={16}
                    className="text-green-500 mr-2"
                  />
                  Помощь в решении задач
                </li>
                <li className="flex items-center">
                  <Icon
                    name="Check"
                    size={16}
                    className="text-green-500 mr-2"
                  />
                  Обучение и объяснения
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="hover-scale animate-fade-in">
            <CardHeader>
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                <Icon name="ImageIcon" size={24} className="text-emerald-600" />
              </div>
              <CardTitle>Генерация изображений</CardTitle>
              <CardDescription>
                Создание уникальных картинок по текстовому описанию
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <Icon
                    name="Check"
                    size={16}
                    className="text-green-500 mr-2"
                  />
                  Любые стили и темы
                </li>
                <li className="flex items-center">
                  <Icon
                    name="Check"
                    size={16}
                    className="text-green-500 mr-2"
                  />
                  Высокое качество
                </li>
                <li className="flex items-center">
                  <Icon
                    name="Check"
                    size={16}
                    className="text-green-500 mr-2"
                  />
                  Быстрая генерация
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="hover-scale animate-fade-in">
            <CardHeader>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Icon name="Settings" size={24} className="text-purple-600" />
              </div>
              <CardTitle>Персонализация</CardTitle>
              <CardDescription>
                Настройка под твои потребности и предпочтения
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <Icon
                    name="Check"
                    size={16}
                    className="text-green-500 mr-2"
                  />
                  Сохранение контекста
                </li>
                <li className="flex items-center">
                  <Icon
                    name="Check"
                    size={16}
                    className="text-green-500 mr-2"
                  />
                  Настройки стиля
                </li>
                <li className="flex items-center">
                  <Icon
                    name="Check"
                    size={16}
                    className="text-green-500 mr-2"
                  />
                  История запросов
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-4 py-16 bg-white/50 rounded-3xl my-16">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Часто задаваемые вопросы
            </h2>
            <p className="text-gray-600">Все что нужно знать о боте</p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="border rounded-lg px-6">
              <AccordionTrigger className="text-left font-medium">
                Как начать пользоваться ботом?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Просто нажмите кнопку "Запустить в Telegram" выше и следуйте
                инструкциям. Бот сразу готов к работе — никаких сложных
                настроек! Или попробуйте демо прямо здесь.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border rounded-lg px-6">
              <AccordionTrigger className="text-left font-medium">
                Какие типы изображений можно генерировать?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Любые! От реалистичных фотографий до абстрактного искусства.
                Просто опишите что хотите получить, и ИИ создаст уникальное
                изображение.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border rounded-lg px-6">
              <AccordionTrigger className="text-left font-medium">
                Бесплатно ли пользование ботом?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Да! Базовый функционал полностью бесплатный. Для расширенных
                возможностей доступна премиум-подписка.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border rounded-lg px-6">
              <AccordionTrigger className="text-left font-medium">
                Насколько быстро бот отвечает?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Текстовые ответы приходят мгновенно, генерация изображений
                занимает 10-30 секунд. Все зависит от сложности запроса.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Готов попробовать?</h2>
          <p className="text-gray-600 mb-8">
            Запусти бота прямо сейчас и получи своего персонального ИИ-помощника
          </p>

          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 text-white hover-scale text-lg px-8 py-4"
            onClick={startTelegramBot}
          >
            <Icon name="Rocket" size={24} className="mr-2" />
            Запустить бота
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 border-t">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-emerald-500 rounded"></div>
            <span className="font-semibold">AI Assistant Bot</span>
          </div>
          <p className="text-gray-600 text-sm">
            © 2024 AI Assistant Bot. Сделано с ❤️ для удобства пользователей
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
