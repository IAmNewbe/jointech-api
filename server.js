const { runApp } = require('./app');

(async () => {
    try {
        console.log('Starting application...');
        await runApp();
    } catch (error) {
        console.error('Failed to start application:', error.message);
    }
})();
