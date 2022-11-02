const { CursorBot } = require('./src/CursorBot');
const WebSocket = require('ws');

globalThis.TOTAL_IDS = 50;

let bots = [];

const startDelay = 0;

for (let i = 1; i <= TOTAL_IDS; i++) {
    bots.push(new CursorBot(i));
}

let i = 0;
for (const bot of bots) {
    setTimeout(() => {
        bot.start();
        bot.cl.setChannel('✧𝓓𝓔𝓥 𝓡𝓸𝓸𝓶✧');
    }, i * startDelay);
    i++;
}

let happened = false;

let currentMode = 0;
let modes = [
    'circle',
    'dvd',
    'sine',
    'circle2',
    'figure8',
    'cosmic'
]

function switchMode() {
    currentMode++;

    if (currentMode >= modes.length) currentMode = 0;
    let mode = modes[currentMode];

    for (const cl of bots) {
        switch (mode) {
            case 'circle':
                cl.cursor.angle2 = 0;
                cl.cursor.velocity.x = 1;
                cl.cursor.velocity.y = 1;
                cl.cursor.angle3 = 0;
                break;
            case 'dvd':
                cl.cursor.velocity.x = (Math.random() * 50) - 25;
                cl.cursor.velocity.y = (Math.random() * 50) - 25;
                break;
            case 'sine':
                cl.cursor.velocity.x = 5;
                cl.cursor.velocity.y = 5;
                break;
            case 'circle2':
                cl.cursor.angle2 = (cl.id / TOTAL_IDS) * 360;
                cl.cursor.velocity.x = 1;
                cl.cursor.velocity.y = 1;
                cl.cursor.angle3 = 0;
                break;
            case 'figure8':
            case 'cosmic':
                cl.cursor.velocity.x = 1;
                cl.cursor.velocity.y = 1;
                break;
        }

        cl.cursor.mode = mode;
    }
}

setInterval(() => {
    if (happened) return;

    let online_count = 0;

    for (const bot of bots) {
        if (!bot.cl.ws) continue;
        if (bot.cl.ws.readyState == WebSocket.OPEN) {
            online_count++;
        }
    }

    if (online_count == TOTAL_IDS) {
        for (const bot of bots) {
            bot.cl.emit('allOnline');
        }
        happened = true;
    }
}, 500);

setInterval(() => {
    switchMode();
}, 5000);
