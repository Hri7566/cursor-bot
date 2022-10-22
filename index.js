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
        bot.cl.setChannel('d');
    }, i * startDelay);
    i++;
}

let happened = false;

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
