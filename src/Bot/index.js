const { Telegraf, Markup, Extra } = require('telegraf');
const fs = require('fs-extra');
const path = require('path');
const Error = require('./Error.js');
const Broadcast = require('./Broadcast.js');


module.exports = async function TelegrafGui(Path_appDate) {

    try {

        console.log('starrrrrrrrrrrrrrrrrrt');

        let Settings = fs.readJSONSync(path.join(Path_appDate, '/TelegrafGui/Settings.json'));
        let options = { channelMode: true, polling: true }
        let bot = new Telegraf(Settings.token, options)
        bot.start(async (ctx) => {

            if (fs.existsSync(path.join(Path_appDate, '/TelegrafGui/Customize.json'))) {

                let Customize_json = fs.readJSONSync(path.join(Path_appDate, '/TelegrafGui/Customize.json'));

                if (Customize_json.Start_Message !== undefined) {

                    await ctx.reply(Customize_json.Start_Message, { parse_mode: 'Markdown' }).catch((error) => {
                        Error(error, Path_appDate);
                    });

                }

                else if (Customize_json.Start_Message === undefined) {

                    await ctx.reply('قم بتعيين رسالة البداية', { parse_mode: 'Markdown' }).catch((error) => {
                        Error(error, Path_appDate);
                    });

                }

            }

        })

        bot.on("my_chat_member", async (ctx) => {

            if (fs.existsSync(path.join(Path_appDate, '/TelegrafGui/user.json'))) {

                let from = ctx.chat.id;
                let username = ctx.chat.username ? ctx.chat.username : null;
                let name = ctx.chat.first_name ? ctx.chat.first_name : ctx.chat.last_name ? ctx.chat.last_name : ctx.chat.title ? ctx.chat.title : null;
                let type = ctx.chat.type
                let user = fs.readJSONSync(path.join(Path_appDate, '/TelegrafGui/user.json'));
                let info = {

                    [from]: {

                        "id": from,
                        "Username": username,
                        "Name": name,
                        "Type": type
                    }

                }

                if (ctx.update.my_chat_member.new_chat_member.status === 'left' || ctx.update.my_chat_member.new_chat_member.status === 'kicked') {

                    if (Object.keys(user).includes(from.toString())) {

                        delete user[from]
                        fs.writeJsonSync(path.join(Path_appDate, '/TelegrafGui/user.json'), user, { spaces: '\t' })
                    }
                }

                else if (ctx.update.my_chat_member.new_chat_member.status === 'member' || ctx.update.my_chat_member.new_chat_member.status === 'administrator') {

                    if (!Object.keys(user).includes(from.toString())) {

                        fs.writeJsonSync(path.join(Path_appDate, '/TelegrafGui/user.json'), Object.assign({}, user, info), { spaces: '\t' });

                    }

                }
            }

        });

        //   bot.hears('hi', (ctx) => ctx.reply('Hey there'))

        bot.on("message", async (ctx) => {

            //let message_id = ctx.message.message_id;
            let body = ctx.message.text ? ctx.message.text : ctx.message.caption ? ctx.message.caption : ''
            //let from = ctx.chat.id;
            if (fs.existsSync(path.join(Path_appDate, '/TelegrafGui/Reply.json'))) {

                let Reply_json = fs.readJSONSync(path.join(Path_appDate, '/TelegrafGui/Reply.json'));
                let Reply_json_key = Object.keys(Reply_json);

                for (let item of Reply_json_key) {

                    if (body === Reply_json[item].message) {

                        await ctx.reply(Reply_json[item].reply, { parse_mode: 'Markdown' }).catch((error) => Error(error));

                    }

                }

            }

        });

        Broadcast(Path_appDate, bot);

        bot.launch()

        setInterval(() => {

            if (fs.existsSync(path.join(Path_appDate, '/TelegrafGui/Settings.json')) === false) {
                bot.stop()
            }

            else if (fs.existsSync(path.join(Path_appDate, '/TelegrafGui/Settings.json'))) {

                let Settings = fs.readJSONSync(path.join(Path_appDate, '/TelegrafGui/Settings.json'));

                if (Settings.start === true && Settings.off_on === 'off') {
                    bot.stop()

                }
            }

        }, 1000);

        bot.catch(async (error) => {

            Error(error);
            console.log(error.toString());

        });

    } catch (error) {

        Error(error);
        console.log(error.toString());

    }

}