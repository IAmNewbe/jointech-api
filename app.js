const { sendToAntares } = require('./services/AntaresService');
const { authenticateUser } = require('./services/AuthService');
const { fetchAllDevices, getSingleDevice } = require('./services/DeviceService');
require('dotenv').config();

const url = process.env.ANTARES_URL;
const accessKey = process.env.ACCESS_KEY;

async function runApp() {
    try {
        let authResponse = await authenticateUser();

        // Retry login if account is expired
        if (authResponse.Result == 106) {
            console.log('Account expired. Re-authenticating...');
            authResponse = await authenticateUser();
        }

        if (authResponse.Result == 200) {
            // const allDevices = await fetchAllDevices();
            const SingleDevice = await getSingleDevice();
            sendToAntares(url, accessKey, SingleDevice[0]);
            // console.log('Fetched all devices:', SingleDevice);
        } else {
            console.error('Authentication failed with statuscode:', authResponse.statuscode);
        }
    } catch (error) {
        console.error('Application error:', error.message);
    }
}

module.exports = { runApp };