const ROOMS = ["sala1", "sala2", "sala3"];

const sendGetAllPlayersInsideTheRoom = (socket, room) => {
  socket.emit(`getPlayers${room}Name`);

  socket.on(`getPlayersRoomName`);
};

const getAllPlayersInsideTheRoom = () => {};

module.exports = {};
