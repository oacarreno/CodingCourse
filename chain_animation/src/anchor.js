import { leftKey, rightKey, upKey, downKey } from "./keys.js";
import Point from "./point.js";

export default class Anchor extends Point {
  constructor(x, y) {
    super(x, y);
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
}
