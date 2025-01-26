class Firework {
    constructor(target) {
        this.target = target;
        this.startingX = 100 + Math.random() * (window.innerWidth - 100);
        this.vel = this.velVector();
        this.pos = {
            x: this.startingX,
            y: window.innerHeight,
        };
        let colours = ["#FF4500", "#FFD700", "#32CD32", "#1E90FF", "#FF1493"];
        this.colour = colours[Math.floor(Math.random() * colours.length)];
        this.explosionParticles = [];
        this.exploded = false;
        this.showText = false;  // Biến cờ để hiển thị chữ
    }

    velVector() {
        let vel = 10;
        let xDir = this.target.x - this.startingX;
        let yDir = this.target.y - window.innerHeight;
        let scale = (xDir ** 2 + yDir ** 2) / vel ** 2;
        let xVel = Math.sqrt((xDir ** 2) / scale);
        let yVel = Math.sqrt((yDir ** 2) / scale);

        if (xDir < 0) {
            xVel *= -1;
        }

        return {
            x: xVel,
            y: -yVel,
        };
    }

    step() {
        if (this.pos.y > this.target.y) {
            this.pos.x += this.vel.x;
            this.pos.y += this.vel.y;

            strokeWeight(6);
            stroke(this.colour);
            point(this.pos.x, this.pos.y);
        } else {
            if (this.explosionParticles.length === 0 && !this.exploded) {
                this.explode();
                this.showText = true;  // Đặt cờ để hiển thị chữ khi pháo hoa nổ
            }

            let idx = 0;
            for (let particle of this.explosionParticles) {
                fill(this.colour + "AAA");
                noStroke();
                circle(particle.x, particle.y, 10);
                particle.x += particle.velX;
                particle.y += particle.velY;
                particle.velY += 0.09;

                if (
                    particle.y > window.innerHeight ||
                    particle.x < 0 ||
                    particle.x > window.innerWidth
                )
                    this.explosionParticles.splice(idx, 1);
                idx++;
            }
        }

        // Hiển thị chữ "Happy New Year 2025" khi pháo hoa nổ lần đầu
        if (this.showText) {
            fill(255, 255, 255);
            textSize(48);
            textAlign(CENTER, CENTER);
            text("Happy New Year 2025 \n Không muốn nhận lì xì hả ta?", window.innerWidth / 2, window.innerHeight / 4);
        }
    }

    explode() {
        for (let i = 0; i < 200; i++) {
            this.explosionParticles.push({
                x: this.pos.x,
                y: this.pos.y,
                velX: random(-5, 5),
                velY: random(-5, 5),
            });
        }
        this.exploded = true;
    }
}
