const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const dbService = require('./dbService');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended : false }));

// create
app.post('/insert', (request, response) => {
    const first_name = request.body.first_name;
    const last_name = request.body.last_name;
    const email_address = request.body.email_address;
    
    const db = dbService.getDbServiceInstance();
    
    const result = db.insertNewDetail(first_name, last_name, email_address);

    result
    .then(data => response.json({ data: data}))
    .catch(err => console.log(err));
});

// read
app.get('/getUsers', (request, response) => {
    const db = dbService.getDbServiceInstance();

    const result = db.getAllUsers();
    
    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));
})

// update
app.patch('/update', (request, response) => {
    const { id, name } = request.body;
    const db = dbService.getDbServiceInstance();

    const result = db.updateNameById(id, name);
    
    result
    .then(data => response.json({success : data}))
    .catch(err => console.log(err));
});

// delete
app.delete('/delete/:id', (request, response) => {
    const { id } = request.params;
    const db = dbService.getDbServiceInstance();

    const result = db.deleteRowById(id);
    
    result
    .then(data => response.json({success : data}))
    .catch(err => console.log(err));
});



app.listen(process.env.PORT, () => console.log('app is running'));