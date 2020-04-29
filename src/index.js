const app = require("express")();
const server = require("http").createServer(app);
const expressParser = require("body-parser");

const bot = require("./worker/telegramBot");
const botSearch = require("./utils/queryBuilder");

bot.on("message", (msg) => {
  if (msg.text.startsWith("+bot")) {
    botSearch(msg.text);
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
