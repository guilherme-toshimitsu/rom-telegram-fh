const client = require("twilio");
const whatsappauth = require("../config/whatsapp");
const whatsUtils = require("../utils/whatsAppQuery");
const playerController = require("../controllers/players");
const warAtt = require("../controllers/war");
const moment = require("moment");
const googleApi = require("../worker/googleApi");
const { promisify } = require("util");

const { findClass, findAllClasses } = require("../controllers/classes");

client(whatsappauth.accountsid, whatsappauth.authtoken);

const { MessagingResponse } = client.twiml;

const listener = async (req, res, next) => {
  const message = req.body.Body;
  const twiml = new MessagingResponse();
  const celphone = req.body.From.split("whatsapp:+")[1];

  if (message.includes("+alljobs")) {
    const jobs = await findAllClasses();
    const parsedJobs = jobs.map((job) => job.name);
    twiml.message(parsedJobs.join("\n"));
    return res.status(200).send(twiml.toString());
  }

  if (message.includes("+update")) {
    const { name, level, classe } = whatsUtils.extractDataFromMsg(message);

    if (!name) {
      twiml.message("Nome nao especificado corretamente");
      return res.status(200).send(twiml.toString());
    }
    if (!level) {
      twiml.message("level nao especificado corretamente");
      return res.status(200).send(twiml.toString());
    }
    if (!classe) {
      twiml.message(
        "classe nao especificado corretamente, se quiser listar todas as classes digite +alljobs"
      );
      return res.status(200).send(twiml.toString());
    }
    const jobs = await findClass(classe.toLowerCase());
    if (!jobs.length) {
      twiml.message(
        "classe nao especificado corretamente, se quiser listar todas as classes digite +alljobs"
      );
      return res.status(200).send(twiml.toString());
    }

    try {
      const insert = await playerController.addorUpdatePlayersToDB(
        name,
        celphone,
        level,
        classe
      );
      twiml.message("adicionado com sucesso");
      return res.status(200).send(twiml.toString());
    } catch (err) {
      console.log("err", err);
      twiml.message(err);
      return res.status(200).send(twiml.toString());
    }
  }

  if (message.includes("+war")) {
    console.log(celphone);
    const player = await playerController.findPlayersByCelphone(celphone);
    if (!player.length) {
      twiml.message(
        "player nao cadastrado, utilizar o seguinte comando \n +update +name(Seu Player Nick entre parentesis) +level(Seu level entre parentesis) +classe(Sua classe aqui) \n \n para mais informacoes sobre os nomes utilizados das classes digite +alljobs"
      );
      return res.status(200).send(twiml.toString());
    }
    const weekday = moment().format("dddd");
    // if (weekday !== "Sunday" || weekday !== "Thursday") {
    //   twiml.message("hoje nao e dia de guerra");
    //   return res.status(200).send(twiml.toString());
    // }

    try {
      const attendancy = await warAtt.markAtendancy(player);
      twiml.message("Adicionado a guerra com sucesso");
      return res.status(200).send(twiml.toString());
    } catch (err) {
      console.log(err);
    }
  }

  if (message.includes("+att")) {
    const date = moment().format("YYYY-MM-DD");
    const att = await warAtt.getAtendancy(date);
    const doc = await googleApi.accessSheet();
    const sheet = doc.sheetsByIndex[0];
    console.log(sheet);
    // sheet.setName(date);
    await sheet.updateProperties({ title: date });
    const data = att[0].players.map((player) => [
      player.name,
      player.level,
      player.classe,
    ]);

    await sheet.clear();
    await sheet.setHeaderRow(["Name", "Level", "Classe"]);
    await sheet.addRows(data);

    twiml.message("Planilha atualizada");
    return res.status(200).send(twiml.toString());
  }
};

module.exports = { MessagingResponse, listener };
