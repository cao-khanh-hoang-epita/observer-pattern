const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
const Subject = require('./Subject');
const LoggingObserver = require('./subscribers/LoggingObserver');
const NotificationObserver = require('./subscribers/NotificationObserver');
const DatabaseObserver = require('./subscribers/DatabaseObserver');

// Initialize app and subject
const app = express();
const subject = new Subject();

// Middleware
app.use(bodyParser.json());

// Register observers
subject.addObserver(new LoggingObserver());
subject.addObserver(new NotificationObserver());
subject.addObserver(new DatabaseObserver(db));

// POST / - Create a resource and notify observers
app.post('/', (req, res) => {
    const { name, createdAt } = req.body;
    if (!name || !createdAt) {
        return res.status(400).json({ error: 'Invalid input. Provide name and createdAt.' });
    }

    const data = { name, createdAt };
    subject.notifyObservers(data);

    res.status(201).json({ message: 'Resource created', data });
});

// GET / - Retrieve all resources
app.get('/', (req, res) => {
    db.all("SELECT * FROM resources", [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ data: rows });
    });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
