const parserName = dados => {
  const dadosProntos = dados.map(item => ({
    name: item.name,
    price: item.lastRecord.price
  }));
  return dadosProntos;
};

const parseSnapping = data => {
  return data.filter(item => item.lastRecord.snapEnd > 0);
};

module.exports = {
  parserName,
  parseSnapping
};
