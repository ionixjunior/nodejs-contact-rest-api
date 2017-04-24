var mongoose = require('mongoose');

var ContactModel = mongoose.model('contact', {
    name: String,
    email: String,
    is_active: Boolean
});

module.exports = ContactModel;