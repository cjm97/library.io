"use strict";
const Users = require("./users"); //require the model


async function init() {
  await Users.sync(); //sync the model
 
}

init();
module.exports = {
  Users, //export the model
};
