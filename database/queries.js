const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'gk',
  password: 'sa',
  port: 5432,
})

const getUsers = (request, response) => {
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

const createUser = (request, response) => {
  const { UserId, Password, Status, Role } = request.body

  pool.query('INSERT INTO "Users" ("UserId","Password", "Status", "Role") VALUES ($1, $2, $3, $4)', [UserId, Password, Status, Role], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added successfully`)
  })
}

const updateUser = (request, response) => {
  const id = parseInt(request.params.id)
  const { Password, OldPassword, Status, Role } = request.body

  pool.query(
    'UPDATE "Users" SET "Password" = $1, "OldPassword" = $2, "Status" = $3, "Role" = $4 WHERE "UserId" = $5',
    [Password, OldPassword, Status,Role, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
}

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM "Users" WHERE "UserId" = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
  }