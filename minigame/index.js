import Body from "./src/body.js";
import Guy from "./src/guy.js";
import Goal from "./src/goal.js";
import { getRandom } from "./src/math.js";
import { WIDTH, HEIGHT } from "./src/dimensions.js";

const levels = [];

class Scene extends Body {
  constructor(game, levels) {
    super(document.getElementById("game"));
    this.game = game;
    this.levels = levels;

    this.guy = new Guy(500, 800);
    this.append(this.guy);

    this.goals = [];

    let goal_positions = [[getRandom(WIDTH), getRandom(HEIGHT)]];

    for (const position of goal_positions) {
      const goal = new Goal(...position);
      this.append(goal);
      this.goals.push(goal);
    }

    /* setInterval(() => {
      this.createGoal();
    }, 5000);
    */
  }

  createGoal() {
    const goal = new Goal(getRandom(WIDTH), getRandom(HEIGHT));
    this.append(goal);
    this.goals.push(goal);
  }

  setBounds(body) {
    const { bounds } = body;

    bounds.left = -body.left;
    bounds.right = WIDTH - body.right;
    bounds.top = -body.top;
    bounds.bottom = HEIGHT - body.bottom + 1;

    return bounds;
  }

  score() {
    return this.goals.find((goal) => goal.overlaps(this.guy));
  }

  tick(scale) {
    this.guy.tick(scale);

    const { left, right } = this.setBounds(this.guy);
    this.guy.x += Math.min(right, Math.max(left, this.guy.vx));

    const { top, bottom } = this.setBounds(this.guy);
    this.guy.y += Math.min(bottom, Math.max(top, this.guy.vy));

    if (this.score()) {
      let overlappedGoal = this.score();
      this.goals = this.goals.filter((goal) => goal !== overlappedGoal);
      overlappedGoal.remove();
      this.guy.levelUp();
      this.createGoal();
    }
  }
}

class Game {
  constructor() {
    this.scene = new Scene(this, levels);
  }

  tick(scale) {
    this.scene.tick(scale);
  }

  getState() {
    return this;
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
