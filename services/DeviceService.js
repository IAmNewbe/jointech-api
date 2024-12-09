const axios = require('axios');
const querystring = require('querystring');
const { getToken } = require('./AuthService');

async function fetchAllDevices() {
    const url = 'https://icloud.assetscontrols.com:3443/OpenApi/Admin';
    const token = getToken();
    
    if (!token) {
        throw new Error('No valid token found. Please authenticate first.');
    }

    const data = {
        FAction: 'QueryAdminAssetList',
        FTokenID: token,
    };

    const headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) ' +
                      'Chrome/45.0.2454.85 Safari/537.36 115Browser/6.0.3',
        'Connection': 'keep-alive',
        'Accept': '*/*',
        // 'Content-Type': 'application/json',
    };

    try {
        const response = await axios.post(url, querystring.stringify(data), { headers });
        console.log('API Full Response:', response.data);

        if (response.data.Result === 200 && Array.isArray(response.data.FObject)) {
            if (response.data.FObject.length === 0) {
                console.warn('No devices found in the response.');
            }
            return response.data.FObject;
        } else {
            console.error('Failed to fetch devices:', response.data.Message || 'Unknown error');
            throw new Error(response.data.Message || 'Failed to fetch devices');
        }
    } catch (error) {
        console.error('Error fetching devices:', error.message);
        throw error;
    }
}

async function getSingleDevice(){
    const url = 'https://icloud.assetscontrols.com:3443/OpenApi/Admin'
    const token = getToken();
    
    if (!token) {
        throw new Error('No valid token found. Please authenticate first.');
    }

    const data = {
        FAction: 'QueryAdminAssetByAssetId',
        FTokenID: token,
        FAssetID: '837303000034'
    };

    const headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) ' +
                      'Chrome/45.0.2454.85 Safari/537.36 115Browser/6.0.3',
        'Connection': 'keep-alive',
        'Accept': '*/*',
        'Content-Type': 'application/x-www-form-urlencoded',
    };

    try {
        const response = await axios.post(url, querystring.stringify(data), { headers });
        console.log('API Full Response:', response.data);

        if (response.data.Result === 200 && Array.isArray(response.data.FObject)) {
            if (response.data.FObject.length === 0) {
                console.warn('No devices found in the response.');
            }
            return response.data.FObject;
        } else {
            console.error('Failed to fetch devices:', response.data.Message || 'Unknown error');
            throw new Error(response.data.Message || 'Failed to fetch devices');
        }
    } catch (error) {
        console.error('Error fetching devices:', error.message);
        throw error;
    }
}

module.exports = { fetchAllDevices, getSingleDevice };
