const { ipcRenderer } = require('electron');
const fs = require('fs-extra');
const path = require('path');

module.exports = async function Customize_Broadcast() {

    let Path_appDate = await ipcRenderer.invoke('Path_appDate');

    if (document.getElementById('html_Customize_Broadcast')) {

        document.getElementById('Customize_Broadcast_textarea').placeholder = 'قم بكتابة الرسالة المراد جدولتها هنا'
        document.getElementById('Customize_Broadcast_title').innerHTML = 'قم بإدخال الرسالة والوقت'
        document.getElementById('Customize_Broadcast_button_input').innerHTML = 'جدولة'

        if (fs.existsSync(path.join(Path_appDate, '/TelegrafGui/Broadcast.json')) === false) {

            document.getElementById('Customize_Broadcast_title_null').innerHTML = 'لايوجد لديك اية رسائل مجدولة'
            document.getElementById('Customize_Broadcast_null').style = 'display: block;'
            document.getElementById('Customize_Broadcast_true').style = 'display: none;'

            document.getElementById('Customize_Broadcast_button').addEventListener('click', (e) => {

                e.preventDefault();
                fs.writeJSONSync(path.join(Path_appDate, '/TelegrafGui/Broadcast.json'), {}, { spaces: '\t' });
                document.getElementById('Customize_Broadcast_null').style = 'display: none;'
                document.getElementById('Customize_Broadcast_true').style = 'display: block;'
                window.location.reload();

            })

        }

        else if (fs.existsSync(path.join(Path_appDate, '/TelegrafGui/Broadcast.json'))) {

            let Broadcast = fs.readJSONSync(path.join(Path_appDate, '/TelegrafGui/Broadcast.json'));
            let key = Object.keys(Broadcast);

            document.getElementById('Customize_Broadcast_null').style = 'display: none;'
            document.getElementById('Customize_Broadcast_true').style = 'display: block;'
            document.getElementById('Customize_Broadcast_Status').style = 'display: none;'

            if (key[0] === undefined) {

                document.getElementById('Customize_Broadcast_ul_li_div').style = 'display: none;'

            }

            else if (key[0] !== undefined) {

                document.getElementById('Customize_Broadcast_ul_li_div').style = 'display: block;'

            }

            document.getElementById('Broadcast_rtl').addEventListener('click', (e) => {

                e.preventDefault();
                document.getElementById('Customize_Broadcast_textarea').style = 'direction: rtl;'
            });

            document.getElementById('Broadcast_ltr').addEventListener('click', (e) => {

                e.preventDefault();
                document.getElementById('Customize_Broadcast_textarea').style = 'direction: ltr;'
            });


            setInterval(() => {

                let Broadcast = fs.readJSONSync(path.join(Path_appDate, '/TelegrafGui/Broadcast.json'));
                let key = Object.keys(Broadcast);

                if (key[0] === undefined) {

                    document.getElementById('Customize_Broadcast_ul_li_div').style = 'display: none;'

                }

                else if (key[0] !== undefined) {

                    document.getElementById('Customize_Broadcast_ul_li_div').style = 'display: block;'

                }

            }, 1000);


            document.getElementById('Customize_Broadcast_button_input').addEventListener('click', (e) => {

                e.preventDefault();
                let time_value = document.getElementById('Customize_Broadcast_input_time').value;
                let message = document.getElementById('Customize_Broadcast_textarea').value;

                if (message !== '' && time_value !== '') {
                    let hours = time_value.split(":")[0];
                    let minutes = time_value.split(":")[1];
                    let suffix = hours >= 12 ? "PM" : "AM";
                    hours = hours % 12 || 12;
                    hours = hours < 10 ? "0" + hours : hours;
                    let time = hours + ":" + minutes + " " + suffix; //time_value.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true, minute: 'numeric' });
                    let create_li = document.createElement("li");
                    let create_span = document.createElement("span")
                    let delete_ico = document.createTextNode("\u00D7");
                    let Customize_Broadcast_ul = document.getElementById('Customize_Broadcast_ul');
                    let message_40 = document.getElementById('Customize_Broadcast_textarea').value.length <= 40 ? document.getElementById('Customize_Broadcast_textarea').value.substr(0, 40) : document.getElementById('Customize_Broadcast_textarea').value.substr(0, 40) + '  .....'
                    let message_text = document.createTextNode(message_40);
                    let data = {

                        [document.getElementById('Customize_Broadcast_textarea').value]: {

                            message: document.getElementById('Customize_Broadcast_textarea').value,
                            time: time,
                        }
                    }
                    fs.writeJsonSync(path.join(Path_appDate, '/TelegrafGui/Broadcast.json'), Object.assign({}, Broadcast, data), { spaces: '\t' });
                    document.getElementById('Customize_Broadcast_Status').style = 'display: block;'
                    document.getElementById('Customize_Broadcast_Status').innerHTML = 'تم جدولة الرسالة'
                    Customize_Broadcast_ul.appendChild(create_li);
                    create_li.id = message_40;
                    create_li.className = 'Customize_Broadcast_li'
                    create_li.appendChild(message_text);
                    create_span.className = "Customize_Broadcast_li_close";
                    create_span.id = message_40;
                    create_span.appendChild(delete_ico);
                    create_li.appendChild(create_span);

                    setTimeout(() => {
                        document.getElementById('Customize_Broadcast_Status').style = 'display: none;'
                        window.location.reload()
                    }, 2000);

                }

                else if (message === '' || time_value === '') {

                    document.getElementById('Customize_Broadcast_Status').style = 'display: block;'
                    document.getElementById('Customize_Broadcast_Status').innerHTML = 'تأكد من كتابة الرسالة وإدخال الوقت'
                    setTimeout(() => {
                        document.getElementById('Customize_Broadcast_Status').style = 'display: none;'
                    }, 3000);


                }

            });


            for (let item of key) {

                let close = document.getElementsByClassName("Customize_Broadcast_li_close");
                let create_li = document.createElement("li");
                let create_span = document.createElement("span")
                let create_span2 = document.createElement("span")
                let delete_ico = document.createTextNode("\u00D7");
                let time = document.createTextNode(Broadcast[item].time);
                let Customize_Broadcast_ul = document.getElementById('Customize_Broadcast_ul');
                let message_40 = Broadcast[item].message.length <= 40 ? Broadcast[item].message.substr(0, 40) : Broadcast[item].message.substr(0, 40) + '  .....'
                let message = document.createTextNode(message_40);

                Customize_Broadcast_ul.appendChild(create_li);
                create_li.id = Broadcast[item].message;
                create_li.className = 'Customize_Broadcast_li'
                create_li.appendChild(message);
                create_span.className = "Customize_Broadcast_li_close";
                create_span.id = Broadcast[item].message;
                create_span.appendChild(delete_ico);
                create_span2.className = "Customize_Broadcast_li_time";
                create_span2.id = Broadcast[item].message;
                create_span.appendChild(delete_ico);
                create_span2.appendChild(time);
                create_li.appendChild(create_span);
                create_li.appendChild(create_span2);

                for (i = 0; i < close.length; i++) {

                    close[i].onclick = function () {
                        let id = this.parentElement;
                        id.style.display = "none";
                        delete Broadcast[id.id]
                        fs.writeJsonSync(path.join(Path_appDate, '/TelegrafGui/Broadcast.json'), Broadcast, { spaces: '\t' })
                    }
                }

            }


        }

        document.getElementById('Customize_li_img_back').addEventListener("click", (e) => {
            ipcRenderer.send('width_and_height_Customize_but');
        });


    }

}