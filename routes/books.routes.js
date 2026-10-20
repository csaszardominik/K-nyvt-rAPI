const express = require('express');
const router = express.Router();

var db = require("../database/database.js");
const { error } = require('winston');

// Get all books
router.get('/', (req, res) => {
    db.query('SELECT * FROM books', (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Database query error' + err.message });
        } else {
            return res.status(200).json(result);
        }
    })
})

// Get a specific book
router.get('/:id', (req, res) => {
    const bid = req.params.id;

    db.query('SELECT * FROM books WHERE ID = ?', [bid], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Database query error' + err.message });
        } else {
            return res.status(200).json(result);
        }
    })
})

// New book
router.post('/', (req, res) => {
    const {title, author, category, publish_year, available} = req.body;

    if(!title || !author || !category || !publish_year || !available){
        return res.status(400).json({error: 'Missing fields requied!'});
    }

    db.query(`INSERT INTO books (title, author, category, publish_year, available) VALUES (?,?,?,?,?)`, [title, author, category, publish_year, available], (err, _result) => {
        if (err) {
            return res.status(500).json({ error: 'Database query error.' });
        }
        return res.status(200).json({ message: 'Book added successfully!'});
    })
})

// Update book
router.put('/:id', (req, res) => {
    const bookId = req.params.id;
    const {title, author, category, publish_year, available} = req.body;

    if(!title || !author || !category || !publish_year || !available){
        return res.status(400).json({error: 'Missing fields requied!'});
    }
    db.query('SELECT * FROM books WHERE ID = ?', [bookId], (error, result) => {
        if (error) {
            return res.status(500).json({ error: 'Database query error.' });
        }
        if (result.length == 0) {
            return res.status(400).json({ error: 'Book with this ID doesn\'t exist!' });
        }

        db.query('UPDATE books SET title=?, author=?, category=?, publish_year=?, available=? WHERE ID=?', [title, author, category, publish_year, available, bookId], (error2, _result2) => {
            if (error2) {
                return res.status(500).json({ error: 'Database query error.' });
            }
            return res.status(200).json({ message: 'Book updated successfully!' });
        })
    })
})

// Delete book
router.delete('/:id', (req, res) => {
    const bookId = req.params.id;

    db.query('DELETE FROM books WHERE ID = ?', [bookId], (error, result) => {
        if (error) {
            return res.status(500).json({ error: 'Database query error.' });
        }
        return res.status(200).json({ message: 'Book deleted successfully!' });
    })
})

module.exports = router;