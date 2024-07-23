import Body from "./src/body.js";
import Anchor from "./src/anchor.js";
import Link from "./src/link.js";
import Goal from "./src/goal.js";
import { WIDTH, HEIGHT } from "./src/constants.js";

let levels = [];

class Scene extends Body {
  constructor(game, levels) {
    super(document.getElementById("game"));
    this.game = game;

    this.anchor = new Anchor(100, 100);
    this.append(this.anchor);

    this.points = [];

    for (let index = 0; index < 10; index++) {
      if (index == 0) {
        this.points.push(new Link(this.anchor));
      } else {
        this.points.push(new Link(this.points[index - 1]));
      }
    }

    for (const point of this.points) {
      this.append(point);
    }
  }

  setBounds(body) {
    const { bounds } = body;

    bounds.left = -body.left;
    bounds.right = WIDTH - body.right;
    bounds.top = -body.top;
    bounds.bottom = HEIGHT - body.bottom + 1;

    return bounds;
  }

  tick(scale) {
    this.anchor.tick(scale);
    this.points.forEach((point) => point.tick(scale));

    const { left, right } = this.setBounds(this.anchor);
    this.anchor.x += Math.min(right, Math.max(left, this.anchor.vx));

    const { top, bottom } = this.setBounds(this.anchor);
    this.anchor.y += Math.min(bottom, Math.max(top, this.anchor.vy));
  }
}

class Game {
  constructor() {
    this.scene = new Scene(this, levels);
  }

  tick(scale) {
    this.scene.tick(scale);
  }
}

const game = new Game();

let previous = 0;
requestAnimationFrame(function tick(time) {
  // To deal with different frame rates, we define per-second speeds and adjust
  // them according to the time since the last frame was rendered.
  const duration = time - previous;
  game.tick((value) => Math.round((value * duration) / 1000));
  previous = time;
  requestAnimationFrame(tick);
});
