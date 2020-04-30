const app = require("express")();
const server = require("http").createServer(app);
const expressParser = require("body-parser");

const bot = require("./worker/telegramBot");
const { botQuery, getDataFromPoringWorld } = require("./utils/queryBuilder");

bot.on("message", async (msg) => {
  if (msg.text.startsWith("+bot")) {
    let params = botQuery(msg.text);
    bot.sendMessage("-225462163", "Iniciando Busca");
    let responseMessage = await getDataFromPoringWorld(params, msg.text);
    bot.sendMessage("-225462163", responseMessage);
  }
});
const connectMongo = require("./utils/mongoose");

//697079738,
// -225462163
const PORT = process.env.PORT || 3000;

app.use(expressParser.json());
app.use(
  expressParser.urlencoded({
    extended: true,
  })
);

connectMongo().then(() => {
  console.log("Mongodb connected");
});

const main = require("./api/main");
app.use("/", main);

const whatsappIncoming = require("./api/v1whatsapp");
app.use("/whats", whatsappIncoming);

const populate = require("./api/populate");
app.use("/populate", populate);

const jobs = require("./api/jobs");
app.use("/jobs", jobs);

const players = require("./api/players");
app.use("/players", players);

const war = require("./api/war");
app.use("/war", war);

server.listen(PORT, () => {
  console.log(`Server listening ${PORT}`);
});
