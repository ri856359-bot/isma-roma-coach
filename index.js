const { Telegraf, Markup } = require('telegraf');

const bot = new Telegraf('8681778942:AAF8EipRSN67Df34umAnz5cpqq9OpNtYx5E');

const mainMenu = Markup.inlineKeyboard([
  [Markup.button.callback('⏰ Напоминания', 'reminders')],
  [Markup.button.callback('🔔 Будильник', 'alarm')],
  [Markup.button.callback('📝 Заметки', 'notes')],
  [Markup.button.callback('⚙️ Настройки', 'settings')]
]);

bot.start((ctx) => {
  ctx.reply('Привет! Бот работает 🚀', mainMenu);
});

bot.action('reminders', (ctx) => {
  ctx.reply('⏰ Напоминания пока в разработке.');
});

bot.action('alarm', (ctx) => {
  ctx.reply('🔔 Будильник пока в разработке.');
});

bot.action('notes', (ctx) => {
  ctx.reply('📝 Отправь заметку сообщением.');
});

bot.action('settings', (ctx) => {
  ctx.reply('⚙️ Настройки пока пустые.');
});

bot.launch();

console.log('Бот запущен 🚀');
