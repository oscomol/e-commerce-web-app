const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dbconn = require("../config/dbcon");
const { setToken } = require('./common/respondToken');

const login = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ message: 'Please provide a valid username and password' });

    const userQuery = "SELECT * FROM tbl_user WHERE username=?";

    try {
        await dbconn.query(userQuery, [username], async (err, result) => {
            if (err) return res.status(500).json({ msg: "Server error while logging in" });
            if (result?.length) {
                const user = result[0];
                if (user.isBlock) {
                    const match = await bcrypt.compare(password, user.password);
                    if (match) {
                        setToken(res, user);
                    } else {
                        res.status(401).json({ msg: "Incorrect password" });
                    }
                } else {
                    res.status(401).json({ msg: "You are now allowed to login for now!" });
                }
            } else {
                res.status(401).json({ msg: "Username not found" });
            }
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: "Server error while logging in" });
    }
}

const refresh = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.status(400).json({ message: 'Sorry, you cannot extend you session' });

    const refreshToken = cookies.jwt;

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        async (err, data) => {
            if (err) return res.status(401).json({ message: err.message });
            const userQuery = "SELECT * FROM tbl_user WHERE username=?";
            await dbconn.query(userQuery, [data.username], (err, result) => {
                if (err) {
                    return res.status(401).json({ message: 'Sorry, you cannot extend your session' });
                } else {
                    const user = result[0];
                    const accesToken = jwt.sign(
                        {
                            "userinfo": {
                                "username": user.username,
                                "role": user.role,
                                "id": user.id
                            }
                        },
                        process.env.ACCESS_TOKEN_SECRET,
                        { expiresIn: '7d' }
                    )
                    res.json({ accesToken })
                }
            });
        }
    )

}

const logout = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.status(204).json({ message: 'No cookies named test' });
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'Strict' })
    res.status(200).json({ message: "logout" });
    res.end();
}

module.exports = {
    login,
    refresh,
    logout
}