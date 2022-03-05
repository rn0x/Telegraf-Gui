const { ipcRenderer } = require('electron');
const fs = require('fs-extra');
const path = require('path');

module.exports = async function Token() {

    let Path_appDate = await ipcRenderer.invoke('Path_appDate');

    if (document.getElementById('html_token')) {

        if (fs.existsSync(path.join(Path_appDate, '/TelegrafGui/Settings.json'))) {


            document.getElementById('input_token').style = 'display: none;'
            document.getElementById('Status_class').style = 'display: flex;'
            document.getElementById('off_on').style = 'display: bolck;'
            document.getElementById('Customize').style = 'display: bolck;'
            document.getElementById('on').innerText = 'تشغيل'
            document.getElementById('off').innerText = 'إيقاف'
            document.getElementById('Status').innerHTML = 'الحالة: '
            document.getElementById('Customize_a').innerText = 'تخصيص'

        }

        else if (fs.existsSync(path.join(Path_appDate, '/TelegrafGui/Settings.json')) === false) {

            document.getElementById('off_on').style = 'display: none;'
            document.getElementById('Customize').style = 'display: none;'
            document.getElementById('Enter_Token').innerHTML = 'ضع التوكن هنا'
            document.getElementById('submit_input_token').defaultValue = 'أدخل'
            document.getElementById('Status_class').style = 'display: none;'
            document.getElementById('token').placeholder = 'Please put your token here'
            document.getElementById('token').dir = 'ltr'

        }

        setInterval(async () => {


            if (fs.existsSync(path.join(Path_appDate, '/TelegrafGui/Settings.json'))) {

                let Settings = fs.readJSONSync(path.join(Path_appDate, '/TelegrafGui/Settings.json'));
                document.getElementById('start').innerHTML = Settings.off_on === 'on' ? 'متصل' : 'غير متصل'
                document.getElementById('start').style = Settings.off_on === 'on' ? 'color: #06be00;' : 'color: #ff0000;'
                document.getElementById('Status_class').style = 'display: flex;'
                document.getElementById('input_token').style = 'display: none;'
                document.getElementById('off_on').style = 'display: bolck;'
                document.getElementById('Customize').style = 'display: bolck;'
                document.getElementById('on').innerText = 'تشغيل'
                document.getElementById('off').innerText = 'إيقاف'
                document.getElementById('Status').innerHTML = 'الحالة: '
                document.getElementById('Customize_a').innerText = 'تخصيص'


            }

            else if (fs.existsSync(path.join(Path_appDate, '/TelegrafGui/Settings.json')) === false) {

                document.getElementById('input_token').style = 'display: block;'
                document.getElementById('token').placeholder = 'Please put your token here'
                document.getElementById('token').dir = 'ltr'
                document.getElementById('Status_class').style = 'display: none;'
                document.getElementById('off_on').style = 'display: none;'
                document.getElementById('Customize').style = 'display: none;'
                document.getElementById('Enter_Token').innerHTML = 'ضع التوكن هنا'

            }


        }, 1000);

        document.getElementById('submit_input_token').addEventListener("click", (e) => {

            e.preventDefault();

            let token_value = document.getElementById('token').value

            if (token_value !== '') {

                if (fs.existsSync(path.join(Path_appDate, '/TelegrafGui')) === false) {

                    fs.mkdirSync(path.join(Path_appDate, '/TelegrafGui'), { recursive: true });

                }

                else if (fs.existsSync(path.join(Path_appDate, '/TelegrafGui/Settings.json')) === false) {

                    let data = {
                        token: token_value,
                        start: false,
                        off_on: 'on'
                    }
                    fs.writeJSONSync(path.join(Path_appDate, '/TelegrafGui/Settings.json'), data, { spaces: '\t' });
                    fs.writeJSONSync(path.join(Path_appDate, '/TelegrafGui/Customize.json'), {}, { spaces: '\t' });
                    fs.writeJSONSync(path.join(Path_appDate, '/TelegrafGui/user.json'), {}, { spaces: '\t' });

                }

            }

            else {
                document.getElementById('input_err').innerHTML = 'تأكد من كتابة التوكن بشكل صحيح !!'
                document.getElementById('input_err').style = 'display: bolck;'
            }

        });

        document.getElementById('on').addEventListener("click", (e) => {

            if (fs.existsSync(path.join(Path_appDate, '/TelegrafGui/Settings.json'))) {

                let Settings = fs.readJSONSync(path.join(Path_appDate, '/TelegrafGui/Settings.json'));

                if (Settings.start === true && Settings.off_on === "off" || Settings.start === false && Settings.off_on === "off") {

                    let data = Object.assign({}, Settings, { start: false, off_on: "on" })
                    fs.writeJSONSync(path.join(Path_appDate, '/TelegrafGui/Settings.json'), data, { spaces: '\t' });
                }

            }

        });

        document.getElementById('off').addEventListener("click", (e) => {

            if (fs.existsSync(path.join(Path_appDate, '/TelegrafGui/Settings.json'))) {

                let Settings = fs.readJSONSync(path.join(Path_appDate, '/TelegrafGui/Settings.json'));

                if (Settings.start === true && Settings.off_on === "on" || Settings.start === false && Settings.off_on === "on") {

                    let data = Object.assign({}, Settings, { start: true, off_on: "off" })
                    fs.writeJSONSync(path.join(Path_appDate, '/TelegrafGui/Settings.json'), data, { spaces: '\t' });
                }

            }

        });

        document.getElementById('Customize_a').addEventListener("click", (e) => {
            ipcRenderer.send('width_and_height_Customize_but');
        });
    }

}