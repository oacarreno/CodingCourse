function findSolution(target) {
  function find(current, history) {
    if (current == target) {
      return history;
    } else if (current > target) {
      return null;
    } else {
      return (
        find(current + 5, `(${history} + 5)`) ??
        find(current * 3, `(${history} * 3)`)
      );
    }
  }
  return find(1, "1");
}

console.log(findSolution(13));

function zeroAdd(number, animal) {
  aniString = String(number);
  while (aniString.length < 3) {
    aniString = `0${aniString}`;
  }
  aniString += ` ${animal}`;
  console.log(aniString);
}

function printFarmInventory(cow, chick, pig) {
  zeroAdd(cow, "cows");
  zeroAdd(chick, "chickens");
  zeroAdd(pig, "pigs");
}

function zeroPad(number, width) {
  let string = String(number);
  while (string.length < width) {
    string = "0" + string;
  }
  return string;
}

function bookFarmInventory(cows, chickens, pigs) {
  console.log(`${zeroPad(cows, 3)} Cows`);
  console.log(`${zeroPad(chickens, 3)} Chickens`);
  console.log(`${zeroPad(pigs, 3)} Pigs`);
}

function countBs(input) {
  let wordString = String(input);
  let counter = 0;
  for (let i = 0; i < wordString.length; i++) {
    if (wordString[i] == "B") {
      counter++;
    }
  }
  console.log(counter);
}

function countChar(input, char) {
  let wordString = String(input);
  let counter = 0;
  for (let i = 0; i < wordString.length; i++) {
    if (wordString[i] == char) {
      counter++;
    }
  }
  console.log(counter);
}
