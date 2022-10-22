const Client = require('./Client');
const { Cursor } = require('./Cursor');

class CursorBot {
    constructor(id) {
        this.cl = new Client("wss://mpp.lapishusky.dev", id);
        this.cursor = new Cursor(id, 50, 50);
        this.id = id;

        this.bindEventListeners();

        this.follow = "00adfe8d12b742b68d734136";
    }

    bindEventListeners() {
        this.cl.on('hi', msg => {
            this.cl.sendArray([{
                m: 'userset',
                set: {
                    // name: `Cursor #${this.id}`,
                    // name: `x: ${this.cursor.position.x.toFixed(2)}, y: ${this.cursor.position.y.toFixed(2)}`,
                    name: `hri`,
                    color: '#000000'
                }
            }]);
            // this.cursor.startAnimation();
            // this.startCursorSend();
        });
        
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
    }

    start() {
        this.cl.start();
    }

    startCursorSend() {
        this.cursorSendInterval = setInterval(() => {
            // let p = Object.values(this.cl.ppl).find(p => {
            //     if (p._id == this.follow) return true;
            // });

            // if (p) {
            //     this.cursor.followPos.x = p.x;
            //     this.cursor.followPos.y = p.y;
            // }

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
