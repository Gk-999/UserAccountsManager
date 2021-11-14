const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'gk',
  password: 'sa',
  port: 5432,
})

const getUsers = (request, response) => {
  console.log("In");
  pool.query('SELECT * FROM "Users" ORDER BY "UserId" ASC', (error, results) => {
    if (error) {
      console.log(error);
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getUserById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM "Users" WHERE "UserId" = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

module.exports = {
    getUsers,
    getUserById
  }