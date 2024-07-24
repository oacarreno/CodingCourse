import { leftKey, rightKey, upKey, downKey } from "./keys.js";
import Body from "./body.js";
import create from "./create.js";
const MAX_FOOD = 100;
const MAX_SPEED = 360;
export default class Guy extends Body {
  constructor(x, y) {
    super(create("svg"));
    this.element.innerHTML = `
    <svg id="guy">
      <g id="inner-guy">
        <rect class="accent" x="0" y="17" width="24" height="21" rx="4"/>
        <rect id="left_foot" class="accent" x="4" y="38" width="6" height="10"/>
        <rect id="right_foot" class="accent" x="14" y="38" width="6" height="10"/>
        <g id="head">
          <rect class="accent" x="0" y="-1" width="28" height="28" rx="14"/>
          <rect id="face" x="4" y="3" width="20" height="14"/>
          <rect class="secondary" x="9" y="7" width="4" height="4"/>
          <rect class="secondary" x="17" y="7" width="4" height="4"/>
        </g>
      </g>
    </svg>`;
    this.load(x, y);
    this.height = 48;
    this.width = 26;
    this.speed = MAX_SPEED;
    this.vx = 0;
    this.vy = 0;
    this.count = 1;
    this.food = MAX_FOOD;

    setInterval(() => {
      this.foodChange(-0.6);
    }, 50);
  }

  foodChange(value) {
    this.food += value;
    let newSpeed = Math.floor(MAX_SPEED * (this.food / MAX_FOOD));
    this.speed = Math.max(0, newSpeed);
  }

  tick(scale) {
    if (leftKey() && !rightKey()) {
      this.vx = -scale(this.speed);
      this.faceLeft = true;
    } else if (rightKey() && !leftKey()) {
      this.vx = scale(this.speed);
      this.faceLeft = false;
    } else {
      this.vx = 0;
    }

    this.walking = leftKey() || rightKey() || upKey() || downKey();

    if (upKey() && !downKey()) {
      this.vy = -scale(this.speed);
    } else if (downKey() && !upKey()) {
      this.vy = scale(this.speed);
    } else {
      this.vy = 0;
    }
  }

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
    this.food = 100;
  }
  levelDown() {
    console.log("ouch");
    this.foodChange(-25);
  }
}
