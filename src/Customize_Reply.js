const { ipcRenderer } = require('electron');
const fs = require('fs-extra');
const path = require('path');

module.exports = async function Customize_Reply() {

    let Path_appDate = await ipcRenderer.invoke('Path_appDate');

    if (document.getElementById('html_Customize_Reply')) {

        document.getElementById('Customize_Reply_textarea').placeholder = 'قم بكتابة الرسالة هنا'
        document.getElementById('Customize_Reply_textarea_2').placeholder = 'قم بكتابة الرد هنا'
        document.getElementById('Customize_Reply_title').innerHTML = 'قم بإدخال الرسالة والرد'
        document.getElementById('Customize_Reply_button_input').innerHTML = 'إنشاء'

        if (fs.existsSync(path.join(Path_appDate, '/TelegrafGui/Reply.json')) === false) {

            document.getElementById('Customize_Reply_title_null').innerHTML = 'لايوجد لديك اية ردود تلقائية'
            document.getElementById('Customize_Reply_null').style = 'display: block;'
            document.getElementById('Customize_Reply_true').style = 'display: none;'

            document.getElementById('Customize_Reply_button').addEventListener('click', (e) => {

                e.preventDefault();
                fs.writeJSONSync(path.join(Path_appDate, '/TelegrafGui/Reply.json'), {}, { spaces: '\t' });
                document.getElementById('Customize_Reply_null').style = 'display: none;'
                document.getElementById('Customize_Reply_true').style = 'display: block;'
                window.location.reload();

            })

        }

        else if (fs.existsSync(path.join(Path_appDate, '/TelegrafGui/Reply.json'))) {

            let Reply = fs.readJSONSync(path.join(Path_appDate, '/TelegrafGui/Reply.json'));
            let key = Object.keys(Reply);

            document.getElementById('Customize_Reply_null').style = 'display: none;'
            document.getElementById('Customize_Reply_true').style = 'display: block;'
            document.getElementById('Customize_Reply_Status').style = 'display: none;'

            if (key[0] === undefined) {

                document.getElementById('Customize_Reply_ul_li_div').style = 'display: none;'

            }

            else if (key[0] !== undefined) {

                document.getElementById('Customize_Reply_ul_li_div').style = 'display: block;'

            }

            document.getElementById('Reply_rtl').addEventListener('click', (e) => {

                e.preventDefault();
                document.getElementById('Customize_Reply_input').style = 'direction: rtl;'
            });

            document.getElementById('Reply_ltr').addEventListener('click', (e) => {

                e.preventDefault();
                document.getElementById('Customize_Reply_input').style = 'direction: ltr;'
            });

            setInterval(() => {

                let Reply = fs.readJSONSync(path.join(Path_appDate, '/TelegrafGui/Reply.json'));
                let key = Object.keys(Reply);

                if (key[0] === undefined) {

                    document.getElementById('Customize_Reply_ul_li_div').style = 'display: none;'

                }

                else if (key[0] !== undefined) {

                    document.getElementById('Customize_Reply_ul_li_div').style = 'display: block;'

                }

            }, 1000);


            document.getElementById('Customize_Reply_button_input').addEventListener('click', (e) => {

                e.preventDefault();
                let Reply_message = document.getElementById('Customize_Reply_textarea_2').value;
                let message = document.getElementById('Customize_Reply_textarea').value;

                if (message !== '' && Reply_message !== '') {

                    let create_li = document.createElement("li");
                    let create_span = document.createElement("span")
                    let delete_ico = document.createTextNode("\u00D7");
                    let Customize_Reply_ul = document.getElementById('Customize_Reply_ul');
                    let message_40 = document.getElementById('Customize_Reply_textarea').value.length <= 40 ? document.getElementById('Customize_Reply_textarea').value.substr(0, 40) : document.getElementById('Customize_Reply_textarea').value.substr(0, 40) + '  .....'
                    let message_text = document.createTextNode(message_40);
                    let data = {

                        [document.getElementById('Customize_Reply_textarea').value]: {

                            message: document.getElementById('Customize_Reply_textarea').value,
                            reply: Reply_message,
                        }
                    }
                    fs.writeJsonSync(path.join(Path_appDate, '/TelegrafGui/Reply.json'), Object.assign({}, Reply, data), { spaces: '\t' });
                    document.getElementById('Customize_Reply_Status').style = 'display: block;'
                    document.getElementById('Customize_Reply_Status').innerHTML = 'تم إنشاء الرد'
                    Customize_Reply_ul.appendChild(create_li);
                    create_li.id = message_40;
                    create_li.className = 'Customize_Reply_li'
                    create_li.appendChild(message_text);
                    create_span.className = "Customize_Reply_li_close";
                    create_span.id = message_40;
                    create_span.appendChild(delete_ico);
                    create_li.appendChild(create_span);

                    setTimeout(() => {
                        document.getElementById('Customize_Reply_Status').style = 'display: none;'
                        window.location.reload()
                    }, 2000);

                }

                else if (message === '' || Reply_message === '') {

                    document.getElementById('Customize_Reply_Status').style = 'display: block;'
                    document.getElementById('Customize_Reply_Status').innerHTML = 'تأكد من كتابة الرسالة والرد'
                    setTimeout(() => {
                        document.getElementById('Customize_Reply_Status').style = 'display: none;'
                    }, 3000);


                }

            });


            for (let item of key) {

                let close = document.getElementsByClassName("Customize_Reply_li_close");
                let create_li = document.createElement("li");
                let create_span = document.createElement("span")
                let delete_ico = document.createTextNode("\u00D7");
                let Customize_Reply_ul = document.getElementById('Customize_Reply_ul');
                let message_40 = Reply[item].message.length <= 40 ? Reply[item].message.substr(0, 40) : Reply[item].message.substr(0, 40) + '  .....'
                let message = document.createTextNode(message_40);

                Customize_Reply_ul.appendChild(create_li);
                create_li.id = Reply[item].message;
                create_li.className = 'Customize_Reply_li'
                create_li.appendChild(message);
                create_span.className = "Customize_Reply_li_close";
                create_span.id = Reply[item].message;
                create_span.appendChild(delete_ico);
                create_span.appendChild(delete_ico);
                create_li.appendChild(create_span);

                for (i = 0; i < close.length; i++) {

                    close[i].onclick = function () {
                        let id = this.parentElement;
                        id.style.display = "none";
                        delete Reply[id.id]
                        fs.writeJsonSync(path.join(Path_appDate, '/TelegrafGui/Reply.json'), Reply, { spaces: '\t' })
                    }
                }


            }


        }

        document.getElementById('Customize_li_img_back').addEventListener("click", (e) => {
            ipcRenderer.send('width_and_height_Customize_but');
        });


    }

}