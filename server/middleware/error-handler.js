const errorHandlerMiddleware = async (err, req, res, next) => {
    console.log(err)
    return res.status(500).json({msg: 'Somethinng went wrong, please try again later'})
}

module.exports = errorHandlerMiddleware