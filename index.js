import dotenv from 'dotenv'
import express from "express"
import jwt from "jsonwebtoken"
import mongoose from "mongoose"

dotenv.config()

mongoose
		.connect(`mongodb+srv://admin:${process.env.MongoDBPassword}@cluster0.htchcrj.mongodb.net/?retryWrites=true&w=majority`)
		.then(() => console.log('DB Connected'))
		.catch((err) => console.log('DB Connected failed: ', err))

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
		res.send('MarkDown-BLOG!')
})

app.post('/auth/login', (req, res) => {
		const token = jwt.sign({
				email: req.body.email,
				password: req.body.password
		}, process.env.JWT_SECRET)

		res.json({
				success: true,
				token,
		})
})

app.listen(4444, (err) => {
		if (err) {
				return console.log(err)
		}

		console.log('Server OK')
})
