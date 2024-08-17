const jwt = require('jsonwebtoken');

const setToken = async (res, user) => {
    const accesToken = jwt.sign(
        {
            "userinfo": {
                "username": user.username,
                "role": user.role,
                "id": user.id
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '15m' }
    )

    const refreshToken = jwt.sign(
        { "username": user.username },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '7d' }
    )

    res.cookie('jwt', refreshToken, {
        httpOnly: true,
        sameSite: 'Strict',
        maxAge: 24 * 60 * 60 * 1000
    })

    res.json({ accesToken, message: "Access granted", userID: user.id });
}

module.exports = {
    setToken
}