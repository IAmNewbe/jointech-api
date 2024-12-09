const axios = require('axios');
require('dotenv').config();

/**
 * Send data to the Antares platform.
 * 
 * @param {string} url - The Antares API endpoint.
 * @param {string} accessKey - The Antares access key for authentication.
 * @param {object} data - The data to be sent in the body.
 * 
 * @returns {Promise<object>} - The API response.
 */
async function sendToAntares(url, accessKey, data) {
    const headers = {
        'X-M2M-Origin': accessKey, // Antares access key
        'Content-Type': 'application/json;ty=4',
        'Accept': 'application/json',
    };

    const body = {
        "m2m:cin": {
            "con": JSON.stringify(data), // Serialize the data object to a JSON string
        }
    };

    try {
        const response = await axios.post(url, body, { headers });
        console.log('API Response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error sending data to Antares:', error.response?.data || error.message);
        throw error;
    }
}

module.exports = { sendToAntares };