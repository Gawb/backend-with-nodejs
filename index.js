const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');
const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler')

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());


const whitelist = ['http://localhost:3000', 'https://myapp.com'];
const options = {
  origin: (origin, callback) =>{
    if(whitelist.includes(origin) || !origin){
      callback(null, true);
    }else{
      callback(new Error('no permitido'));
    }
  }
};
app.use(cors(options));

app.get('/', (req, res) => {
  res.send('Hello World! ')
});

app.get('/new-path', (req, res) => {
  res.send('hi, i am a new path in your server')
});

routerApi(app);
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

// app.get('/categories/:categoryId/products/:productId', (req, res)=>{
//   const {categoryId, productId} = req.params;
//   res.json({
//     categoryId,
//     productId,
//   })
// });

app.listen(port, () => {
  console.log(`ya corriendo desde esxpress, en el puerto: ${port}`)
});
