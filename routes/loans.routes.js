const express = require('express');
const router = express.Router();

var db = require("../database/database.js");
const { error } = require('winston');

// Get all loans
router.get('/', (req, res) => {
    db.query('SELECT * FROM loans', (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Database query error' + err.message });
        } else {
            return res.status(200).json(result);
        }
    })
})

// Get a specific loan
router.get('/:id', (req, res) => {
    const lid = req.params.id;

    db.query('SELECT * FROM loans WHERE ID = ?', [lid], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Database query error' + err.message });
        } else {
            return res.status(200).json(result);
        }
    })
})

// New loan
router.post('/', (req, res) => {
    const {book_id, reader_id, loan_date, due_date, return_date} = req.body;

    if(!book_id || !reader_id) {
        return res.status(409).json({error: "There is no reader or book id like this!"})
    }

    if(loan_date > due_date){
        return res.status(409).json({error: "Loan date cant be after due date!"});
    }

    db.query(`INSERT INTO loans (book_id, reader_id, loan_date, due_date, return_date) VALUES (?,?,?,?,?)`, [book_id, reader_id, loan_date, due_date, return_date], (err, _result) => {
        if (err) {
            return res.status(500).json({ error: 'Database query error.' });
        }
        db.query('UPDATE books SET available=? WHERE ID =? ',[ 0, book_id], (err2, result2) => {
            return res.status(200).json({ message: 'Loan added successfully!'});
        })
    })
})

// Update loan
router.put('/:id', (req, res) => {
    const loanId = req.params.id;
    const {book_id, reader_id, loan_date, due_date, return_date} = req.body;

    db.query('SELECT * FROM loans WHERE ID = ?', [loanId], (error, result) => {
        if (error) {
            return res.status(500).json({ error: 'Database query error.' });
        }
        if (result.length == 0) {
            return res.status(400).json({ error: 'Loan with this ID doesn\'t exist!' });
        }

        db.query('UPDATE loans SET book_id=?, reader_id=?, loan_date=?, due_date=?, return_date=? WHERE ID=?', [book_id, reader_id, loan_date, due_date, return_date, loanId], (error2, _result2) => {
            if (error2) {
                return res.status(500).json({ error: 'Database query error.' });
            }
            return res.status(200).json({ message: 'Loan updated successfully!' });
        })
    })
})

// Delete loan
router.delete('/:id', (req, res) => {
    const loanId = req.params.id;

    if(!loanId){
        return res.status(400).json({error: 'This loan does not exists'});
    }

    db.query('DELETE FROM loans WHERE ID = ?', [loanId], (error, result) => {
        if (error) {
            return res.status(500).json({ error: 'Database query error.' });
        }
        return res.status(200).json({ message: 'Loan deleted successfully!' });
    })
})

// Return date 
router.patch('/:id/return', (req, res) => {
    const id = req.params.id;

    db.query('UPDATE loans SET return_date = CURRENT_TIMESTAMP WHERE ID = ?', [id], (error, _result) => {
        if (error) {
            return res.status(500).json({ error: 'Database query error.' });
        }

        db.query('UPDATE books SET available = ? WHERE ID = ?', [1, id], (error2, _result2) => {
            if (error2) {
                return res.status(500).json({ error: 'Database query error.' });
            }
            return res.status(200).json({ message: 'Return date updated successfully!' });
        })
    })
})

// Get loan by id
router.get('/:id/loan', (req, res) => {
    const id = req.params.id;

    db.query('SELECT * FROM loans WHERE ID = ?', [id], (error, result) => {
        if (error) {
            return res.status(500).json({ error: 'Database query error.' });
        }
        return res.status(200).json(result);
    })
})

// Get active loans
router.get('/active', (req, res) => {
    const id = req.params.id
    const {loan_date, due_date} = req.body;

    db.query('SELECT * FROM loans WHERE ID BETWEEN loan_date AND due_date', [id, loan_date, due_date], (error, result) => {
        if (error) {
            return res.status(500).json({ error: 'Database query error.' });
        }
        return res.status(200).json(result);
    })
})
module.exports = router;