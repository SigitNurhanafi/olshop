require('dotenv').config();
const express           = require('express');
const authRoute         = require('./src/route/Auth.route');
const userRoute         = require('./src/route/User.route');
const productRoute      = require('./src/route/Product.route');
const orderRoute        = require('./src/route/Order.route');
const { authenticateToken } = require('./src/middleware/AuthJWT.middlware');
const app               = express();
const cors              = require('cors');

app.use(express.json());
app.use(cors());
app.disable('x-powered-by');

app.get("/", (req, res) => {
    res.json({ message: "Welcome to Olshop 2024." });
});

app.use('/auth', authRoute);
app.use('/user', authenticateToken, userRoute);
app.use('/products', authenticateToken, productRoute);
app.use('/orders', authenticateToken, orderRoute);

app.get("*", (req, res) => {
    res.status(404).json({ message: "Not Found" });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server Running at port ${PORT}`));