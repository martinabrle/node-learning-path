const express = require("express");
const app = express();
/*eslint node/no-process-env: "off"*/
const port = process.env.PORT || 3000;

function isAuthorized(req,res, next) {
    const auth = req.headers.authorization;
    if (auth === "supersecret") {
        next();
    } else {
        res.status(401);
        res.send("Not permitted!");
    }
}
app.get('/', (req, res) => res.send('Hello world!!!'));

app.get('/users', isAuthorized, (req,res) => {
    res.json([{
      id: 1,
      name: 'User Userson'
    }])
  });
  
app.get("/products", (req,res) => {
    const products = [
    {
      id: 1,
      name: "hammer",
    },
    {
      id: 2,
      name: "screwdriver",
    },
    {
      id: 3,
      name: "wrench",
    }
   ];
  
   res.json(products);
  });

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
