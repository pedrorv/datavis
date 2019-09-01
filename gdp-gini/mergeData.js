const fs = require("fs");

const gini = JSON.parse(fs.readFileSync("gini.json"));
const gdp = JSON.parse(fs.readFileSync("gdp.json"));

const addGdpToGiniData = g => ({
  ...g,
  gdp: gdp.find(d => d.year == g.year).gdp
});
const ascendingYear = (a, b) => a.year - b.year;

const data = gini.map(addGdpToGiniData).sort(ascendingYear);

fs.writeFileSync("data.json", JSON.stringify(data, null, 2));
