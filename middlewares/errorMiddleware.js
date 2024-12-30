export default (err, req, res, next) => {
    const statusCode = res.statusCode < 400 ? 500 : res.statusCode;

    res.status(statusCode).json({
        message: err.message || "Internal Server Error",
        stack: process.env.NODE_ENV === "production" ? null : err.stack
    });
};
