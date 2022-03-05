const { ipcRenderer } = require('electron');
const fs = require('fs-extra');
const path = require('path');

module.exports = async function Customize_Subscribers() {

    let Path_appDate = await ipcRenderer.invoke('Path_appDate');

    if (document.getElementById('html_Customize_Subscribers')) {

        if (fs.existsSync(path.join(Path_appDate, '/TelegrafGui/user.json'))) {

            let user_json = fs.readJSONSync(path.join(Path_appDate, '/TelegrafGui/user.json'));
            let user_key = Object.keys(user_json);
            let number_private = document.getElementById('number_private');
            let number_supergroup = document.getElementById('number_supergroup');
            let number_channel = document.getElementById('number_channel');
            let private = [];
            let channel = [];
            let supergroup = [];


            for (let lop of user_key) {
                if (user_json[lop].Type === 'channel') {

                    channel.push(lop)
                } else if (user_json[lop].Type === 'supergroup') {

                    supergroup.push(lop)
                } else if (user_json[lop].Type === 'private') {

                    private.push(lop)
                }
            }

            number_private.innerHTML = private.length
            number_supergroup.innerHTML = supergroup.length
            number_channel.innerHTML = channel.length

            for (let item of user_key) {

                let close = document.getElementsByClassName("delete_Subscribers_close");
                let create_tr = document.createElement("tr");
                let td_id = document.createElement("td");
                let td_user = document.createElement("td");
                let td_name = document.createElement("td");
                let td_Type = document.createElement("td");
                let td_delete = document.createElement("td");
                let id = document.createTextNode(user_json[item].id);
                let user = document.createTextNode(user_json[item].Username);
                let name = document.createTextNode(user_json[item].Name);
                let Type = document.createTextNode(user_json[item].Type);
                let close_delete = document.createTextNode('x');
                let delete_Subscribers_table = document.getElementById('delete_Subscribers_table');

                delete_Subscribers_table.appendChild(create_tr);
                create_tr.appendChild(td_id);
                create_tr.appendChild(td_user);
                create_tr.appendChild(td_name);
                create_tr.appendChild(td_Type);
                create_tr.appendChild(td_delete);
                td_id.appendChild(id);
                td_user.appendChild(user);
                td_name.appendChild(name);
                td_Type.appendChild(Type);
                td_delete.appendChild(close_delete);
                td_delete.id = user_json[item].id;
                td_delete.className = "delete_Subscribers_close";
                td_delete.onclick = (e) => {
                    let id = e.target.id;
                    create_tr.style.display = "none";
                    delete user_json[id]
                    fs.writeJsonSync(path.join(Path_appDate, '/TelegrafGui/user.json'), user_json, { spaces: '\t' })
                }

            }


            document.getElementById('Customize_li_img_back').addEventListener("click", (e) => {
                ipcRenderer.send('width_and_height_Customize_but');
            });


        }


    }


}