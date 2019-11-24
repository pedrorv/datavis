const fs = require("fs");

const rawData = JSON.parse(fs.readFileSync("rawdata.json"));

const data = rawData
  .map(d => {
    if (d.Dado.includes("Mais de ") && d.Dado != "Mais de 10 SM") {
      d.Dado = d.Dado.replace("Mais de ", "");
    }

    d.Dado = d.Dado.replace("De ", "");

    return {
      ...d
    };
  })
  .reduce((acc, d) => {
    if (!acc[d.Tipo]) {
      acc[d.Tipo] = {};
    }

    if (!acc[d.Tipo][d.Dado]) {
      acc[d.Tipo][d.Dado] = {};
    }

    if (!acc[d.Tipo][d.Dado][d.Ano]) {
      acc[d.Tipo][d.Dado][d.Ano] = {};
    }

    acc[d.Tipo][d.Dado][d.Ano]["Computador"] = d.Computador;
    acc[d.Tipo][d.Dado][d.Ano]["Tablet"] = d.Tablet;
    acc[d.Tipo][d.Dado][d.Ano]["Celular"] = d.Celular;
    acc[d.Tipo][d.Dado][d.Ano]["Videogame"] = d.Videogame;
    acc[d.Tipo][d.Dado][d.Ano]["Televisão"] = d.Televisao;

    return acc;
  }, {});

fs.writeFileSync("data_v2.json", JSON.stringify(data, null, 2), "utf8");
