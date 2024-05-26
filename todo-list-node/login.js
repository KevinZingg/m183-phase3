const dbConnect = require('./db');

async function handleLogin(req) {
    let msg = '';

    if(typeof req.query.username !== 'undefined' && typeof req.query.password !== 'undefined') {
        // Get username and password from the form and call the validateLogin
        let result = await validateLogin(req.query.username, req.query.password);

        if(result.valid) {
            // do the session here
            msg = result.msg;
        } else {
            msg = result.msg;
        }
    }

    return msg + getHtml();
}

async function validateLogin (username, password) {
    let result = { valid: false, msg: '' };

    // Connect to the database
    const dbConnection = await dbConnect();

    const sql = `SELECT id, username, password FROM users WHERE username='`+username+`'`;
    try {
        const [results, fields] = await dbConnection.query(sql);

        if(results.length > 0) {
            // Bind the result variables
            let db_id = results[0].id;
            let db_username = results[0].username;
            let db_password = results[0].password;

            // Verify the password
            if (password == db_password) {
                // Password is correct, store username in session
                /*
                setcookie("username", $username, -1, "/"); // 86400 = 1 day
                setcookie("userid", $db_id, -1, "/"); // 86400 = 1 day

                 */
                // Redirect to index.php
                /*
                header("Location: index.php");
                exit();

                 */
                result.msg = 'login correct';
            } else {
                // Password is incorrect
                result.msg = 'Incorrect password';
            }
        } else {
            // Username does not exist
            result.msg = 'Username does not exist';
        }

        console.log(results); // results contains rows returned by server
        //console.log(fields); // fields contains extra meta data about results, if available
    } catch (err) {
        console.log(err);
    }

    /*
    dbConnection.query(sql, (err, results, fields) => {
        if (err) {
            console.error('Fehler beim Ausführen des SELECT-Statements: ' + err.stack);
            return;
        }

        console.log('Ergebnisse des SELECT-Statements:');
        console.log(results);

        // Verbindung schließen
        connection.end((err) => {
            if (err) {
                console.error('Fehler beim Schließen der Verbindung: ' + err.stack);
                return;
            }
            console.log('Verbindung erfolgreich geschlossen.');
        });
    })

     */
    // Check if the form is submitted
    /*
        // Prepare SQL statement to retrieve user from database
        $stmt = $conn->prepare("SELECT id, username, password FROM users WHERE username='$username'");

        // Execute the statement
        $stmt->execute();
        // Store the result
        $stmt->store_result();
        // Check if username exists
        if ($stmt->num_rows > 0) {
            // Bind the result variables
            $stmt->bind_result($db_id, $db_username, $db_password);
            // Fetch the result
            $stmt->fetch();
            // Verify the password
            if ($password == $db_password) {
                // Password is correct, store username in session
                setcookie("username", $username, -1, "/"); // 86400 = 1 day
                setcookie("userid", $db_id, -1, "/"); // 86400 = 1 day
                // Redirect to index.php
                header("Location: index.php");
                exit();
            } else {
                // Password is incorrect
                echo "Incorrect password";
            }
        } else {
        }

        // Close statement
        $stmt->close();
     */

    return result;
}

function getHtml() {
    return `
    <h2>Login</h2>

    <form id="form" method="get" action="/login">
        <div class="form-group">
            <label for="username">Username</label>
            <input type="text" class="form-control size-medium" name="username" id="username">
        </div>
        <div class="form-group">
            <label for="password">Password</label>
            <input type="text" class="form-control size-medium" name="password" id="password">
        </div>
        <div class="form-group">
            <label for="submit" ></label>
            <input id="submit" type="submit" class="btn size-auto" value="Login" />
        </div>
    </form>`;
}

module.exports = handleLogin;