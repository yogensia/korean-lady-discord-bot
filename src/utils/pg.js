const { Pool } = require('pg')

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
})

const birthdayGet = (userid) => {
  return new Promise((resolve, reject) => {
    pool.connect().then((pg) => {
      const query = 'SELECT birthday FROM birthdays WHERE userid = $1;'
      const values = [userid]

      pg.query(query, values)
        .then((res) => resolve(res.rows[0]))
        .catch((err) => new Error(err))

      pg.release()
    }).catch((err) => {
      reject(new Error(err))
    })
  })
}

const birthdayGetAll = async () => {
  return new Promise((resolve, reject) => {
    pool.connect().then((pg) => {
      const query = 'SELECT userid, birthday, discord_name FROM birthdays;'

      pg.query(query)
        .then((res) => resolve(res.rows))
        .catch((err) => new Error(err))

      pg.release()
    }).catch((err) => {
      reject(new Error(err))
    })
  })
}

const birthdaySet = async (userid, birthday, username) => {
  return new Promise((resolve, reject) => {
    pool.connect().then((pg) => {
      const query = `
        INSERT INTO birthdays (userid, birthday, discord_name)
        VALUES ($1, $2, $3)
        ON CONFLICT (userid) DO UPDATE
          SET birthday = excluded.birthday;`
      const values = [userid, birthday, username]

      pg.query(query, values)
        .then((res) => resolve(res))
        .catch((err) => new Error(err))

      pg.release()
    }).catch((err) => {
      reject(new Error(err))
    })
  })
}

const birthdayUnset = async (userid) => {
  return new Promise((resolve, reject) => {
    pool.connect().then((pg) => {
      const query = 'DELETE FROM birthdays WHERE userid = $1;'
      const values = [userid]

      pg.query(query, values)
        .then((res) => resolve(res))
        .catch((err) => new Error(err))

      pg.release()
    }).catch((err) => {
      reject(new Error(err))
    })
  })
}

module.exports = {
  // checkPg,
  birthdayGet,
  birthdayGetAll,
  birthdaySet,
  birthdayUnset
}
