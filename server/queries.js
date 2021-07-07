// const users = [];
const pg = require('pg');

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

const addUser = ({ id, name, room }) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();
  if (!name || !room) return

  return new Promise(resolve => {
    const sql = `
      INSERT INTO "users" (id, name, room)
      VALUES ($1, $2, $3)
      RETURNING *
	  `;
    db.query(sql, [id, name, room])
      .then(res => resolve(res.rows[0]))
      .catch(err => console.log(err))
  })
}

const removeUser = (id) => {
  return new Promise(resolve => {
    const sql = `
      DELETE FROM "users"
      WHERE id=$1
      RETURNING *
	  `;
    db.query(sql, [id])
      .then(res => resolve(res.rows[0]))
      .catch(err => console.log(err))
  })
}

const getUser = (id) => {
  return new Promise(resolve => {
    const sql = `
      SELECT * FROM "users"
      WHERE id=$1
	  `;
    db.query(sql, [id])
      .then(res => resolve(res.rows[0]))
      .catch(err => console.log(err))
  })
};

const getUsersInRoom = (room) => {
  return new Promise(resolve => {
    const sql = `
      SELECT * FROM "users"
      WHERE room=$1
    `;
    db.query(sql, [room])
      .then(res => resolve(res.rows))
      .catch(err => console.log(err))
  })
}

const createMessage = (room, user, text) => {
  return new Promise(resolve => {
  //   const sql = `
  //     INSERT INTO "messages" (user, room, text)
	//     VALUES ($1, $2, $3)
	// 	  RETURNING *
	//   `;
  //   db.query(sql, [user, room, text])
  //     .then(res => resolve(res.rows))
  //     .catch(err => console.log(err))
    resolve({user, text})
  })
}

module.exports = {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
  createMessage
};
