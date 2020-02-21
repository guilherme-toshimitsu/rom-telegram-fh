const express = require("express");
const router = express.Router();
const bot = require("../worker/telegramBot");
const { getPoring } = require("../services/poringWorld");

router.get("/", (req, res, next) => {
  const params = {
    order: "popularity",
    inStock: 1,
    rarity: "",
    modified: "",
    cartegory: "",
    endCategory: "",
    q: "Morale 4"
  };

  getPoring(params)
    .then(data => {
      console.log("data1");
      const dados = data.filter(item => item.lastRecord.snapEnd > 0);
      const dadosProntos = data.map(item => item.name);
      console.log("data2");
      const message =
        "Item em snapping com morale 4: " + dadosProntos.join("\n");
      bot.sendMessage("-225462163", message);
    })
    .catch(err => {
      console.log("erroooo");
    });

  res.send("server is Working");
});

module.exports = router;
