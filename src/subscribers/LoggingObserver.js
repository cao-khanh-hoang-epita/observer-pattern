class LoggingObserver {
    update(data) {
        console.log(`LoggingObserver: Received update - ${JSON.stringify(data)}`);
    }
}

module.exports = LoggingObserver;
