const express       = require('express');
const authRoute     = require('./src/route/Auth.route');
const userRoute     = require('./src/route/User.route');
const productRoute  = require('./src/route/Product.route');
const orderRoute    = require('./src/route/Order.route');
const app           = express();

app.use(express.json());
app.disable('x-powered-by');

app.get("/", (req, res) => {
    res.json({ message: "Welcome to Olshop 2024." });
});

// app.get("*", (req, res) => {
//     res.status(404).json({ message: "Not Found" });
// });

app.use('/auth', authRoute);
app.use('/user', userRoute);
app.use('/products', productRoute);
app.use('/orders', orderRoute);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server Running at port ${PORT}`));