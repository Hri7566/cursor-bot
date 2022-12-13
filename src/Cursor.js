class Vector2 {
    x;
    y;

    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
}

const SCREEN_SIDES = {
    TOP: 0,
    BOTTOM: 90,
    LEFT: 0,
    RIGHT: 100
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

        this.offset = (this.id / TOTAL_IDS) * 360;

        this.followPos = new Vector2(50, 50);

        this.g = 0.9;

        this.xflip = false;
        this.yflip = false;

        this.angle = 0;
        this.angle2 = 0;
        // this.angle2 = (360 / TOTAL_IDS) * this.id;
        this.angle3 = 0;
        // this.angle3 = (360 / TOTAL_IDS) * this.id;
        this.angle4 = 0;
        this.angle5 = 0;
        this.angle6 = 0;

        this.calc = new Vector2(50, 50);
        this.calcVel = new Vector2(1, 1);

        this.mode = 'raycast';

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

        let r;
        let r2;
        let r3;
        let r4;
        let r5;
        let r6;

        switch (this.mode) {
            case 'circle':
                // this.followPos.x += this.velocity.x;
                // this.followPos.y += this.velocity.y;

                // if (this.followPos.x > SCREEN_SIDES.RIGHT || this.followPos.x < SCREEN_SIDES.LEFT) {
                //     this.velocity.x = -this.velocity.x;
                // }

                // if (this.followPos.y > SCREEN_SIDES.BOTTOM || this.followPos.y < SCREEN_SIDES.TOP) {
                //     this.velocity.y = -this.velocity.y;
                // }

                // this.angle += this.id / 2;
                // this.angle += 1;
                // this.angle += 3;
                
                if (this.angle > 360) {
                    this.angle -= 360;
                }

                // this.angle2 += 0.25;
                this.angle2 += 2;
                // this.angle2 += Math.random() * 15;

                // if (this.xflip) {
                //     if (this.angle2 < 90) {
                //         this.angle2 += 1;
                //     }
                // } else {
                //     if (this.angle2 > -90) {
                //         this.angle2 -= 1;
                //     }
                // }
                
                if (this.angle2 > 360) {
                    this.angle2 -= 360;
                }

                if (this.angle2 < 0) {
                    this.angle2 += 360;
                }

                // this.angle3 += this.velocity.x;
                // this.angle3 += 9;
                // this.angle3 += Math.random() * 5;
                
                if (this.angle3 > 360) {
                    this.angle3 -= 360;
                }

                // this.angle4 += 2;
                
                if (this.angle4 > 360) {
                    this.angle4 -= 360;
                }

                // this.angle5 += 3;
                
                if (this.angle5 > 360) {
                    this.angle5 -= 360;
                }

                // this.angle6 += 1;
                
                if (this.angle6 > 360) {
                    this.angle6 -= 360;
                }

                r = this.angle * (Math.PI / 180);
                r2 = this.angle2 * (Math.PI / 180);
                r3 = this.angle3 * (Math.PI / 180);
                r4 = this.angle4 * (Math.PI / 180);
                r5 = this.angle5 * (Math.PI / 180);
                r6 = this.angle6 * (Math.PI / 180);

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
                this.calc.x = this.followPos.x + ((Math.sin(r + this.offset) * this.size.x) / 2);
                this.calc.y = this.followPos.y + (Math.cos(r + this.offset) * this.size.y);
                break;
            case 'dvd':
                this.position.x += this.velocity.x * this.dt;
                this.position.y += this.velocity.y * this.dt;

                if (this.position.x > SCREEN_SIDES.RIGHT || this.position.x < SCREEN_SIDES.LEFT) {
                    this.velocity.x = -this.velocity.x;
                }

                if (this.position.y > SCREEN_SIDES.BOTTOM || this.position.y < SCREEN_SIDES.TOP) {
                    this.velocity.y = -this.velocity.y;
                }
                break;
            case 'sine':
                this.angle += this.velocity.x;
                if (this.angle > 360) {
                    this.angle -= 360;
                }
                r = (this.angle + (this.id * 5)) * (Math.PI / 180);
                this.calc.x = (this.id / TOTAL_IDS) * 100;
                this.calc.y = this.followPos.y + Math.sin(r) * 5;
                break;
            case 'circle2':
                // this.followPos.x += this.velocity.x;
                // this.followPos.y += this.velocity.y;

                // if (this.followPos.x > SCREEN_SIDES.RIGHT || this.followPos.x < SCREEN_SIDES.LEFT) {
                //     this.velocity.x = -this.velocity.x;
                // }

                // if (this.followPos.y > SCREEN_SIDES.BOTTOM || this.followPos.y < SCREEN_SIDES.TOP) {
                //     this.velocity.y = -this.velocity.y;
                // }

                // this.angle += this.id / 2;
                this.angle += 1;
                // this.angle += 3;
                
                if (this.angle > 360) {
                    this.angle -= 360;
                }

                // this.angle2 += 0.25;
                this.angle2 += 2;
                // this.angle2 += Math.random() * 15;

                // if (this.xflip) {
                //     if (this.angle2 < 90) {
                //         this.angle2 += 1;
                //     }
                // } else {
                //     if (this.angle2 > -90) {
                //         this.angle2 -= 1;
                //     }
                // }
                
                if (this.angle2 > 360) {
                    this.angle2 -= 360;
                }

                if (this.angle2 < 0) {
                    this.angle2 += 360;
                }

                // this.angle3 += this.velocity.x;
                // this.angle3 += 2;
                // this.angle3 += Math.random() * 5;
                
                if (this.angle3 > 360) {
                    this.angle3 -= 360;
                }

                // this.angle4 += 2;
                
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

                r = this.angle * (Math.PI / 180);
                r2 = this.angle2 * (Math.PI / 180);
                r3 = this.angle3 * (Math.PI / 180);
                r4 = this.angle4 * (Math.PI / 180);
                r5 = this.angle5 * (Math.PI / 180);
                r6 = this.angle6 * (Math.PI / 180);

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
                this.calc.x = this.followPos.x + ((Math.sin(r + this.offset) * this.size.x) / 2);
                this.calc.y = this.followPos.y + (Math.cos(r + this.offset) * this.size.y);
                break;
            case 'figure8':
                this.angle += this.velocity.x;
                if (this.angle > 360) {
                    this.angle -= 360;
                }
                r = (this.angle + (this.id * 5)) * (Math.PI / 180);
                this.calc.x = this.followPos.x + Math.cos(r) * 10;
                this.calc.y = this.followPos.y + Math.sin(r * 2) * 10;
                
                break;
            case 'cosmic':
                this.angle += this.velocity.x;
                if (this.angle > 360) {
                    this.angle -= 360;
                }
                r = (this.angle + (this.id * 5)) * (Math.PI / 180);
                this.calc.x = this.followPos.x + Math.sin(r) * 10;
                this.calc.y = this.followPos.y + Math.cos(r * 3) * 10;
                
                break;
            case 'heart':
                this.angle += 0.01;
                // this.angle += 3;
                
                if (this.angle + this.offset > 360) {
                    this.angle -= 360;
                }

                let ang = this.angle + this.offset;

                this.calc.x = ((16 * (Math.sin(ang) ** 3)) / 2) + this.followPos.x;
                this.calc.y = -((13 * (Math.cos(ang))) - (5 * (Math.cos(ang * 2))) - (Math.cos(ang * 4))) - 5 + this.followPos.y;
                break;
            case 'fullsine':
                this.angle += this.velocity.x;
                if (this.angle > 360) {
                    this.angle -= 360;
                }
                r = (this.angle + (this.id * 5)) * (Math.PI / 180);
                this.calc.x = (this.id / TOTAL_IDS) * 100;
                this.calc.y = this.followPos.y + Math.sin(r) * 50;
                break;
            case 'line':
                this.angle += this.velocity.x;
                if (this.angle > 360 * 1000) {
                    this.angle -= 360 * 1000;
                }
                r = (this.angle + (this.id * 5)) * (Math.PI / 180);
                this.calc.x = (this.offset / 2) + (Math.cos(r) * 5)/2;
                this.calc.y = this.calc.x + (Math.sin(r) * 5);
                break;
            case 'line2':
                this.angle += this.velocity.x;
                if (this.angle > 360 * 1000) {
                    this.angle -= 360 * 1000;
                }
                r = (this.angle + (this.id * 5)) * (Math.PI / 180);
                this.calc.x = (this.offset / 2) + (Math.cos(r) * 5)/2;
                this.calc.y = (-(this.calc.x + (Math.sin(r) * 5))) + 100;
                break;
            case 'circle3':
                // this.followPos.x += this.velocity.x;
                // this.followPos.y += this.velocity.y;

                // if (this.followPos.x > SCREEN_SIDES.RIGHT || this.followPos.x < SCREEN_SIDES.LEFT) {
                //     this.velocity.x = -this.velocity.x;
                // }

                // if (this.followPos.y > SCREEN_SIDES.BOTTOM || this.followPos.y < SCREEN_SIDES.TOP) {
                //     this.velocity.y = -this.velocity.y;
                // }

                // this.angle += this.id / 2;
                this.angle += 100 * this.dt;
                // this.angle += 3;
                
                if (this.angle > 360) {
                    this.angle -= 360;
                }

                // this.angle2 += 0.25;
                this.angle2 += 100 * this.dt;
                // this.angle2 += Math.random() * 15;

                // if (this.xflip) {
                //     if (this.angle2 < 90) {
                //         this.angle2 += 1;
                //     }
                // } else {
                //     if (this.angle2 > -90) {
                //         this.angle2 -= 1;
                //     }
                // }
                
                if (this.angle2 > 360) {
                    this.angle2 -= 360;
                }

                if (this.angle2 < 0) {
                    this.angle2 += 360;
                }

                // this.angle3 += this.velocity.x;
                // this.angle3 += 2;
                // this.angle3 += Math.random() * 5;
                
                if (this.angle3 > 360) {
                    this.angle3 -= 360;
                }

                // this.angle4 += 2;
                
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

                r = this.angle * (Math.PI / 180);
                r2 = this.angle2 * (Math.PI / 180);
                r3 = this.angle3 * (Math.PI / 180);
                r4 = this.angle4 * (Math.PI / 180);
                r5 = this.angle5 * (Math.PI / 180);
                r6 = this.angle6 * (Math.PI / 180);

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
                this.calc.x = this.followPos.x + ((Math.sin(r + this.offset) * this.size.x) / 2);
                this.calc.y = this.followPos.y + (Math.cos(r + this.offset) * this.size.y);
                break;
            case 'circle4':
                // this.followPos.x += this.velocity.x;
                // this.followPos.y += this.velocity.y;

                // if (this.followPos.x > SCREEN_SIDES.RIGHT || this.followPos.x < SCREEN_SIDES.LEFT) {
                //     this.velocity.x = -this.velocity.x;
                // }

                // if (this.followPos.y > SCREEN_SIDES.BOTTOM || this.followPos.y < SCREEN_SIDES.TOP) {
                //     this.velocity.y = -this.velocity.y;
                // }

                // this.angle += this.id / 2;
                this.angle += -(300 * this.dt);
                // this.angle += 3;
                
                if (this.angle > 360) {
                    this.angle -= 360;
                }

                // this.angle2 += 0.25;
                this.angle2 += 50 * this.dt;
                // this.angle2 += Math.random() * 15;

                // if (this.xflip) {
                //     if (this.angle2 < 90) {
                //         this.angle2 += 1;
                //     }
                // } else {
                //     if (this.angle2 > -90) {
                //         this.angle2 -= 1;
                //     }
                // }
                
                if (this.angle2 > 360) {
                    this.angle2 -= 360;
                }

                if (this.angle2 < 0) {
                    this.angle2 += 360;
                }

                // this.angle3 += this.velocity.x;
                // this.angle3 += 2;
                // this.angle3 += Math.random() * 5;
                
                if (this.angle3 > 360) {
                    this.angle3 -= 360;
                }

                // this.angle4 += 2;
                
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

                r = this.angle * (Math.PI / 180);
                r2 = this.angle2 * (Math.PI / 180);
                r3 = this.angle3 * (Math.PI / 180);
                r4 = this.angle4 * (Math.PI / 180);
                r5 = this.angle5 * (Math.PI / 180);
                r6 = this.angle6 * (Math.PI / 180);

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
                this.calc.x = this.followPos.x + ((Math.sin(r + this.offset) * this.size.x) / 2);
                this.calc.y = this.followPos.y + (Math.cos(r + this.offset) * this.size.y);
                break;
            case 'raycast':
                this.position.x = (this.id / TOTAL_IDS) * 100;
                this.position.y = 50;
                break;
        }

        if (this.mode !== 'dvd') {
            if (this.calc.x > this.position.x) {
                this.position.x += this.calcVel.x;
            } else {
                this.position.x -= this.calcVel.x;
            }

            if (this.calc.y > this.position.y) {
                this.position.y += this.calcVel.y;
            } else {
                this.position.y -= this.calcVel.y;
            }

            if (this.position.x < this.calc.x + 3 && this.position.x > this.calc.x - 3) {
                this.position.x = this.calc.x;
            }

            if (this.position.y < this.calc.y + 3 && this.position.y > this.calc.y - 3) {
                this.position.y = this.calc.y;
            }
        }
        this.ot = this.t;
    }
}

module.exports = {
    Cursor
}
