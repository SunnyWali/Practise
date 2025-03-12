const joi=require("joi");
module.exports.listingSchema=joi.object({
    listing:joi.object({
        title:joi.string().required(),
        description:joi.string().required(),
        image:joi.string.allow("",null),
        
    }).required()
})