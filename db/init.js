import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { vinyl } from '../data.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dbPath = path.resolve(__dirname, '..', 'database.db')

export async function initDB() {

    const db = await open({
        filename: dbPath,
        driver: sqlite3.Database
    })

    // Create table if it doesn't exist
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

    // Seed only if table is empty
    const { count } = await db.get('SELECT COUNT(*) as count FROM products')

    if (count === 0) {
        console.log('Seeding database...')
        await db.exec('BEGIN TRANSACTION')
        try {
            for (const { title, artist, price, image, year, genre, stock } of vinyl) {
                await db.run(
                    `INSERT INTO products (title, artist, price, image, year, genre, stock)
           VALUES (?, ?, ?, ?, ?, ?, ?)`,
                    [title, artist, price, image, year, genre, stock]
                )
            }
            await db.exec('COMMIT')
            console.log('Database seeded successfully.')
        } catch (err) {
            await db.exec('ROLLBACK')
            console.error('Error seeding database:', err.message)
            throw err
        }
    } else {
        console.log(`Database already has ${count} products, skipping seed.`)
    }

    await db.close()
    console.log('Database ready.')
}
