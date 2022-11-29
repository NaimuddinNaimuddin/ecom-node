const productModel = require('../models/productModel')

module.exports.addProduct = async (req, res) => {

    console.log(req.body, "5")

    const newProduct = new productModel(req.body)
    const isSaved = await newProduct.save()
    if (isSaved) {
        res.send('saved')
    } else {
        res.send('fail to save')
    }

}

module.exports.getProducts = async (req, res) => {
    const data = await productModel.find({})
    if (data.length > 0) {
        res.send({ code: 200, message: 'Find Success', data: data })
    } else if (data.length == 0) {
        res.send({ code: 404, message: 'Data not found' })
    } else {
        res.send({ code: 500, message: 'Server Err.' })
    }

}


module.exports.editProduct = async (req, res) => {
    console.log(req.body, 31)

    let newData = {}

    if (req.body.name) {
        newData["name"] = req.body.name
    }
    if (req.body.url) {
        newData["url"] = req.body.url
    }
    if (req.body.category) {
        newData["category"] = req.body.category
    }
    if (req.body.price) {
        newData["price"] = req.body.price
    }
    if (req.body.seller) {
        newData["seller"] = req.body.seller
    }

    const id = req.body.id
    let filter = { _id: id }

    let doc = await productModel.findOneAndUpdate(filter, newData, { new: true });
    if (doc) {
        res.send({ code: 200, message: 'edit success', data: doc })
    } else {
        res.send({ code: 500, message: 'Server Err.' })
    }
}

module.exports.getProductById = async (req, res) => {
    let data = await productModel.findById(req.params.id)
    if (data) {
        res.send({ code: 200, message: 'fetch by id success', data: data })
    } else {
        res.send({ code: 500, message: 'Server Err.' })
    }
}

module.exports.deleteProducts = async (req, res) => {

    console.log(req.body, "73")
    const ids = req.body
    const response = await productModel.deleteMany({ _id: { $in: ids } })
    if (response) {
        res.send({ code: 200, message: 'delete success', data: response })
    } else {
        res.send({ code: 500, message: 'Server Err.' })
    }
}