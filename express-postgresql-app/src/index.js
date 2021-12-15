const appPort = process.env.PORT || 3000;
const dbServer = process.env.DB_SERVER || "**********.postgres.database.azure.com";
const dbServerPort = process.env.DB_SERVER_PORT || 5432;
const dbName = process.env.DB_NAME || "**********";
const dbLogin = process.env.DB_LOGIN || "**********";
const dbPassword = process.env.DB_PASSWORD || "**********";

const express = require('express');
const app = express();

app.use(express.json());
app.listen(appPort, () => console.log(`Sample app is listening on port ${appPort}!`));

app.get('/', async (req, res) => {
  try {
     res.send(`postgres://${dbLogin}%40${dbServer}:${dbPassword}@${dbServer}:${dbServerPort}/${dbName}`);
   } catch(error) {
     console.error(error);
   }});

/*
const Sequelize = require('sequelize');
const sequelize = new Sequelize(`postgres://${dbLogin}%40${dbServer}:${dbPassword}@${dbServer}:${dbServerPort}/${dbName}`);

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const Inventory = sequelize.define('inventory', {
    id: { type: Sequelize.INTEGER, allowNull: false, primaryKey: true },
    name: { type: Sequelize.STRING, allowNull: false },
    quantity: { type: Sequelize.INTEGER },
    date: { type: Sequelize.DATEONLY, defaultValue: Sequelize.NOW }
  },  {
    freezeTableName: true,
    timestamps: false
  });

const express = require('express');
const app = express();

app.use(express.json());
app.listen(appPort, () => console.log(`Sample app is listening on port ${appPort}!`));

app.post('/inventory', async (req, res) => {
  try {
    const newItem = new Inventory(req.body);
    await newItem.save();
    res.json({ inventory: newItem })
  } catch(error) {
    console.error(error);
  }});

app.get('/inventory/:id', async (req, res) => {
   const id = req.params.id
   try {
      const inventory = await Inventory.findAll( { attributes: ['id', 'name', 'quantity', 'date'], where: { id: id }});
      res.json({ inventory });
    } catch(error) {
      console.error(error);
    }});*/
