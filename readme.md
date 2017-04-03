# backend-example

Example with a mysql database, simple front-end, and a Node server.

## Install

Install the project:

```
git clone git@github.com:wooorm/backend-example.git
cd backend-example
npm install
```

You also need [mysql][], of course. I did the following on OS X with [homebrew][]:

```sh
brew install mysql
brew services start mysql
mysqladmin -u root -p # prompts to create a new password
```

Store your password, user, and name in a [`.env`][env] file, like
so:

```txt
DB_HOST=localhost
DB_USER=root
DB_NAME=backendexample
DB_PASSWORD=mypassword
```

Fill the database:

```sh
mysql -u root -e 'CREATE DATABASE IF NOT EXISTS backendexample' -p
node populate # crawls an API and stores stuff in the database.
```

Finally, do:

```sh
npm start # run server on localhost:2000.
```

[env]: https://github.com/motdotla/dotenv

[homebrew]: https://brew.sh

[mysql]: https://www.mysql.com
