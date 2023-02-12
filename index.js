const { CursorBot } = require('./src/CursorBot');
const WebSocket = require('ws');

globalThis.TOTAL_IDS = 88;
// globalThis.TOTAL_IDS = 300;

let bots = [];

const startDelay = 0;
const modeDelay = 10000;

for (let i = 1; i <= TOTAL_IDS; i++) {
    bots.push(new CursorBot(i));
}

let i = 0;
for (const bot of bots) {
    setTimeout(() => {
        bot.start();
        // bot.cl.setChannel('✧𝓓𝓔𝓥 𝓡𝓸𝓸𝓶✧');
        // bot.cl.setChannel('uwu');
        bot.cl.setChannel('test/awkward');
    }, i * startDelay);
    i++;
}

let happened = false;

let currentMode = -1;
let modes = [
    ['circle',      10000],
    ['circle2',     10000],
    ['dvd',         5000],
    ['sine',        5000],
    ['fullsine',    5000],
    ['figure8',     15000],
    ['cosmic',      15000],
    ['heart',       15000],
    ['line',        10000],
    ['line2',       10000],
    ['circle3',     10000],
    ['circle4',     10000],
    ['dvd',         20000],
]

let modeSwitch = true;

function switchMode() {
    if (!modeSwitch) return;
    currentMode++;

    if (currentMode >= modes.length) currentMode = 0;
    let mode = modes[currentMode][0];

    let time = modes[currentMode][1];
    setTimeout(() => {
        switchMode();
    }, time);

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
            case 'heart':
                cl.cursor.velocity.x = 0;
                cl.cursor.velocity.y = 0;
                break;
            case 'fullsine':
                cl.cursor.velocity.x = 2;
                cl.cursor.velocity.y = 2;
                break;
            case 'line':
                cl.cursor.velocity.x = 1;
                cl.cursor.velocity.y = 0;
                cl.cursor.angle = cl.cursor.offset;
                break;
            case 'line2':
                cl.cursor.velocity.x = 1;
                cl.cursor.velocity.y = 0;
                break;
            case 'circle3':
                // cl.cursor.angle2 = (cl.id / TOTAL_IDS) * 360;
                cl.cursor.angle2 = 0;
                cl.cursor.velocity.x = 1;
                cl.cursor.velocity.y = 1;
                cl.cursor.angle3 = 0;
                // cl.cursor.angle3 = (cl.id / TOTAL_IDS) * 360;
                break;
            case 'circle4':
                // cl.cursor.angle2 = (cl.id / TOTAL_IDS) * 360;
                cl.cursor.angle2 = 0;
                cl.cursor.velocity.x = 1;
                cl.cursor.velocity.y = 1;
                cl.cursor.angle3 = 0;
                // cl.cursor.angle3 = (cl.id / TOTAL_IDS) * 360;
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

// setInterval(() => {
//     switchMode();
// }, modeDelay);

switchMode();

const { PianoPlayer } = require('./src/PianoPlayer');

const player = new PianoPlayer(bots.map(b => b.cl));

let currentFile = 0;
let files = [
	// './Hill.mid',
	// './Sonic1_-_Green_Hill_Zone.mid',
	// './china.mid',
	// './Slider.mid',
	'./[Black Score] One Last Time ~ Z-Doc R..mid'
];
// let file = './[Black Score] One Last Time ~ Z-Doc R..mid'

// if (!true) {
    setTimeout(() => {
        player.loadFile(files[currentFile]);
    }, 3000);
// }

player.player.on('endOfFile', () => {
	player.player.stop();
	currentFile++;
    setTimeout(() => {
        player.loadFile(files[currentFile]);
    }, 3000);
});
