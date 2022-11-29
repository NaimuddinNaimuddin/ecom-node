const userModel = require("../models/userModel")
const jwt = require('jsonwebtoken');


module.exports.signUp = async (req, res) => {

    const name = req.body.name
    const password = req.body.password
    const url = req.body.url || 'https://i.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U'
    const type = req.body.type || 'USER'

    if (!name) {
        return res.send({ code: 400, message: 'Name Required.' })
    } else if (!password) {
        return res.send({ code: 400, message: 'Password Required.' })
    } else {
        //  logic here
        const newUser = await new userModel({ name, password, url, type, })
        const isSaved = await newUser.save()
        if (isSaved) {
            res.send({ code: 200, message: 'Saved' })
        } else {
            res.send({ code: 500, message: 'Server Err' })
        }

    }

}

module.exports.login = async (req, res) => {
    const name = req.body.name
    const password = req.body.password

    if (!name) {
        return res.send({ code: 400, message: 'Name Required.' })
    } else if (!password) {
        return res.send({ code: 400, message: 'Password Required.' })
    } else {
        // main logic

        const isNameExists = await userModel.findOne({ name: name })
        console.log(isNameExists, "42")
        if (isNameExists) {
            if (isNameExists.password == req.body.password) {
                const token = jwt.sign({
                    expAfter: Math.floor(Date.now() / 1000) + (60 * 60),
                    name: isNameExists.name,
                    password: isNameExists.password,
                    type: isNameExists.type
                }, 'MYKEY');
                return res.send({ code: 200, message: 'login success', token: token, userId: isNameExists._id })
            } else {
                return res.send({ code: 404, message: 'Password Wrong' })
            }
        } else {
            return res.send({ code: 404, message: 'Name Not Found' })
        }
    }
}

module.exports.addToCart = async (req, res) => {
    console.log(req.body, "62")

    const isUpdate = await userModel.updateOne({ _id: req.body.userId }, {
        $addToSet: { cart: req.body.productId }
    })

    if (isUpdate) {
        return res.send({ code: 200, message: 'Add to cart success.' })
    } else {
        return res.send({ code: 500, message: 'Server Err' })

    }

}


module.exports.getCart = async (req, res) => {
    const userId = req.body.userId

    const data = await userModel.findOne({ _id: userId }).populate('cart')

    if (data) {
        return res.send({ code: 200, message: 'Get cart success.', data: data })
    } else {
        return res.send({ code: 500, message: 'Server Err' })

    }
}