import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

async function createTable() {

      const db = await open({
            filename: path.resolve(__dirname, 'database.db'),
            driver: sqlite3.Database
      })

      await db.exec(`
            CREATE TABLE IF NOT EXISTS products (
                  id INTEGER PRIMARY KEY AUTOINCREMENT, 
                  title TEXT NOT NULL, 
                  artist TEXT NOT NULL,
                  price REAL NOT NULL,
                  image TEXT NOT NULL,
                  year INTEGER,
                  genre TEXT,
                  stock INTEGER 
            )
      
      `)

      await db.close()
      console.log('table created')
}

createTable()