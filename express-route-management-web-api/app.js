const express = require("express");
const app = express();

let bodyParser = require('body-parser');
app.use(bodyParser.json({ extended: false }));

const port = 3000;

let products = [
    {
      id: 1,
      name: "Ivanhoe",
      author: "Sir Walter Scott",
    },
    {
      id: 2,
      name: "Colour Magic",
      author: "Terry Pratchett",
    },
    {
      id: 3,
      name: "The Bluest eye",
      author: "Toni Morrison",
    },
    ];

app.get('/', (req, res) => {
    res.send('Hello API!!!!');
});

app.get('/products/:id', (req, res) => {
    res.json(products.find(p => p.id == +req.params.id))
});

app.get('/products', (req, res) => {
    const page = +req.query.page;
    const pageSize = +req.query.pageSize;

    if (page && pageSize) {
        const start = (page - 1) * pageSize;
        const end = start + pageSize;
        res.json(products.slice(start, end));
    } else {
        res.json(products);
    }
});

app.delete('/products/:id', (req, res) => {
    const deletedProduct = products.find(p => p.id === +req.params.id);
    products = products.filter(p => p.id !== +req.params.id);
    res.json(deletedProduct);
});

app.delete('/products', (req, res) => {
    const deletedProduct = products.find(p => p.id === +req.body.id);
    products = products.filter(p => p.id !== +req.body.id);
    res.json(deletedProduct);
});

app.post('/products', (req, res) => {
    const newProduct = { ...req.body, id: products.length + 1 };
    products = [...products, newProduct];
    res.json(newProduct);
});

app.put('/products', (req, res) => {
    let updatedProduct;
    products = products.map(p => {
        if (p.id === req.body.id) {
            updatedProduct = { ...p, ...req.body };
            return updatedProduct;
        }
        return p;
    });
    res.json(updatedProduct);
});

/*
//nicer way to do it, just did not work for me probably due to a typo
app.route('/products')
    .get((req, res) => {
        res.json(products);
    })
    .post((req, res) => {
        const newProduct = { ...req.body, id: products.length + 1 };
        products = [...products, newProduct];
        res.json(newProduct);
    })
    .put((req, res) => {
        let updatedProduct;
        products = products.map(p => {
            if (p.id === req.body.id) {
                updatedProduct = { ...p, ...req.body };
                return updatedProduct;
            }
            return p;
        });
        res.json(updatedProduct);
    })
    .delete((req, res) => {
        const deletedProduct = products.find(p => p.id === +req.body.id);
        products = products.filter(p => p.id !== +req.body.id);
        res.json(deletedProduct);
    });*/

app.listen(port, () => console.log(`Example API running on port ${port}`));


    