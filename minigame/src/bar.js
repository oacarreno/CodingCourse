import Body from "./body.js";
import create from "./create.js";

export default class Bar extends Body {
  constructor(x, y, width, height) {
    super(create("rect"));
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
  }

  toJSON() {
    return [
      Math.round(this.x),
      Math.round(this.y),
      Math.round(this.width),
      Math.round(this.height),
    ];
  }
}
