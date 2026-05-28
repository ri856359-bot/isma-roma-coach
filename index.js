const { Telegraf, Markup } = require('telegraf');

const bot = new Telegraf('8681778942:AAF8EipRSN67Df34umAnz5cpqq9OpNtYx5E');

const notes = {};
const userState = {};

const mainMenu = Markup.inlineKeyboard([
  [Markup.button.callback('⏰ Напоминания', 'reminders')],
  [Markup.button.callback('🔔 Будильник', 'alarm')],
  [Markup.button.callback('📝 Заметки', 'notes')],
  [Markup.button.callback('⚙️ Настройки', 'settings')]
]);

const notesMenu = Markup.inlineKeyboard([
  [Markup.button.callback('📋 Мои заметки', 'my_notes')],
  [Markup.button.callback('➕ Добавить заметку', 'add_note')],
  [Markup.button.callback('🗑 Удалить заметки', 'delete_notes')],
  [Markup.button.callback('⬅️ Назад', 'main_menu')]
]);

bot.start((ctx) => {
  ctx.reply('🚀 Добро пожаловать в Умный Дневник', mainMenu);
});

bot.action('main_menu', (ctx) => {
  ctx.reply('🏠 Главное меню', mainMenu);
});

bot.action('reminders', (ctx) => {
  ctx.reply('⏰ Напоминания пока в разработке');
});

bot.action('alarm', (ctx) => {
  ctx.reply('🔔 Будильник пока в разработке');
});

bot.action('settings', (ctx) => {
  ctx.reply('⚙️ Настройки пока пустые');
});

bot.action('notes', (ctx) => {
  ctx.reply('📝 Меню заметок', notesMenu);
});

bot.action('add_note', (ctx) => {
  const userId = ctx.from.id;

  userState[userId] = 'waiting_note';

  ctx.reply('✍️ Напиши текст заметки');
});

bot.on('text', (ctx) => {
  const userId = ctx.from.id;
  const text = ctx.message.text;

  if (userState[userId] === 'waiting_note') {

    if (!notes[userId]) {
      notes[userId] = [];
    }

    notes[userId].push(text);

    userState[userId] = null;

    ctx.reply('✅ Заметка сохранена', notesMenu);
  }
});

bot.action('my_notes', (ctx) => {
  const userId = ctx.from.id;

  if (!notes[userId] || notes[userId].length === 0) {
    return ctx.reply('📭 Заметок пока нет', notesMenu);
  }

  const message = notes[userId]
    .map((note, index) => `${index + 1}. ${note}`)
    .join('\n');

  ctx.reply(`📋 Твои заметки:\n\n${message}`, notesMenu);
});

bot.action('delete_notes', (ctx) => {
  const userId = ctx.from.id;

  notes[userId] = [];

  ctx.reply('🗑 Все заметки удалены', notesMenu);
});

bot.launch();

console.log('Бот запущен 🚀');
