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
