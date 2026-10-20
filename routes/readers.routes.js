const express = require('express');
const router = express.Router();

var db = require("../database/database.js");
const { error } = require('winston');

// Get all readers
router.get('/', (req, res) => {
    db.query('SELECT * FROM readers', (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Database query error' + err.message });
        } else {
            return res.status(200).json(result);
        }
    })
})

// Get a specific reader
router.get('/:id', (req, res) => {
    const rid = req.params.id;

    db.query('SELECT * FROM readers WHERE ID = ?', [rid], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Database query error' + err.message });
        } else {
            return res.status(200).json(result);
        }
    })
})


// Add new reader
router.post('/', (req, res) => {
    const {name, email, phone, registered_at} = req.body;

    if(!name || !email){
        return res.status(409).json({error: "Missing requied fields!"});
    }

    db.query('SELECT * FROM readers WHERE email = ?', [email], (error, result1) => {
        if(result1.length > 0) {
            return res.status(409).json({error: "E-mail already in use"});
        }
        db.query(`INSERT INTO readers (name, email, phone, registered_at) VALUES (?,?,?,?)`, [name, email, phone, registered_at], (err, _result) => {
            if (err) {
                return res.status(500).json({ error: 'Database query error.' });
            }
            return res.status(200).json({ message: 'Reader added successfully!'});
        })
    })
})
// Update reader
router.put('/:id', (req, res) => {
    const readerId = req.params.id;
    const {name, email, phone, registered_at} = req.body;

    if(!name || !email){
        return res.status(409).json({error: "Missing requied fields!"});
    }

    db.query('SELECT * FROM readers WHERE email = ?', [email], (error, result1) => {
        if(result1.length > 0) {
            return res.status(409).json({error: "E-mail already in use"});
        }
        
        db.query('SELECT * FROM readers WHERE ID = ?', [readerId], (error, result) => {
            if (error) {
                return res.status(500).json({ error: 'Database query error.' });
            }
            if (result.length == 0) {
                return res.status(400).json({ error: 'Reader with this ID doesn\'t exist!' });
            }

            db.query('UPDATE readers SET name=?, email=?, phone=?, registered_at=? WHERE ID=?', [name, email, phone, registered_at, readerId], (error2, _result2) => {
                if (error2) {
                    return res.status(500).json({ error: 'Database query error.' });
                }
                return res.status(200).json({ message: 'Reader updated successfully!' });
            })
        })
     })
})
// Delete reader
router.delete('/:id', (req, res) => {
    const readerid = req.params.id;

    db.query('DELETE FROM readers WHERE ID = ?', [readerid], (error, result) => {
        if (error) {
            return res.status(500).json({ error: 'Database query error.' });
        }
        return res.status(200).json({ message: 'Reader deleted successfully!' });
    })
})

module.exports = router;