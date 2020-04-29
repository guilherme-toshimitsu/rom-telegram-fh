const bot = require("../worker/telegramBot");
const { getPoring } = require("../services/poringWorld");
const {
  valueQueryBuilder,
  valueQueryBuilderBoolean,
} = require("./stringUtils");

const queryBuilder = (name, refine, enchant, isBroken) => {
  let query = "";
  if (refine) {
    query = query + `+${refine} `;
  }
  if (name) {
    query = query + `${name} `;
  }
  if (enchant && !refine && !name) {
    query = query + `<${enchant}> `;
  }

  if (isBroken) {
    query = query + `(broken)`;
  }
  return query.trim();
};

let postQueryResolver = (items = [], maxprice, minprice, snapping) => {
  let data = items;
  if (snapping) {
    data = paserSnapping(data);
  }
  if (maxprice) {
    data = data.filter((item) => item.lastRecord.price <= Number(maxprice));
  }
  if (minprice) {
    data = data.filter((item) => item.lastRecord.price >= Number(minprice));
  }
  return data;
};

const hasName = valueQueryBuilder("name");
const hasRefine = valueQueryBuilder("refine");
const hasEnchant = valueQueryBuilder("enchant");
// const hasOrder = valueQueryBuilder("order")
const hasMaxPrice = valueQueryBuilder("maxprice");
const hasMinPrice = valueQueryBuilder("minprice");
const isBroken = valueQueryBuilderBoolean("broken");
const isSnapping = valueQueryBuilderBoolean("snapping");

const botQuery = (msg) => {
  let query = "" + msg;
  let name;
  let refine;
  let enchant;
  // let order;
  let maxprice;
  let minprice;
  let broken;
  let snapping;
  name = hasName(msg);
  refine = hasRefine(query);
  enchant = hasEnchant(query);
  maxprice = hasMaxPrice(query);
  minprice = hasMinPrice(query);
  broken = isBroken(query);
  snapping = isSnapping(query);

  let newQuery = queryBuilder(name, refine, enchant, broken);

  const params = {
    order: "popularity",
    inStock: "1",
    caregory: null,
    endCategory: null,
    rarity: null,
    modified: null,
    q: newQuery,
  };
  bot.sendMessage("-225462163", "buscando dados...");
  getPoring(params)
    .then((res) => {
      let message;
      let dados = postQueryResolver(res, maxprice, minprice, snapping);
      if (dados.length) {
        const dadosProntos = dados.map(
          (item) => `${item.name} a ${item.lastRecord.price} Zeny`
        );
        message = `Itens: \n ` + dadosProntos.join("\n");
      } else {
        message = "Item nao encontrado";
      }

      bot.sendMessage("-225462163", message);
    })
    .catch((err) => {
      bot.sendMessage("-225462163", "falhou na busca");
    });
};

module.exports = botQuery;
