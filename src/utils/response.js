exports.success = (message, data, statusCode) => {
    return {
        message: message,
        error: false,
        code: statusCode,
        data
    }
}

exports.error = (message, statusCode) => {
    return {
        message: message,
        error: true,
        code: statusCode,
    }
}

exports.validation = (token, statusCode) => {
    return {
        error: false,
        code: statusCode,
        token: token
    }
}