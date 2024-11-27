class DatabaseObserver {
    constructor(db) {
        this.db = db;
    }

    update(data) {
        this.db.run(
            "INSERT INTO resources (name, createdAt) VALUES (?, ?)",
            [data.name, data.createdAt],
            (err) => {
                if (err) {
                    console.error('DatabaseObserver: Error saving to database:', err.message);
                } else {
                    console.log('DatabaseObserver: Resource saved to database.');
                }
            }
        );
    }
}

module.exports = DatabaseObserver;
