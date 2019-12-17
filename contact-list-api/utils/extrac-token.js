
module.exports = (req) => {
    const { headers: { authorization } } = req;

    authorization && ([, token] = authorization.split(' '));

    if (!token) throw new Error('no token provided')

    return token
}