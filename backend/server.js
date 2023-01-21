import express from 'express'
import routerProducts from './routers/products.js'
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/products',routerProducts)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})