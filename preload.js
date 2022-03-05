const { ipcRenderer } = require('electron');
const Token = require('./src/token.js');
const Customize = require('./src/Customize.js');
const Customize_Broadcast = require('./src/Customize_Broadcast.js');
const Customize_Reply = require('./src/Customize_Reply.js');
const Customize_Subscribers = require('./src/Customize_Subscribers.js');

window.addEventListener('DOMContentLoaded', async (e) => {

    e.preventDefault();

    Token();
    Customize();
    Customize_Broadcast();
    Customize_Reply();
    Customize_Subscribers();

    document.getElementById('min-button').addEventListener("click", event => {
        ipcRenderer.send('minimize') // شريط العنوان زر الإغلاق والتصغير / تصغير
    });

    document.getElementById('close-button').addEventListener("click", event => {
        ipcRenderer.send('close') // شريط العنوان زر الإغلاق والتصغير / إغلاق
    });


});