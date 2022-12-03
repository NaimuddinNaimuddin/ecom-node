const express = require('express')
const cors = require('cors')
var bodyParser = require('body-parser')
const productController = require('./controllers/productController')
const userController = require('./controllers/userController')
const rolesController = require('./controllers/roleController')

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const db = require('./db')

app.get('/products', (req, res) => {
    const data = [
        {
            url: 'https://rukminim1.flixcart.com/image/300/300/l51d30w0/shoe/z/w/c/10-mrj1914-10-aadi-white-black-red-original-imagft9k9hydnfjp.jpeg?q=70',
            name: 'TRQ White Shoes',
            category: 'Shoes',
            seller: 'AMZ Seller Ghz',
            price: 1999
        },
        {
            url: 'https://5.imimg.com/data5/KC/PC/MY-38629861/dummy-chronograph-watch-500x500.jpg',
            name: 'LOREM Watch Black',
            category: 'Watches',
            seller: 'Watch Ltd Siyana',
            price: 2599
        },
        {
            url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQq39iB_cO6uhZ59vubrqVuYTJQH-4Qa0hU9g&usqp=CAU',
            name: 'AMZ Laptop 8GB RAM',
            category: 'Laptops',
            seller: 'Delhi Laptops',
            price: 50000
        },
        {
            url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfvoDzLqrT7GwU3z7Ccp0Cl9rV0ZnU9DcmEg&usqp=CAU',
            name: 'Security Camera',
            category: 'CCTV',
            seller: 'Camron LTD',
            price: 4000
        },
        {
            url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSG9e8Axt-h9q8EIybKfjGzbkIWJAr50_BX7Q&usqp=CAU',
            name: 'Watch Pink',
            category: 'Watches',
            seller: 'Watch Ltd',
            price: 2000
        },
        {
            url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9xzgtOpMxdpfgBOg3OKsEqYRkNBbuprJj4w&usqp=CAU',
            name: 'Cup red Color',
            category: 'Cup',
            seller: 'ABS Ltd',
            price: 100
        },
    ]
    res.send({ code: 200, message: 'Fetch products success.', data: data })
})

app.post('/add-product', productController.addProduct)
app.get('/get-products', productController.getProducts)
app.post('/edit-products', productController.editProduct)
app.get('/get-product/:id', productController.getProductById)
app.post('/delete-products', productController.deleteProducts)

app.post('/signup', userController.signUp)
app.post('/login', userController.login)
app.post('/add-to-cart', userController.addToCart)
app.post('/get-user-cart', userController.getCart)

app.post('/add-role' , rolesController.addRole)
app.post('/delete-role' , rolesController.deleteRole)

app.listen(3001, () => {
    console.log('Shopping backend Running...')
})
