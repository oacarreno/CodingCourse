import Body from "./body.js";
import create from "./create.js";

export default class Point extends Body {
  constructor(x, y) {
    super(create("svg"));
    this.element.innerHTML = `
    <svg class="point">
      <g id="inner-point">
        <circle cx="50" cy="50" r="30" stroke="red" stroke-width="1" fill="none"/>
        <circle cx="50" cy="50" r="2" stroke="black" stroke-width="1" fill="none"/>

      </g>
    </svg>`;
    this.load(x, y);
    this.height = 100;
    this.width = 100;
    this.speed = 200;
    this.vx = 0;
    this.vy = 0;
  }

  tick(scale) {}

  get faceLeft() {
    return !!this._faceLeft;
  }

  set faceLeft(value) {
    this._faceLeft = !!value;
    this.element.classList.toggle("left", this.faceLeft);
  }

  get walking() {
    return !!this._walking;
  }

  set walking(value) {
    this._walking = !!value;
    this.element.classList.toggle("walk", this.walking);
  }

  load(x, y) {
    this.x = x;
    this.y = y;
  }

  toJSON() {
    return [Math.round(this.x), Math.round(this.y)];
  }

  increaseSpeed(value) {
    this.speed += value;
  }

  levelUp() {
    console.log("Level up!");
    this.increaseSpeed(100);
  }
}
