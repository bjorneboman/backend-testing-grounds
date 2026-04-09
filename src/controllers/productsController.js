let products = [
  { id: 1, name: 'Tangentbord', price: 899, category: 'tillbehör', inStock: true },
  { id: 2, name: 'Mus', price: 299, category: 'tillbehör', inStock: true },
  { id: 3, name: 'Skärm 27 tum', price: 3499, category: 'skärmar', inStock: false },
  { id: 4, name: 'Headset', price: 1299, category: 'tillbehör', inStock: true },
  { id: 5, name: 'Webcam', price: 599, category: 'tillbehör', inStock: false },
  { id: 6, name: 'Skärm 32 tum', price: 4999, category: 'skärmar', inStock: true },
  { id: 7, name: 'Mikrofon', price: 1899, category: 'ljud', inStock: true },
  { id: 8, name: 'Högtalare', price: 1499, category: 'ljud', inStock: true },
  { id: 9, name: 'USB-hub', price: 399, category: 'tillbehör', inStock: true },
  { id: 10, name: 'Laptopställ', price: 699, category: 'tillbehör', inStock: false },
  { id: 11, name: 'Skärm 24 tum', price: 2499, category: 'skärmar', inStock: true },
  { id: 12, name: 'Hörlurar', price: 999, category: 'ljud', inStock: true },
]

const getAllProducts = (req, res) => {
    const { category, inStock, sort, order, page, limit } = req.query

    let results = [...products]

    // 1. Filtrering
    if(category) {
        results = results.filter(p => p.category === category)
    }
    if (inStock !== undefined) {
        const wantInStock = req.query.inStock === "true"
        results = results.filter(p => p.inStock === wantInStock)
    }

    // 2. Sortering
    if (sort) {
        const direction = order === "desc" ? -1 : 1
        results.sort((a, b) => {
            if (a[sort] < b[sort]) return -1 * direction
            if (a[sort] > b[sort]) return 1 * direction
            return 0
        })
    }

    // 3. Pagination
    const total = results.length
    const pageNum = parseInt(page) || 1
    const limitNum = parseInt(limit) || 5
    const totalPages = Math.ceil(total / limitNum)
    const startIndex = (pageNum - 1) * limitNum
    const endIndex = startIndex + limitNum

    const pageData = results.slice(startIndex, endIndex)

    res.json({
        data: pageData, 
        meta: {
            page: pageNum,
            limit: limitNum,
            total,
            totalPages,
        },
    })
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
    const index = products.findIndex(p => p.id === parseInt(req.params.id))
    if (index < 0)
        return res.status(404).json({ message: "Produkten hittades inte", error: "product_not_found" })
    const id = products[index].id
    const newProduct = {id: id, ...req.body}
    products.splice(index, 1, newProduct)

    res.status(200).json()
}

module.exports = {getAllProducts, getProductById, createProduct, updateProduct}