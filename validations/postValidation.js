import Joi from 'joi';

export const postValidator = (data) => {
    const schema = Joi.object({
        title: Joi.string().required(),
        body: Joi.string().required(),
        userName: Joi.string().required(),
        userTitle: Joi.string().required(),
    });
    return schema.validate(data);
};

export const commentValidator = (data) => {
    const schema = Joi.object({
        postId: Joi.string().required(),
        userId: Joi.string().required(),
        text: Joi.string().required(),
        userName: Joi.string().required(),
        userTitle: Joi.string().required(),
    });
    return schema.validate(data);
};