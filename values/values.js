console.log("hi bob");

console.log("4" + "20");

console.log(`Down on the "sea" ${2 + 2}`);
console.log("Lie on the ocean ${2 + 2}");

let number = 5;

if (number > 100) {
  console.log("big");
} else {
  if (number > 10) {
    console.log("medium");
  } else {
    console.log("small");
  }
}

for (let i = 0; i < 100; i++) {
  if (Number.isInteger(i / 5)) {
    console.log(i);
  }
}
