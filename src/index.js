const app = require("express")();
const server = require("http").createServer(app);
const expressParser = require("body-parser");
const bot = require("./worker/telegramBot");
const { parserName, parseSnapping } = require("./utils/parsePoringData");
const { getPoring } = require("./services/poringWorld");
const botSearch = require("./utils/queryBuilder")

bot.on("message", msg => {
  if (msg.text.startsWith("+bot")) {
    // let query = msg.text.replace("+bot ", "");
    botSearch(msg.text)
    // let snapping = false;
    // let refining = false;
    // let refininglvl = 0;
    // if (query.includes("snapping")) {
    //   query = query.replace("snapping", "");
    //   snapping = true;
    // }
    // if (query.includes("refine:")) {
    //   let pos = query.indexOf("refine:");
    //   query = query.replace("refine:", "");
    //   refininglvl = query.slice(pos, pos + 2);
    //   query = query.slice(0, pos) + " " + query.slice(pos + 2);
    //   refining = true;
    // }
    // query = query.replace(/ +(?= )/g, "");
    // if (query.charAt(query.length - 1) === " ") {
    //   query = query.slice(0, query.length - 1);
    // }
    // console.log(query);
    // const params = {
    //   order: "popularity",
    //   inStock: 1,
    //   q: query
    // };
    // bot.sendMessage("-225462163", "buscando dados...");
    // getPoring(params)
    //   .then(res => {
    //     let data = res;
    //     if (snapping) {
    //       data = parseSnapping(data);
    //     }
    //     if (refining) {
    //       data = data.filter(item => item.name.includes(`+${refininglvl}`));
    //     }
    //     let dados = parserName(data);
    //     const dadosProntos = dados.map(
    //       item => `${item.name} a ${item.price} Zeny`
    //     );
    //     const message = `Itens: \n ` + dadosProntos.join("\n");
    //     bot.sendMessage("-225462163", message);
    //   })
    //   .catch(err => {
    //     bot.sendMessage("-225462163", "falhou na busca");
    //   });
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
