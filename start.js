const app = require('./server');
const sequelizeConnection = require('./server/db/models').sequelize;

sequelizeConnection
.authenticate()
.then(sequelizeConnection.sync())
.then(() => {
  // prevent our express server and test server from trying to access the same port at the same time
  if (!module.parent) {
    const listener = app.listen(process.env.PORT || 4000, () =>
      console.log(`Listening on port ${listener.address().port}`)
    );
  }
})
.catch((err) => console.log('Unable to connect to the database:', err));
