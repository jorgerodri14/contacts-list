
module.exports.error = (res, error, statusCode) => {
    addHeaders(res);

    res.statusCode = statusCode;

    res.end(JSON.stringify({
        status: statusCode,
        error
    }, null, 3));
};

module.exports.success = (res, data) => {
    addHeaders(res);

    res.statusCode = 200;

    res.end(JSON.stringify({
        status: 'OK',
        data
    }, null, 3));
};

const addHeaders = (res) => {
    return res.setHeader('Content-Type', 'application/json');
}