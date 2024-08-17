const jwt = require('jsonwebtoken');

const verifyJwt = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if(!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({message: 'Unauthorize'});
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, data) => {
            if(err) return res.status(403).json({message: 'Forbidden'});
            req.username = data.userinfo.username;
            req.role = data.userinfo.role;
            next();
        }
    )

}

module.exports = verifyJwt;