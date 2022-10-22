class Vector2 {
    x;
    y;

    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
}

const SCREEN_SIDES = {
    TOP: 30,
    BOTTOM: 70,
    LEFT: 30,
    RIGHT: 70
}

class Cursor {
    constructor(id, x, y) {
        this.id = id;
        this.position = new Vector2(x || 50, y || 50);
        this.velocity = new Vector2();
        this.velocity = new Vector2((2/5) / 2, (2/7) / 2);
        this.acceleration = new Vector2();
        this.t = Date.now();
        this.ot = Date.now();
        this.dt = 0;

        this.offset = this.id / (TOTAL_IDS / 10);

        this.followPos = new Vector2(50, 50);

        this.g = 0.9;

        this.angle = 0;
        this.angle2 = (360 / TOTAL_IDS) * this.id; // 0;
        this.angle3 = 0;
        this.angle4 = 0;
        this.angle5 = 0;
        this.angle6 = 0;

        this.size = new Vector2(20, 20);
    }

    startAnimation() {
        this.cursorInterval = setInterval(() => {
            this.update();
        }, 1000 / 60);
    }

    stopAnimation() {
        clearInterval(this.cursorInterval);
    }

    update() {
        this.t = Date.now();
        this.dt = (this.t - this.ot) / 1000;

        this.followPos.x += this.velocity.x;
        this.followPos.y += this.velocity.y;

        if (this.followPos.x > SCREEN_SIDES.RIGHT || this.followPos.x < SCREEN_SIDES.LEFT) {
            this.velocity.x = -this.velocity.x;
        }

        if (this.followPos.y > SCREEN_SIDES.BOTTOM || this.followPos.y < SCREEN_SIDES.TOP) {
            this.velocity.y = -this.velocity.y;
        }

        // this.angle += this.id / 2;
        // this.angle += 1;
        this.angle += 3;
        
        if (this.angle > 360) {
            this.angle -= 360;
        }

        this.angle2 += 2;
        // this.angle2 += 2;
        // this.angle2 += Math.random() * 15;
        
        if (this.angle2 > 360) {
            this.angle2 -= 360;
        }

        // this.angle3 += 1;
        // this.angle3 += 9;
        // this.angle3 += Math.random() * 15;
        
        if (this.angle3 > 360) {
            this.angle3 -= 360;
        }

        this.angle4 += 2;
        
        if (this.angle4 > 360) {
            this.angle4 -= 360;
        }

        this.angle5 += 3;
        
        if (this.angle5 > 360) {
            this.angle5 -= 360;
        }

        this.angle6 += 1;
        
        if (this.angle6 > 360) {
            this.angle6 -= 360;
        }

        let r = this.angle * (Math.PI / 180);
        let r2 = this.angle2 * (Math.PI / 180);
        let r3 = this.angle3 * (Math.PI / 180);
        let r4 = this.angle4 * (Math.PI / 180);
        let r5 = this.angle5 * (Math.PI / 180);
        let r6 = this.angle6 * (Math.PI / 180);

        // this.followPos.x = 25 // + (Math.sin(r4) * 10);
        // this.followPos.y = 50 // + (Math.cos(r5) * 5);

        // this.velocity.x += this.acceleration.x;
        // this.velocity.y += this.acceleration.y;
        // // this.velocity.y += this.g;
        // this.position.x += this.velocity.x * this.dt;
        // this.position.y += this.velocity.y * this.dt;

        // if (this.position.y > SCREEN_SIDES.BOTTOM) {
        //     this.velocity.y -= 15;
        // }

        // if (this.position.y < SCREEN_SIDES.TOP) {
        //     this.velocity.y += 15;
        // }
        
        // if (this.position.x > SCREEN_SIDES.RIGHT) {
        //     this.velocity.x -= 15;
        // }

        // if (this.position.x < SCREEN_SIDES.LEFT) {
        //     this.velocity.x += 15;
        // }

        // this.position.x += 0.1;
        // this.position.y = this.followPos.y + (Math.sin(this.position.x / 5) * 10)
        this.size.x = Math.sin(r2) * 20;
        this.size.y = Math.cos(r3) * 20;
        this.position.x = this.followPos.x + ((Math.sin(r + this.offset) * this.size.x) / 2);
        this.position.y = this.followPos.y + (Math.cos(r + this.offset) * this.size.y);

        this.ot = this.t;
    }
}

module.exports = {
    Cursor
}
