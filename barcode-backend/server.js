const express = require('express')

const sqlite3 = require('sqlite3').verbose()

const app = express()

const port = 3001

const db = new sqlite3.Database('barcode_data.db')

db.serialize(() => {
  db.run(
    'CREATE TABLE IF NOT EXISTS candidates (id INTEGER PRIMARY KEY, barcode TEXT, name TEXT, dob TEXT, address TEXT, contact TEXT, gender TEXT)',
  )
})

app.use(express.json())

app.post('/api/storeData', (req, res) => {
  const {barcode, name, dob, address, contact, gender} = req.body

  db.run(
    'INSERT INTO candidates (barcode, name, dob, address, contact, gender) VALUES (?, ?, ?, ?, ?, ?)',
    [barcode, name, dob, address, contact, gender],
    err => {
      if (err) {
        console.error(err)
        res.status(500).send('Error storing data')
      } else {
        res.status(200).send('Data stored successfully')
      }
    },
  )
})

// API endpoint to retrieve data by barcode
app.get('/api/getData/:barcode', (req, res) => {
  const barcode = req.params.barcode

  db.get(
    'SELECT * FROM candidates WHERE barcode = ?',
    [barcode],
    (err, row) => {
      if (err) {
        console.error(err)
        res.status(500).send('Error retrieving data')
      } else {
        res.status(200).json(row)
      }
    },
  )
})

app.get('/', (req, res) => {
  res.send('Welcome to the Barcode Scanning and Data Storage API')
})

app.on('close', () => {
  db.close()
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
