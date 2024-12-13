require('dotenv').config()
const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')

app.use(express.json())

const posts = [
    {
        username: 'Grisha',
        title: '1'
    },
    {
        username: 'Altyn',
        title: 'parol'
    }

]


app.get('/posts', authenticateToken, (req, res) => {
    res.json(posts.filter(post =>{post.username === req.user.name}))

})

function authenticateToken(req, res, nex){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
    
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err,user) => {
        if (err) res.sendStatus(403)
        req.user = user
        next()
    })
}

app.post('/login', (req, res) =>{

    const username = req.body.username
    const user = { name: username}
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
    res.json({ accessToken: accessToken})

})

    
app.listen(3000)