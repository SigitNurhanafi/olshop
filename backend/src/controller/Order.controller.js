const modelOrder    = require('../model/Order.model');
const httpResponses = require('../utils/responses');

// Fungsi untuk membuat order baru
exports.createOrder = async (req, res) => {
    const { productId, status } = req.body;

    try {
        const orderId = await modelOrder.createOrder(productId, status);
        return httpResponses.sendSuccess(res, { id: orderId }, 201);
    } catch (error) {
        console.error('Error:', error);
        return httpResponses.sendError(res, 500);
    }
};

// Fungsi untuk mendapatkan order berdasarkan ID
exports.getOrderById = async (req, res) => {
    const { orderId } = req.params;

    try {
        const foundOrder = await modelOrder.getOrderById(orderId);
        if (!foundOrder) {
            return httpResponses.sendError(res, 404, 'Order not found');
        }

        return httpResponses.sendSuccess(res, foundOrder);
    } catch (error) {
        console.error('Error:', error);
        return httpResponses.sendError(res, 500);
    }
};

// Fungsi untuk mengupdate order
exports.updateOrder = async (req, res) => {
    const { orderId } = req.params;
    const { productId, status } = req.body;

    try {
        const updatedOrder = await modelOrder.updateOrder(orderId, { productId, status });
        return httpResponses.sendSuccess(res, 
            { 
                message: 'Order updated successfully', 
                updatedOrder 
            }
        );
    } catch (error) {
        console.error('Error:', error);
        return httpResponses.sendError(res, 500);
    }
};

// Fungsi untuk menghapus order
exports.deleteOrder = async (req, res) => {
    const { orderId } = req.params;

    try {
        await modelOrder.deleteOrder(orderId);
        return httpResponses.sendSuccess(res, { message: 'Order deleted successfully' });
    } catch (error) {
        console.error('Error:', error);
        return httpResponses.sendError(res, 500);
    }
};
