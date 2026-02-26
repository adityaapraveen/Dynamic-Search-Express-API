import express from 'express'
import { productsRouter } from './routes/products.js'
import { initDB } from './db/init.js'

const app = express()
const PORT = process.env.PORT || 8000

app.use(express.static('public'))

app.use('/api/products', productsRouter)

async function startServer() {
  await initDB()
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
  }).on('error', (err) => {
    console.error('Failed to start server:', err)
  })
}

startServer()