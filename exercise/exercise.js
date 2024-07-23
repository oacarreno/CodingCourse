for (let index = "#"; index.length < 8; index += "#") {
  console.log(index);
}

let m = "";

for (let i = 1; i < 8; i += 1) {
  m += "#";
  console.log(m);
}

let b = "";

for (let f = 1; f <= 100; f++) {
  b = "";
  if (Number.isInteger(f / 5)) {
    b += "Fizz";
  }
  if (Number.isInteger(f / 3)) {
    b += "Buzz";
  }
  if (b == "") {
    console.log(f);
  } else {
    console.log(b);
  }
}

/* alternatively:
for (let f = 1; f <= 100; f++) {
  b = "";
  if (Number.isInteger(f / 5)) {
    b += "Fizz";
  }
  if (Number.isInteger(f / 3)) {
    b += "Buzz";
  }
  if (b == "") {
    b = f;
  }
  console.log(b);
}
*/
let size = 5;
for (let i = 0; i < 8; i++) {
  if (Number.isInteger(i / 2)) {
    console.log("# # # # ");
  } else {
    console.log(" # # # #");
  }
}
