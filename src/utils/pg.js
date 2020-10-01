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

const trackShowGet = (showSlug) => {
  return new Promise((resolve, reject) => {
    pool.connect().then((pg) => {
      const query = 'SELECT show_name, episode FROM tracked_shows WHERE show_slug = $1;'
      const values = [showSlug]

      pg.query(query, values)
        .then(res => resolve(res.rows[0]))
        .catch(err => reject(new Error(err)))

      pg.release()
    }).catch(err => reject(new Error(err)))
  })
}

const trackShowGetAll = () => {
  return new Promise((resolve, reject) => {
    pool.connect().then((pg) => {
      const query = 'SELECT show_name, show_slug, episode, userid FROM tracked_shows'

      pg.query(query)
        .then(res => resolve(res.rows))
        .catch(err => reject(new Error(err)))

      pg.release()
    }).catch(err => reject(new Error(err)))
  })
}

const trackShowAdd = (showName, showSlug, episode, userid) => {
  return new Promise((resolve, reject) => {
    pool.connect().then((pg) => {
      const query = `
        INSERT INTO tracked_shows (show_name, show_slug, episode, userid)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (show_name) DO NOTHING`
      const values = [showName, showSlug, episode, userid]

      pg.query(query, values)
        .then(res => resolve(res))
        .catch(err => reject(new Error(err)))

      pg.release()
    }).catch(err => reject(new Error(err)))
  })
}

const trackShowRename = (showSlug, newName, newSlug) => {
  return new Promise((resolve, reject) => {
    pool.connect().then((pg) => {
      const query = `
        UPDATE tracked_shows
        SET show_name = $2, show_slug = $3
        WHERE show_slug = $1
        RETURNING *;`
      const values = [showSlug, newName, newSlug]

      pg.query(query, values)
        .then(res => resolve(res.rows[0]))
        .catch(err => reject(new Error(err)))

      pg.release()
    }).catch(err => reject(new Error(err)))
  })
}

const trackShowSet = (showName, showSlug, episode, userid) => {
  return new Promise((resolve, reject) => {
    pool.connect().then((pg) => {
      const query = `
        INSERT INTO tracked_shows (show_name, show_slug, episode, userid)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (show_slug) DO UPDATE
          SET episode = excluded.episode;`
      const values = [showName, showSlug, episode, userid]

      pg.query(query, values)
        .then(res => resolve(res))
        .catch(err => reject(new Error(err)))

      pg.release()
    }).catch(err => reject(new Error(err)))
  })
}

const trackShowDelete = (showName) => {
  return new Promise((resolve, reject) => {
    pool.connect().then((pg) => {
      const query = 'DELETE FROM tracked_shows WHERE show_slug = $1;'
      const values = [showName]

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
