const Client = require('./Client');
const { Cursor } = require('./Cursor');
const Color = require('./Color');
const hslToRgb = require('./hsl');

class CursorBot {
    constructor(id) {
        this.cl = new Client("wss://mpp.lapishusky.dev", id);
        this.cursor = new Cursor(id, 50, 50);
        this.id = id;
		console.log(this.id);

        this.bindEventListeners();

        this.h = this.id / TOTAL_IDS;
        this.s = 1;
        this.svel = -0.1;
        this.l = 0.5;
        this.lvel = 0.01;

        // setInterval(() => {
        //     this.h += 0.01;
        //     this.s += this.svel;
        //     if (this.s >= 0.75 || this.s <= 0.25) {
        //         this.svel = -this.svel;
        //     }
        //     this.l += this.lvel;
        //     if (this.l >= 0.75 || this.l <= 0.25) {
        //         this.lvel = -this.lvel;
        //     }
        //     this.cl.emit('set user');
        // }, 1000 / 10);

        this.follow;
    }

    bindEventListeners() {
        this.cl.on('hi', msg => {
            this.cl.emit('set user');
            // this.cursor.startAnimation();
            // this.startCursorSend();
        });

        this.cl.on('set user', () => {
            if (this.h > 1) {
                this.h -= 1;
            }
            if (this.h < 0) {
                this.h += 1;
            }
            let hsl = hslToRgb(this.h, this.s, this.l);
            this.cl.sendArray([{
                m: 'userset',
                set: {
                    // name: `Cursor #${this.id}`,
                    // name: `x: ${this.cursor.position.x.toFixed(2)}, y: ${this.cursor.position.y.toFixed(2)}`,
                    name: `hri`,
                    // name: `x: ${this.cursor.position.x.toFixed(2)}, y: ${this.cursor.position.y.toFixed(2)}`,
                    // color: '#000000',
                    color: new Color(hsl[0], hsl[1], hsl[2]).toHexa()
                }
            }]);
        })
        
        this.cl.on('allOnline', () => {
            this.cursor.startAnimation();
            this.startCursorSend();
        });

        // this.cl.on('ch', () => {
        //     this.startCursorSend();
        // });

        // this.cl.on('bye', () => {
        //     this.stopCursorSend();
        // });

        this.cl.on('a', msg => {
            if (!msg?.a?.startsWith('cursor')) return;
            
            let args = msg.a.split(' ');
            args.shift(); // remove first arg

            switch (args[0]) {
                case 'follow':
                    if (args[1]) {
                        let p = this.getPart(args[1]);
                        if (p) {
                            this.follow = p._id;
                            this.sendChat(`Now following ${this.follow}`)
                        } else {
                            this.sendChat(`Can't find user '${args[1]}'`);
                        }
                    } else {
                        this.follow = msg.p._id;
                        this.sendChat(`Now following ${this.follow}`)
                    }
                    break;
                case 'unfollow':
                    this.follow = undefined;
                    this.cursor.followPos.x = 50;
                    this.cursor.followPos.y = 50;
                    this.sendChat(`Stopped following`);
                    break;
                case 'xflip':
                    this.cursor.xflip = !this.cursor.xflip;
                    break;
                case 'yflip':
                    this.cursor.yflip = !this.cursor.yflip;
                    break;
            }
        });
    }

    getPart(id) {
        for (let p of Object.values(this.cl.ppl)) {
            if (p._id.toLowerCase().includes(id.toLowerCase()) || p.name.toLowerCase().includes(id.toLowerCase())) {
                return p;
            }
        }
    }

    start() {
        this.cl.start();
    }

    sendChat(msg) {
        if (this.id !== 1) return;
        this.cl.sendArray([{
            m: 'a',
            message: `\u034f${msg}`
        }]);
    }

    startCursorSend() {
        this.cursorSendInterval = setInterval(() => {
            let p = Object.values(this.cl.ppl).find(p => {
                if (p._id == this.follow) return true;
            });

            if (p) {
                this.cursor.followPos.x = p.x;
                this.cursor.followPos.y = p.y;
            }

            this.cl.sendArray([{
                m: 'm',
                x: this.cursor.position.x,
                y: this.cursor.position.y
            }]);
        }, 1000 / 30);

        // this.usersetInterval = setInterval(() => {
        //     this.cl.sendArray([{
        //         m: 'userset',
        //         set: {
        //             // name: `Cursor #${this.id}`,
        //             name: `x: ${this.cursor.position.x.toFixed(2)}, y: ${this.cursor.position.y.toFixed(2)}`,
        //             color: '#000000'
        //         }
        //     }]);
        // }, 1000 / 5);
    }

    stopCursorSend() {
        clearInterval(this.cursorSendInterval);
    }
}

module.exports = {
    CursorBot
}
