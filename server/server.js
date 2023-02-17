const express = require('express');
const stripe = require('stripe');
const cors = require('cors');

const app = express();

app.use(express.json())
app.use(cors());


app.get('/', (req, res) => res.send('Hello'));


app.post('/payment', (req, res) => {
    const {card} = req.body;

    console.log(req);

    res.status(200).json({message: 'Payment success'});
})

app.listen(4242, () => console.log('Listening to Port 4242'));