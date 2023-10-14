const sqlite3 = require('sqlite3').verbose()

const db = new sqlite3.Database('barcode_data.db')

db.serialize(() => {
  db.run(
    'CREATE TABLE IF NOT EXISTS candidates (id INTEGER PRIMARY KEY, barcode TEXT, name TEXT, dob TEXT, address TEXT, contact TEXT, gender TEXT)',
  )
})

module.exports = db
