let products = [
  {id: 1, name: "Laptop", price: 999.99, inStock: true},
  {id: 2, name: "Smartphone", price: 499.99},
  {id: 3, name: "Headphones", price: 199.99}
]

const getAllProducts = (req, res) => {
  res.json(products)
}

const getProductById = (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) {
        return res.status(404).json({
            message: "Produkten hittades inte", error: "product_not_found"
        })
    }
    res.json(product)
}

const createProduct = (req, res) => {
    const newProduct = {id: products.length + 1, ...req.body}
    products.push(newProduct)
    res.status(201).json(newProduct)
}

const updateProduct = (req, res) => {
    // const product = products.find(p => p.id === parseInt(req.params.id))
    const index = products.findIndex(p => p.id === parseInt(req.params.id))
    if (index < 0)
        return res.status(404).json({ message: "Produkten hittades inte", error: "product_not_found" })
    const id = products[index].id
    const newProduct = {id: id, ...req.body}
    products.splice(index, 1, newProduct)

    res.status(200).json()
}

module.exports = {getAllProducts, getProductById, createProduct, updateProduct}