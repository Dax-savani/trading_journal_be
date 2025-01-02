const handleError = (error, res) => {
    console.error(error);
    res.status(500).json({
        message: 'An error occurred',
        error: error.message,
    });
};

module.exports = handleError;