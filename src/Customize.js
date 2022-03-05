const { ipcRenderer } = require('electron');
const fs = require('fs-extra');
const path = require('path');

module.exports = async function Customize() {

    let Path_appDate = await ipcRenderer.invoke('Path_appDate');

    if (document.getElementById('html_Start_Message')) {

        document.getElementById('Start_Message_title_Save').style = 'display: none;'

        document.getElementById('Save_Start_Message').addEventListener('click', (e) => {

            e.preventDefault();
            let Start_Message = document.getElementById('Start_Message').value

            if (Start_Message.length <= 200 && Start_Message.length !== 0) {

                let Customize_json = fs.readJSONSync(path.join(Path_appDate, '/TelegrafGui/Customize.json'));
                document.getElementById('Start_Message_title_Save').innerHTML = 'تم حفظ الرسالة'
                document.getElementById('Start_Message_title_Save').style = 'display: bolck;'


                fs.writeJSONSync(
                    path.join(Path_appDate, '/TelegrafGui/Customize.json'),
                    Object.assign({}, Customize_json, { "Start_Message": Start_Message }),
                    { spaces: '\t' }
                );

                setTimeout(() => {
                    document.getElementById('Start_Message_title_Save').style = 'display: none;'
                }, 2000);

            }

            else if (Start_Message.length >= 200) {

                document.getElementById('Start_Message_title_Save').innerHTML = 'يجب ان تكون الرسال اقل من 200 حرف'
                document.getElementById('Start_Message_title_Save').style = 'display: bolck;'

                setTimeout(() => {
                    document.getElementById('Start_Message_title_Save').style = 'display: none;'
                }, 3000);

            }

            else if (Start_Message.length === 0) {

                document.getElementById('Start_Message_title_Save').innerHTML = 'لم تقم بكتابة الرسالة'
                document.getElementById('Start_Message_title_Save').style = 'display: bolck;'

                setTimeout(() => {
                    document.getElementById('Start_Message_title_Save').style = 'display: none;'
                }, 3000);

            }

        });

        document.getElementById('Start_Message_rtl').addEventListener('click', (e) => {

            e.preventDefault();
            document.getElementById('Start_Message').style = 'direction: rtl;'
        });

        document.getElementById('Start_Message_ltr').addEventListener('click', (e) => {

            e.preventDefault();
            document.getElementById('Start_Message').style = 'direction: ltr;'
        });

    }

    else if (document.getElementById('html_Customize')) {

        document.getElementById('Customize_2').addEventListener('click', (e) => {

            ipcRenderer.send('width_and_height_Broadcast');
        });

        document.getElementById('Customize_3').addEventListener('click', (e) => {

            ipcRenderer.send('width_and_height_Subscribers');
        });

        document.getElementById('Customize_4').addEventListener('click', (e) => {

            ipcRenderer.send('width_and_height_Broadcast');
        });

        document.getElementById('Customize_5').addEventListener('click', (e) => {

            ipcRenderer.send('width_and_height_token');

        });

    }


}