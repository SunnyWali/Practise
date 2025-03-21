const Joi = require("joi");

module.exports.listingSchema=Joi.Object({
    listing:Joi.Object({
        title:Joi.string().required(),
        description:Joi.string().required(),
        image:Joi.string().allow("",null),
        price:Joi.number().required().min(0),
        
    }).required(),
})
