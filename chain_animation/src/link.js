import Point from "./point.js";

export default class Link extends Point {
  constructor(element) {
    super(element.x - 100, element.y);
    this.parent = element;

    this.updateAngle();
    this.updatePosition();

    console.log("Link created!", element);
  }

  tick(scale) {
    console.log(this.cy, this.cx);
    this.updateAngle();
    this.updatePosition();
  }

  updateAngle() {
    this.angle = Math.atan2(this.cy - this.parent.cy, this.cx - this.parent.cx);
  }

  updatePosition() {
    const dx = 50 * Math.cos(this.angle);
    const dy = 50 * Math.sin(this.angle);
    this.x = this.parent.cx + dx - 50;
    this.y = this.parent.cy + dy - 50;
  }
}
