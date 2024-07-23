import Body from "./body.js";
import create from "./create.js";
import { WIDTH, HEIGHT } from "./dimensions.js";

export default class Obstacle extends Body {
  constructor(x, y) {
    super(create("svg"));
    this.element.innerHTML = `
    <svg id="goal"><g id="inner-goal"><g id="inner-goal-finish">
        <circle cx="10" cy="10" r="10" stroke="red" stroke-width="1" fill="black"/>
    </g></g></svg>`;
    this.width = 20;
    this.height = 20;
    if (x > WIDTH - this.width) {
      x = WIDTH - this.width;
    }
    if (y > HEIGHT - this.height) {
      y = HEIGHT - this.height;
    }
    this.load(x, y);
  }

  load(x, y) {
    this.x = x;
    this.y = y;
  }

  toJSON() {
    return [Math.round(this.x), Math.round(this.y)];
  }
}
