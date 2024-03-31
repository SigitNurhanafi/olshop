const modelOrde = require('../model/Order.model');

// Fungsi untuk membuat order baru
exports.createOrder = async (req, res) => {
    const { productId, status } = req.body;

    try {
        const orderId = await modelOrde.createOrder(productId, status);
        return res.status(201).json({ message: 'Order created successfully', orderId });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Fungsi untuk mendapatkan order berdasarkan ID
exports.getOrderById = async (req, res) => {
    const { orderId } = req.params;

    try {
        const foundOrder = await modelOrde.getOrderById(orderId);
        if (!foundOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }

        return res.status(200).json(foundOrder);
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Fungsi untuk mengupdate order
exports.updateOrder = async (req, res) => {
    const { orderId } = req.params;
    const { productId, status } = req.body;

    try {
        const updatedOrder = await modelOrde.updateOrder(orderId, { productId, status });
        return res.status(200).json({ message: 'Order updated successfully', updatedOrder });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Fungsi untuk menghapus order
exports.deleteOrder = async (req, res) => {
    const { orderId } = req.params;

    try {
        await modelOrde.deleteOrder(orderId);
        return res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};
