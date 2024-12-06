const axios = require('axios');
const querystring = require('querystring');
require('dotenv').config();
const crypto = require('crypto');

/**
 * Hashes a password using MD5.
 * @param {string} password - The plain text password.
 * @returns {string} The MD5 hash of the password.
 */
function md5sum(password) {
    return crypto.createHash('md5').update(password, 'utf-8').digest('hex');
}

let token = null;

async function authenticateUser() {
    const url = `${process.env.BASEURLHTTPS}:${process.env.BASEURLPORTHTTPS}/OpenApi/login`;
    const password = process.env.APP_PASSWORD;
    const hashedPassword = md5sum(password);
    const data = {
        FUserName: `${process.env.APP_USERNAME}`,
        FPassword: hashedPassword,
    };

    // HTTP headers
    const headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) ' +
                      'Chrome/45.0.2454.85 Safari/537.36 115Browser/6.0.3',
        'Connection': 'keep-alive',
        'Content-Type': 'application/x-www-form-urlencoded',
    };

    try {
        // Make the POST request
        const response = await axios.post(url, querystring.stringify(data), { headers });
        
        // Handle the response
        console.log('Response:', response.data);
        // console.log(response.data.FObject[0].FTokenID)
        token = response.data.FObject[0].FTokenID;
        return response.data;
    } catch (error) {
        // Handle errors
        console.error('Error during authentication:', error.message);
        throw error;
    }
}

module.exports = { authenticateUser, getToken: () => token };
