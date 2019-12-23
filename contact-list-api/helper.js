
module.exports.error = (res, error, statusCode) => {

    res.statusCode = statusCode;

    res.end(JSON.stringify({
        status: statusCode,
        error
    }));
};

module.exports.success = (res, data) => {

    res.statusCode = 200;

    res.end(JSON.stringify({
        status: "OK",
        data
    }));
};