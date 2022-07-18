var knexlib = require('knex');
const connections = knexlib({
  "client":"mysql",
  "connection":{
    "host": '127.0.0.1',
    "user": 'root',
    "database" : 'simpledatabase',
  },
  "debug":true,
});

/* connections.raw("SELECT 1").then(() => {
  console.log("MySQL connected");
})
.catch((e) => {
  console.log("MySQL not connected");
  console.error(e);
}); */

module.exports = {
  connections,
};