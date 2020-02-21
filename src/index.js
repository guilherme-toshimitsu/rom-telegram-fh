const app = require("express")();
const server = require("http").createServer(app);
const expressParser = require("body-parser");
const bot = require("./worker/telegramBot");
const { parserName } = require("./utils/parsePoringData");
const { getPoring } = require("./services/poringWorld");

bot.on("message", msg => {
  if (msg.text.startsWith("+bot")) {
    const params = {
      order: "popularity",
      inStock: 1,
      q: msg.text.replace("+bot ", "")
    };
    getPoring(params)
      .then(data => {
        const dados = parserName(data);
        const dadosProntos = dados.map(
          item => `${item.name} a ${item.price} Zeny`
        );
        const message =
          "Itens em snapping com morale 4: \n " + dadosProntos.join("\n");
        bot.sendMessage("-225462163", message);
      })
      .catch(err => {
        console.log("erroooo");
      });
  }
});
// const connectMongo = require("./utils/mongoose");

//697079738,
// -225462163
const PORT = process.env.PORT || 5000;

app.use(expressParser.json());
app.use(
  expressParser.urlencoded({
    extended: true
  })
);

// connectMongo().then(() => {
//   console.log("Mongodb connected");
// });

const main = require("./api/main");
app.use("/", main);

server.listen(PORT, () => {
  console.log(`Server listening ${PORT}`);
});
