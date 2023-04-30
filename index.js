const { Telegraf, Markup } = require('telegraf');
const { message } = require('telegraf/filters');
require('dotenv').config();
const text = require('./const');

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.start(ctx =>
  ctx.reply(
    `Добро пожаловать ${ctx.message.from.first_name ? ctx.message.from.first_name : 'аноним'}!`
  )
);
bot.help(ctx => ctx.reply(text.commands));

bot.command('create_reminder', async ctx => {
  try {
    await ctx.replyWithHTML(
      '<b>Повтор:</b>',
      Markup.inlineKeyboard([
        [Markup.button.callback('Каждый час', 'btn_eryh')],
        [
          Markup.button.callback('Каждый день', 'btn_eryd'),
          Markup.button.callback('Каждую неделю', 'btn_eryw'),
          Markup.button.callback('Каждый месяц', 'btn_erym'),
        ],
      ])
    );
  } catch (e) {
    console.error(e);
  }
});

addActionBot('btn_eryh', false, 'Выбери время для повтора каждый час');
addActionBot('btn_eryd', false, 'Выбери время для повтора каждый день');
addActionBot('btn_eryw', false, 'Выбери время для повтора каждую неделю');
addActionBot('btn_erym', false, 'Выбери время для повтора каждый месяц');

function addActionBot(name, src, text) {
  bot.action(name, async ctx => {
    try {
      await ctx.answerCbQuery();
      if (src !== false) {
        await ctx.replyWithPhoto({
          source: src,
        });
      }

      await ctx.replyWithHTML(text, {
        disable_web_page_preview: true,
      });
    } catch (e) {
      console.error(e);
    }
  });
}

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

/*{
  message_id: 17,
  from: {
    id: 370792829,
    is_bot: false,
    first_name: 'Curiosity',
    username: 'made_by_curiosity',
    language_code: 'ru'
  },
  chat: {
    id: 370792829,
    first_name: 'Curiosity',
    username: 'made_by_curiosity',
    type: 'private'
  },
  date: 1682860018,
  text: '/start',
  entities: [ { offset: 0, length: 6, type: 'bot_command' } ]
}
*/
