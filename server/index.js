const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();

app.use(bodyParser.json(), cors());

app.post('/login', (req, res) => {
   const token = jwt.sign({email: req.body.email, admin: true}, 'WIJIONE', {expiresIn: '5d'});

   try {
       if(!(req.body.email === 'admin@email.com' && req.body.password === 'password')) {
           throw new Error('credentials are incorrect');
       }
       res.status(200).send({accessToken: token});
   } catch (e) {
       res.status(400).send('User not found');
   }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}. Started: ${new Date().toLocaleString()}`);
});
