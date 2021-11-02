document.addEventListener('DOMContentLoaded', () => {
  let fruit = {
    apple: 20,
    banana: 30,
    orange: 50,
  };
  let graph = new Graph(fruit, new Ctx(400, 500, '.task1'), 200, 20);

  let face = new ClockFace(30, 'violet', 'green', 50, 'black', new CtxClock());
  let hours = new Arrow(0.6, 16, 'blue', new CtxClock());
  let minute = new Arrow(0.7, 8, 'yellow', new CtxClock());
  let second = new Arrow(0.8, 4, 'red', new CtxClock());
  let clock = new Clock(face, hours, minute, second);
});
class Graph {
  constructor(object, createCanvas, radius, fontSize) {
    this.createCanvas = createCanvas;
    this.ctx = this.createCanvas.ctx;
    this.radius = radius;
    this.fontSize = fontSize;

    this.object = object;
    this.getColors();
    this.a();
    console.log(this.colors);
  }
  a() {
    this.sumData = 0;
    for (let key in this.object) this.sumData += this.object[key];

    let start = 0;
    let end = 0;
    let i = 0;
    let radius = this.radius;
    let legendMove = 0;
    let stringLength = 0;
    let enter = 0;
    for (let key in this.object) {
      radius = 170;
      legendMove += 30;
      end = start + (360 / 100) * (this.object[key] / this.sumData) * 100;
      console.log(key + ' ' + this.object[key]);
      this.segment(start, end, radius, this.colors[i]);
      if (stringLength > this.createCanvas.width - 100) {
        stringLength = 0;
        enter += 30;
      }
      this.legend(key, this.colors[i], stringLength, enter);
      stringLength += key.length * 18;

      start = end;
      i++;
    }
  }
  segment(start, end, r, color) {
    this.ctx.beginPath();
    this.ctx.moveTo(this.createCanvas.width / 2, this.radius);
    this.ctx.arc(
      this.createCanvas.width / 2,
      this.radius,
      r,
      (Math.PI / 180) * start,
      (Math.PI / 180) * end
    );
    this.ctx.fillStyle = color;
    this.ctx.fill();
    this.ctx.stroke();
  }
  legend(text, color, moveX, moveY) {
    let ispace = 5;
    this.ctx.beginPath();
    this.ctx.fillRect(moveX, this.radius * 2 + 20 + moveY, 20, -20);

    this.ctx.font = `bold ${this.fontSize}px serif`;
    this.ctx.fillStyle = 'black';
    this.ctx.fillText(text, moveX + 20 + 3, this.radius * 2 + 20 + moveY);
  }
  getColors() {
    let pallet = ['#FFDC00', '#F012BE', '#3D9970'];
    this.colors = [];
    for (let i = 0; i < Object.keys(this.object).length; i++) {
      this.colors.push(pallet[i % pallet.length]);
    }
  }
}
class ClockFace {
  constructor(border, color, colorBorder, fontSize, colorFont, createCanvas) {
    this.createCanvas = createCanvas;
    this.ctx = this.createCanvas.ctx;
    this.center = {
      x: this.createCanvas.width / 2,
      y: this.createCanvas.height / 2,
    };
    this.fontSize = fontSize;
    this.border = border;
    this.r = this.center.x > this.center.y ? this.center.y : this.center.x;
    this.color = color;
    this.colorBorder = colorBorder;
    this.colorFont = colorFont;
    //this.draw = this.draw();
  }
  face() {
    this.ctx.beginPath();
    this.ctx.fillStyle = this.colorBorder;
    this.ctx.arc(this.center.x, this.center.y, this.r, 0, 2 * Math.PI);
    this.ctx.fill();

    this.ctx.beginPath();
    this.ctx.fillStyle = this.color;
    this.ctx.arc(
      this.center.x,
      this.center.y,
      this.r - this.border,
      0,
      2 * Math.PI
    );
    this.ctx.fill();
  }
  hours() {
    this.ctx.beginPath();
    for (let i = 4; i < 16; i++) {
      let x =
        Math.cos((Math.PI / 180) * ((i - 3) * 30)) *
        (this.r - this.fontSize / 2 - (this.border + 5));
      let y =
        Math.sin((Math.PI / 180) * ((i - 3) * 30)) *
          (this.r - this.fontSize / 2 - (this.border + 5)) +
        this.fontSize / 3;
      console.log(this.r);
      let a = i;
      if (i > 12) a = i - 12;
      this.ctx.textAlign = 'center';
      this.ctx.font = `bold ${this.fontSize}px serif`;
      this.ctx.fillStyle = this.colorFont;
      this.ctx.fillText(a, this.center.x + x, this.center.y + y);
    }
  }
  draw() {
    this.face();
    this.hours();
  }
}
class Ctx {
  constructor(width, height, selector) {
    this.width = width;
    this.height = height;
    this.selector = selector;
    this.ctx = this.create();
  }
  create() {
    let element = document.querySelector(this.selector);
    let canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '0px';
    canvas.style.left = '0px';
    canvas.width = this.width;
    canvas.height = this.height;
    canvas.color = 'red';
    element.append(canvas);
    return canvas.getContext('2d');
  }
}
class CtxClock {
  constructor(width, height, selector) {
    this.width = 400;
    this.height = 400;
    this.selector = '.task2';
    this.ctx = this.create();
  }
  create() {
    let element = document.querySelector(this.selector);
    let canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '0px';
    canvas.style.left = '0px';
    canvas.width = this.width;
    canvas.height = this.height;
    canvas.color = 'red';
    element.append(canvas);
    return canvas.getContext('2d');
  }
}
class Arrow {
  constructor(lenght, width, color, createCanvas) {
    this.createCanvas = createCanvas;
    this.ctx = this.createCanvas.ctx;
    this.center = {
      x: this.createCanvas.width / 2,
      y: this.createCanvas.height / 2,
    };
    this.color = color;
    this.lenght =
      lenght * (this.center.x > this.center.y ? this.center.y : this.center.x);
    this.width = width;
  }
  draw(rortate) {
    this.ctx.translate(this.center.x, this.center.y);
    this.ctx.rotate(rortate);
    this.ctx.beginPath();
    this.ctx.fillStyle = this.color;
    this.ctx.rect(-this.width / 2, 0, this.width, -this.lenght);
    this.ctx.fill();
    this.ctx.beginPath();
    this.ctx.fillStyle = this.color;
    this.ctx.arc(0, 0, this.width * 1.2, 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.beginPath();
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
  }
  clear() {
    this.ctx.clearRect(0, 0, this.createCanvas.width, this.createCanvas.height);
  }
}
class Clock {
  constructor(face, arrowHours, arrowMinute, arrowSecond) {
    this.arrowSecond = arrowSecond;
    this.arrowMinute = arrowMinute;
    this.arrowHours = arrowHours;
    this.face = face;
    this.face.draw();
    this.startAnimation();
  }
  startAnimation() {
    requestAnimationFrame(() => {
      let data = new Date();
      this.miliSecond = data.getMilliseconds();
      this.second = data.getSeconds();
      this.minutes = data.getMinutes();
      this.hours = data.getHours();
      this.clear();
      this.draw();
      this.startAnimation();
    });
  }
  draw() {
    this.arrowHours.draw(
      (((Math.PI / 180) * 360) / 12) *
        (this.hours > 12 ? this.hours - 12 : this.hours) +
        (((Math.PI / 180) * 360) / 12 / 60) * this.minutes
    );
    this.arrowMinute.draw(
      (((Math.PI / 180) * 360) / 60) * this.minutes +
        (((Math.PI / 180) * 360) / 60 / 60) * this.second
    );
    this.arrowSecond.draw(
      (((Math.PI / 180) * 360) / 60) * this.second +
        (((Math.PI / 180) * 360) / 60 / 1000) * this.miliSecond
    );
  }
  clear() {
    this.arrowHours.clear();
    this.arrowMinute.clear();
    this.arrowSecond.clear();
  }
}
