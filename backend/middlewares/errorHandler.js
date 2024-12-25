const errorHandler = (err, req, res, next) => {
    // Determine status code and default message
    const statusCode = err.status || 500;
    const message = err.message || 'Internal Server Error';

    // Log the error
    console.error(`[Error] Status: ${statusCode}, Message: ${message}, Stack: ${err.stack}`);

    // Send error response
    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
        // Include stack trace only in non-production environments
        stack: process.env.NODE_ENV === 'production' ? undefined : err.stack,
    });
};

module.exports = errorHandler;
