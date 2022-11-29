
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/test-db', (err) => {
    if (!err) {
        console.log('DB Connected.')
    }
})