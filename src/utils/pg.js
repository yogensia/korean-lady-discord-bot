const { Pool } = require('pg')

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
})

/**
 * Runs a Postgress query.
 *
 * @param {string} query Postgres query to run.
 * @param {Object} values Optional array of values to pass to the query.
 */
const runQuery = (query, values = false) => {
  return new Promise((resolve, reject) => {
    pool.connect().then((pg) => {
      // Only send parametized values if needed.
      if (values) {
        pg.query(query, values)
          .then((res) => resolve(res))
          .catch((err) => new Error(err))
      } else {
        pg.query(query)
          .then((res) => resolve(res))
          .catch((err) => new Error(err))
      }

      pg.release()
    }).catch((err) => {
      reject(new Error(err))
    })
  })
}

// Birthday command methods.
const birthdayGet = (userid) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT birthday FROM birthdays
      WHERE userid = $1;`
    const values = [userid]

    runQuery(query, values)
      .then(res => resolve(res.rows[0]))
      .catch(err => reject(new Error(err)))
  })
}

const birthdayGetAll = () => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT userid, birthday, discord_name
      FROM birthdays;`

    runQuery(query)
      .then(res => resolve(res.rows))
      .catch(err => reject(new Error(err)))
  })
}

const birthdaySet = (userid, birthday, username) => {
  return new Promise((resolve, reject) => {
    const query = `
      INSERT INTO birthdays (userid, birthday, discord_name)
      VALUES ($1, $2, $3)
      ON CONFLICT (userid) DO UPDATE
        SET birthday = excluded.birthday;`
    const values = [userid, birthday, username]

    runQuery(query, values)
      .then(res => resolve(res))
      .catch(err => reject(new Error(err)))
  })
}

const birthdayUnset = (userid) => {
  return new Promise((resolve, reject) => {
    const query = `
      DELETE FROM birthdays
      WHERE userid = $1;`
    const values = [userid]

    runQuery(query, values)
      .then(res => resolve(res))
      .catch(err => reject(new Error(err)))
  })
}

// Show track command methods.
const trackShowGet = (showSlug) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT show_name, episode
      FROM tracked_shows
      WHERE show_slug = $1;`
    const values = [showSlug]

    runQuery(query, values)
      .then(res => resolve(res.rows[0]))
      .catch(err => reject(new Error(err)))
  })
}

const trackShowGetAll = () => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT show_name, show_slug, episode, userid
      FROM tracked_shows;`

    runQuery(query)
      .then(res => resolve(res.rows))
      .catch(err => reject(new Error(err)))
  })
}

const trackShowAdd = (showName, showSlug, episode, userid) => {
  return new Promise((resolve, reject) => {
    const query = `
      INSERT INTO tracked_shows (show_name, show_slug, episode, userid)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (show_name) DO NOTHING;`
    const values = [showName, showSlug, episode, userid]

    runQuery(query, values)
      .then(res => resolve(res))
      .catch(err => reject(new Error(err)))
  })
}

const trackShowRename = (showSlug, newName, newSlug) => {
  return new Promise((resolve, reject) => {
    const query = `
      UPDATE tracked_shows
      SET show_name = $2, show_slug = $3
      WHERE show_slug = $1
      RETURNING *;`
    const values = [showSlug, newName, newSlug]

    runQuery(query, values)
      .then(res => resolve(res.rows[0]))
      .catch(err => reject(new Error(err)))
  })
}

const trackShowSet = (showName, showSlug, episode, userid) => {
  return new Promise((resolve, reject) => {
    const query = `
      INSERT INTO tracked_shows (show_name, show_slug, episode, userid)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (show_slug) DO UPDATE
        SET episode = excluded.episode;`
    const values = [showName, showSlug, episode, userid]

    runQuery(query, values)
      .then(res => resolve(res))
      .catch(err => reject(new Error(err)))
  })
}

const trackShowDelete = (showName) => {
  return new Promise((resolve, reject) => {
    const query = `
      DELETE FROM tracked_shows
      WHERE show_slug = $1;`
    const values = [showName]

    runQuery(query, values)
      .then(res => resolve(res))
      .catch(err => reject(new Error(err)))
  })
}

module.exports = {
  birthdayGet,
  birthdayGetAll,
  birthdaySet,
  birthdayUnset,
  trackShowGet,
  trackShowGetAll,
  trackShowAdd,
  trackShowRename,
  trackShowSet,
  trackShowDelete
}
