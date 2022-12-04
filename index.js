const express = require('express')
const cors = require('cors')
var bodyParser = require('body-parser')
const productController = require('./controllers/productController')
const userController = require('./controllers/userController')
const rolesController = require('./controllers/roleController')

const auth = require('./middleware/auth')

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const db = require('./db')



app.post('/add-product', auth.checkToken, productController.addProduct)
app.get('/get-products', auth.checkToken, productController.getProducts)
app.post('/edit-products', auth.checkToken, productController.editProduct)
app.get('/get-product/:id', auth.checkToken, productController.getProductById)
app.post('/delete-products', auth.checkToken, productController.deleteProducts)

app.post('/signup', userController.signUp)
app.post('/login', userController.login)
app.post('/add-to-cart', auth.checkToken, userController.addToCart)
app.post('/get-user-cart', auth.checkToken, userController.getCart)

app.post('/add-role', auth.checkToken, rolesController.addRole)
app.post('/delete-role', auth.checkToken, rolesController.deleteRole)

app.listen(3001, () => {
    console.log('Shopping backend Running...')
})
