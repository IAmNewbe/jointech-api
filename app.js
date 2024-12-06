const { authenticateUser } = require('./services/AuthService');
const { fetchAllDevices } = require('./services/DeviceService');

async function runApp() {
    try {
        let authResponse = await authenticateUser();

        // Retry login if account is expired
        if (authResponse.Result == 106) {
            console.log('Account expired. Re-authenticating...');
            authResponse = await authenticateUser();
        }

        if (authResponse.Result == 200) {
            const allDevices = await fetchAllDevices();
            console.log('Fetched all devices:', allDevices);
        } else {
            console.error('Authentication failed with statuscode:', authResponse.statuscode);
        }
    } catch (error) {
        console.error('Application error:', error.message);
    }
}

module.exports = { runApp };