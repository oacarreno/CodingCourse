console.log("data");

let list = ["banna", 23, "cheese", "milk", true];

console.log(Math.random());

function chance(first, second, odds = 0.5) {
  let r = Math.random();
  if (r < odds) {
    return first;
  } else {
    return second;
  }
}
