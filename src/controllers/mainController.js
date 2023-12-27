const fs = require("fs");
const path = require("path");

const productsFilePath = path.join(__dirname, "../data/productsDataBase.json"); //traemos el json
const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8")); // parceamos el json

const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
  index: (req, res) => {
    return res.render("index", {
      productsVisited: products.filter(
        (product) => product.category === "visited"
      ),
      productsInsale: products.filter(
        (product) => product.category === "in-sale"
      ),
      toThousand,
    });
  },
  search: (req, res) => {
    const { keywords } = req.query;
    return res.render("results", {
      products: products.filter((product) =>
        product.name.toLowerCase().includes(keywords.toLowerCase())
      ),
      keywords,
      toThousand,
    });
  },
};

module.exports = controller;
