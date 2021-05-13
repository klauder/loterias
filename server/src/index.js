const express = require('express');
// const cors = require('cors');
const bodyParser = require('body-parser');
const multipart = require('connect-multiparty');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// vamos remover o cors no futuro 
// removido Aula 138 (https://www.youtube.com/watch?v=D9oFe6rHjpY&list=PLGxZ4Rq3BOBoSRcKWEdQACbUCNWLczg2G&index=143)
/*
const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
};
*/

const multipartMiddleware = multipart({ uploadDir: './src/uploads' });

//app.use(cors(corsOptions));

app.post('/upload', multipartMiddleware, (req, res) => {
    const files = req.files;
    console.log(files);
    res.json({ message: files });
});

app.use((err, req, res, next) => res.json({ error: err.message }));

app.listen(8000, () => {
    console.log('Servidor porta 8000');
});