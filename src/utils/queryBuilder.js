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
  let broken;

  name = hasName(msg);
  refine = hasRefine(query);
  enchant = hasEnchant(query);
  broken = isBroken(query);

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
  return params;
};

const getDataFromPoringWorld = async (params, msg) => {
  let snapping = isSnapping(query);
  let maxprice = hasMaxPrice(query);
  let minprice = hasMinPrice(query);
  let message;

  try {
    let response = getPoring(params);
    let dados = postQueryResolver(response, maxprice, minprice, snapping);
    if (dados.length) {
      const dadosProntos = dados.map(
        (item) => `${item.name} a ${item.lastRecord.price} Zeny`
      );
      message = `Itens: \n ` + dadosProntos.join("\n");
    } else {
      message = "Item nao encontrado";
    }
  } catch (err) {
    message = "falhou na busca";
  }

  return message;
  // .then((res) => {
  //   if (dados.length) {
  //     const dadosProntos = dados.map(
  //       (item) => `${item.name} a ${item.lastRecord.price} Zeny`
  //     );
  //     message = `Itens: \n ` + dadosProntos.join("\n");
  //   } else {
  //     message = "Item nao encontrado";
  //   }

  //   bot.sendMessage("-225462163", message);
  // })
  // .catch((err) => {
  //   bot.sendMessage("-225462163", "falhou na busca");
  // });
};

module.exports = {
  botQuery,
  getDataFromPoringWorld,
};
