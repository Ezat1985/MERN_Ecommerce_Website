import Order from "../../models/orderSchema.js";
import asyncHandler from "../../utlis/asyncHandler.js";
import ErrorResponse from "../../utlis/ErrorResponse.js";

// get All Orders
// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
export const getAllOrders = asyncHandler(async (req, res, next) => {
  const orders = await Order.find().populate("user", "id name");
  if (!orders.length) throw new ErrorResponse("No Order found", 404);
  res.json(orders);
});
// get Order by id
// @desc    Get order by id
// @route   GET /api/orders/:id
// @access  Private

export const getSingleOrder = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const order = await Order.findById(id).populate(
    "user",
    "firstName lastName email"
  );
  if (!order)
    throw new ErrorResponse(`Order with id: ${id} does not exist`, 404);
  res.json(order);
});
// Add new Order
// @desc    Create new order
// @route   POST /api/orders
// @access  Private

export const CreateOrder = asyncHandler(async (req, res, next) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    throw new ErrorResponse("No order items", 400);
  } else {
    const newOrder = await Order.create({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });
    res.status(201).json(newOrder);
    console.log(newOrder);
  }
});
// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
export const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
});

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
export const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});
// @desc    Update order to delivered
// @route   PUT /api/orders/:id/deliver
// @access  Private/Admin
export const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});
