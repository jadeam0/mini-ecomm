require('dotenv').config();
const { express, routes } = require('./controller/userController');
const path = require('path');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const {errorHandling} = require('./middleware/errorHandling');
const { route } = require('./controller/productsController');
const port = +process.env.PORT || 3000;

// Static
app.use(express.static('./static'))

app.use(express.urlencoded({
  extended: false
}),
routes
);

app.use(
  cors(),
  cookieParser(),
  express.json()
)

app.use(route);

app.use(errorHandling);

routes.get('^/$|/Mini_E-com', (req, res) => {
  res.sendFile(path.resolve(__dirname, './static/html/index.js'));
});

app.listen(port, () => {
  console.log(`The server is running on port ${port}`);
});