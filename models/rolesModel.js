const mongoose = require('mongoose')
const { Schema } = mongoose;

const rolesSchema = new Schema({
    role: String,
    permissions: [{ type: String }]
})

module.exports = mongoose.model('roles', rolesSchema);