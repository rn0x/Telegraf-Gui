
const fs = require('fs-extra');
const path = require('path');
const Error = require('./Error.js');
const moment = require('moment');

module.exports = async function Broadcast(Path_appDate, bot) {

    try {

        setInterval(async () => {

            if (fs.existsSync(path.join(Path_appDate, '/TelegrafGui/Settings.json')) && fs.existsSync(path.join(Path_appDate, '/TelegrafGui/user.json'))) {

                let json = fs.readJsonSync(path.join(Path_appDate, '/TelegrafGui/user.json'));
                let user = Object.keys(json);
                let time = moment().format('hh:mm A');

                for (let lop2 of user) {

                    let json_msg = fs.readJsonSync(path.join(Path_appDate, '/TelegrafGui/Broadcast.json'));
                    let Broadcast_key = Object.keys(json_msg);
                    let info_admin_supergroup = json[lop2].Type === 'supergroup' ? await bot.telegram.getChatAdministrators(lop2) : undefined;
                    let info_admin_channel = json[lop2].Type === 'channel' ? await bot.telegram.getChatAdministrators(lop2) : undefined;
                    let type_private = json[lop2].Type === 'private';
                    let type_supergroup = json[lop2].Type === 'supergroup' && info_admin_supergroup !== undefined ? info_admin_supergroup.some(fl => fl.user.id === client.botInfo.id && fl.status === 'administrator') : false;
                    let type_channel = json[lop2].Type === 'channel' && info_admin_channel !== undefined ? info_admin_channel.some(fl => fl.user.id === client.botInfo.id && fl.can_post_messages === true) : false;

                    if (type_private || type_supergroup || type_channel) {

                        for (let item of Broadcast_key) {

                            if (json_msg[item].time === time) {

                                await bot.telegram.sendMessage(lop2, json_msg[item].message);

                            }

                        }

                    }

                }

            }

        }, 60000);


    } catch (error) {

        Error(error, Path_appDate);

    }


}