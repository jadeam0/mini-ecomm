const db = require('../config')
const { hash, compare, hashSync } = require('bcrypt');
const { createToken } = require('../middleware/authenticateUser');

class Users {
    fetchUsers(req, res) {
        const query = `
        SELECT userID, firstName, lastName, gender, userDOB, emailAdd, FROM users;
        `

        db.query(query, (err, results) => {
            if (err) {
                console.log(err)
            }
            res.json({
                status: res.statusCode,
                results
            });
        });
    };

    fetchUsers(req, res) {
        const query = `
        SELECT userID, firstName, lastName, gender, userDOB, emailAdd
        FROM users
        WHERE userID = ${ req.params.id };
        `

        db.query(query, (err, result) => {
            if (err) {
                console.log(err)
            }
            res.json({
                status: res.statusCode,
                result   // Use result instead of results (because were fetching one item not more then one)
            });
        });
    };

    login(req, res) {
    }

    async register(req, res) {
        const data = req.body;

        // Encrypt password
        data.userPW = await hash(data.userPW, 15);

        // Payload
        const user = {
            emailAdd: data.emailAdd,
            userPW: data.userPW
        };

        // Query
        const query = `
        INSERT INTO users
        SET ?;
        `

        db.query(query, [data], (err) => {
            if (err) {
                console.log(err)
            }
            // Create token
            let token = createToken(user)
            res.cookie('LegitUser', token, {
                maxAge: 3600000,
                httpOnly: true
            });
            res.json({
                status: res.statusCode,
                msg: 'You are now registered.'
            });
        });
    };

    updateUser(req, res) {
        const query = `
        UPDATE users
        SET ?
        WHERE userID = ?;
        `

        db.query(query, [req.body, req.params.id], (err) => {
            if (err) {
                console.log(err)
            }
            res.json({
                status: res.statusCode,
                msg: 'The user record was updated.'
            });
        });
    };

    deleteUser(req, res) {
        const query = `
        DELETE FROM users
        WHERE userID = ${ req.params.id };
        `

        db.query(query, (err) =>{
            if (err) {
                console.log(err)
            }
            res.json({
                status: res.statusCode,
                msg: 'Aeser record was deleted.'
            });
        });
    };
};

module.exports = Users;