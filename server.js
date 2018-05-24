const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const app = express();

const testApi = require('./routes/testapi');
const userApi = require('./routes/userApi');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use('/testData',testApi);
app.use('/user',userApi);

app.use(express.static(path.join(__dirname,'dist')));

app.get('*',(req,res) => {
    res.sendFile(path.join(__dirname,'dist/index.html'));
});

const port = process.env.PORT || '3000';

app.set('port',port);

const server = http.createServer(app);

server.listen(port, () => console.log(`Server is running on localhost:${port}`));