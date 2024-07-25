import Body from "./src/body.js";
import Guy from "./src/guy.js";
import Goal from "./src/goal.js";
import Bar from "./src/bar.js";
import Obstacle from "./src/obstacle.js";
import Counter from "./src/counter.js";
import { getRandom } from "./src/math.js";
import { WIDTH, HEIGHT } from "./src/dimensions.js";

const levels = [];

class Scene extends Body {
  constructor(game, levels) {
    super(document.getElementById("game"));
    this.game = game;
    this.levels = levels;

    this.stars = new Counter(document.getElementById("star-counter"));

    this.guy = new Guy(500, 800);
    this.append(this.guy);

    // goal setup

    this.goals = [];
    let goal_positions = [];

    for (const position of goal_positions) {
      const goal = new Goal(...position);
      this.append(goal);
      this.goals.push(goal);
    }

    /* setInterval(() => {
      this.createGoal();
    }, 5000);
    */

    // obstacle setup
    this.obstacles = [];
    this.createObstacle();

    // bar set up
    this.bars = [];
    let bar_positions = [
      [200, 0, 100, 250],
      [WIDTH - 200, HEIGHT - 250, 100, 250],
    ];
    for (const position of bar_positions) {
      let bar = new Bar(...position);
      this.bars.push(bar);
      this.append(bar);
    }
    this.createGoal();
  }

  goalOverlapBar(goal) {
    return this.bars.find((bar) => bar.overlaps(goal));
  }

  createGoal() {
    let goal;
    do {
      goal = new Goal(getRandom(WIDTH), getRandom(HEIGHT));
    } while (this.goalOverlapBar(goal));
    this.append(goal);
    this.goals.push(goal);
  }
  createObstacle() {
    const obstacle = new Obstacle(getRandom(WIDTH), getRandom(HEIGHT));
    this.append(obstacle);
    this.obstacles.push(obstacle);
  }

  setBounds(body) {
    const { bounds } = body;

    bounds.left = -body.left;
    bounds.right = WIDTH - body.right;
    bounds.top = -body.top;
    bounds.bottom = HEIGHT - body.bottom + 1;

    for (const bar of this.bars) {
      if (bar.top < body.bottom && bar.bottom > body.top) {
        if (bar.isRightOf(body)) {
          bounds.right = Math.min(bounds.right, bar.left - body.right);
        } else if (bar.isLeftOf(body)) {
          bounds.left = Math.max(bounds.left, bar.right - body.left);
        }
      }

      if (bar.left < body.right && bar.right > body.left) {
        if (bar.isBelow(body)) {
          bounds.bottom = Math.min(bounds.bottom, bar.top - body.bottom);
        } else if (bar.isAbove(body)) {
          bounds.top = Math.max(bounds.top, bar.bottom - body.top);
        }
      }
    }

    return bounds;
  }

  score() {
    return this.goals.find((goal) => goal.overlaps(this.guy));
  }

  blunder() {
    return this.obstacles.find((obstacle) => obstacle.overlaps(this.guy));
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
      this.createObstacle();
    }
    if (this.blunder()) {
      let overlappedObstacle = this.blunder();
      this.obstacles = this.obstacles.filter(
        (obstacle) => obstacle !== overlappedObstacle
      );
      overlappedObstacle.remove();
      this.guy.levelDown();
      this.stars.value++;
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
