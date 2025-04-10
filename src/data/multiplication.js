function isNaturalNumber(str) {
  var pattern = /^(0|([1-9]\d*))$/;
  return pattern.test(str);
}

export function multiplicationData({ range = 100 }) {
  const data = [];
  for (let a = 1; a <= 10; a++) {
    for (let b = 1; b <= 10; b++) {
      data.push({ id: `${a}x${b}`, a, b, type: "x", result: a * b });
    }
  }

  const filteredData = data.filter((item) => item.result < range);

  return filteredData;
}

export function divisionData({ range = 100 }) {
  const data = [];
  for (let a = 1; a <= range; a++) {
    for (let b = 1; b <= range; b++) {
      if (b > a) continue;
      if (!isNaturalNumber(`${a / b}`)) continue;
      data.push({ id: `${a}:${b}`, a, b, type: ":", result: a / b });
    }
  }

  return data;
}

export function getRandomQuestion(data) {
  const randomIndex = Math.floor(Math.random() * data.length);
  console.log("randomIndex:", randomIndex);

  return data[randomIndex];
}
