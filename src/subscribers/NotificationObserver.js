class NotificationObserver {
    update(data) {
        console.log(`NotificationObserver: Sending notification for resource - ${data.name}`);
    }
}

module.exports = NotificationObserver;
