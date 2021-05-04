const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

exports.generateTokenForUser = (userData) => {
    return jwt.sign({
        userId: userData.id,
        role: userData.role
    }, 
    process.env.SECRET_JWT,
    {
        expiresIn: '1h'
    })
}

exports.parseAuthorization = (authorization) => {
    return (authorization != null) ? authorization.replace('Bearer ', '') : null;
}

exports.getUserId = (authorization) => {
    let userId = -1;
    const token = exports.parseAuthorization(authorization);
    if(token != null) {
        
        try {
            const jwtToken = jwt.verify(token, process.env.SECRET_JWT);
            if(jwtToken != null)
                userId = jwtToken.userId;
        } catch (err) {}
    }
    return userId;
}