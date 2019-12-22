module.exports = (req) => {
    return new Promise((resolve, reject) => {
        try {
            req.on('error', error => {throw error})
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });

            req.on('end', () => {
                resolve(JSON.parse(body));
            });
        }
        catch (e) {
            reject(e);
        }
    })
}