module.exports = (statusCode, statusMessage) => {
    return `{"status":${statusCode}, "message": ${statusMessage}}`
}