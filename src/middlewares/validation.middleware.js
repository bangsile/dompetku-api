export const validate = (schema) => (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
        const errors = {};

        result.error.issues.forEach((issue) => {
            const field = issue.path[0] || "body";
            errors[field] = issue.message;
        });

        return res.status(400).json({
            message: "Validasi gagal",
            errors,
        });
    }

    req.body = result.data;

    next();
};
