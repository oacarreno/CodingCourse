import { earthquakes } from "./earthquakes.js";
import { airports } from "./airports.js";
import { scripts } from "./scripts.js";

function customFilter(array) {
  let output = [];
  for (let i = 0; i < array.length; i++) {
    const element = array[i];
    if (element.year > 1950) {
      output.push(element);
    }
  }
  return output;
}

/* log a variable that contains an array of objects of the form
{mag, time, place}
for all earthquakes stronger than mag 2
*/

let strongE = earthquakes
  .filter((e) => e.properties.mag > 2)
  .map((e) => {
    return {
      place: e.properties.place,
      time: e.properties.time,
      date: new Date(e.properties.time),
      mag: e.properties.mag,
    };
  });
console.log(airports[0]);

let airportTimeline = airports
  .filter((e) => e.Airport.Code == "ATL")
  .map((e) => {
    return e.Time.Label;
  });
console.log(airportTimeline);

let airportCodes = [...new Set(airports.map((e) => e.Airport.Code))];
console.log(airportCodes);

function airportScore(airport) {
  let cancelMult = 100;
  let delayMult = 10;
  let divertMult = 50;
  let minutesMult = 1;
  let maxDelay = 38;

  const { Total, Cancelled, Delayed, Diverted } = airport.Statistics.Flights;
  // calculate avg mins per flight
  let avgMinsPerFlight = airport.Statistics["Minutes Delayed"].Total / Total;
  // percentages
  let cancelPercent = Cancelled / Total;
  let delayPercent = Delayed / Total;
  let divertPercent = Diverted / Total;
  let minutesPercent = avgMinsPerFlight / maxDelay;
  // score
  let score =
    cancelPercent * cancelMult +
    delayPercent * delayMult +
    divertPercent * divertMult +
    minutesPercent * minutesMult;
  return score;
}
console.log(airportScore(airports[0]));
let monthlyScores = airports.map((e) => {
  let score = airportScore(e);
  let code = e.Airport.Code;
  return [code, score];
});

let finalScores = {};
for (let i = 0; i < monthlyScores.length; i++) {
  const [code, score] = monthlyScores[i];
  // score array; if new code, make new property
  //console.log(i, code, score);
  // else old code, put score in
  if (finalScores[code] == undefined) {
    finalScores[code] = score;
  } else {
    finalScores[code] += score;
  }
}

let ex = {
  ATL: 5,
  TOP: 8,
  HOC: 9,
};

console.log(finalScores);
