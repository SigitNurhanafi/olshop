const validator     = require('validator');
const modelOrder    = require('../model/Order.model');
const modelProduct  = require('../model/Product.model');
const httpResponses = require('../utils/responses');

const statuses = {
    0: 'pending',
    1: 'in process',
    2: 'done'
}

// Fungsi untuk membuat order baru
exports.createOrder = async (req, res) => {
    const satausDefault = 0;
    let { product_id, status } = req.body;
    status = status ?? statuses[satausDefault];

    if (!validator.isInt(String(status), { min: 0, max: 2 })) {
        return httpResponses.sendError(res, 400, 'Status must be an integer between 0 and 2');
    }

    try {
        const product = await modelProduct.getProductById(parseInt(product_id));
        if (!product) {
            return httpResponses.sendError(res, 404, 'Product not found');
        }
        const orderId = await modelOrder.createOrder(product_id, status);
        let order = await modelOrder.getOrderById(orderId);

        return httpResponses.sendSuccess(res, { id: orderId }, 201);
    } catch (error) {
        console.error('Error:', error);
        return httpResponses.sendError(res, 500);
    }
};

// Fungsi untuk mendapatkan order berdasarkan ID
exports.getOrderById = async (req, res) => {
    const orderId = req.params.id;

    try {
        const foundOrder = await modelOrder.getAllOrdersWithProductId(orderId);
        if (!foundOrder) {
            return httpResponses.sendError(res, 404, 'Order not found');
        }
        
        foundOrder.status = {
            value: foundOrder.status,
            label: statuses[foundOrder.status]
        }

        return httpResponses.sendSuccess(res, {data: { order: foundOrder }});
    } catch (error) {
        console.error('Error:', error);
        return httpResponses.sendError(res, 500);
    }
};

// Fungsi untuk mengupdate order
exports.updateOrder = async (req, res) => {
    let orderId = req.params.id;
    const { status } = req.body;

    try {
        const updatedOrder = await modelOrder.updateOrder(orderId, status);
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

exports.getAllOrders = async (req, res) => {
    try {
        let orders = await modelOrder.getAllOrdersWithProducts();
        orders = orders.map(order => {
            if (statuses[order.status]) {
                order.status = {
                    value: order.status,
                    label: statuses[order.status]
                };
            } else {
                order.status = {
                    value: order.status,
                    label: 'undefine'
                };
            }

            return order;
        });

        return httpResponses.sendSuccess(res, { data: { orders } });
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