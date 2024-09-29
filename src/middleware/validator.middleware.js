import { validationResult } from "express-validator";

export const validate = (validations) => async (req, res, next) => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const error = errors.array().map(err => {
            return {
                message: err.msg,
                field: err.path
            }
        })

        return res.status(400).json({
            success: false,
            error
        });
    }

    next();
};
