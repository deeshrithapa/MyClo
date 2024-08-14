const express = require("express");
const router = express.Router();
const auth = require("../Middleware/authMiddleware");
const {
  getCartByUserId,
  createNewCart,
  deleteCartByUserId,
  removeItemFromCart
} = require("../Controllers/cartController");

/**
 * @description To get the user's cart
 * @api /api/cart
 * @access Private
 * @type GET
 * @return response
 */
router.get("/:userId", auth, getCartByUserId);


/**
 * @description To add items to the cart or update existing items
 * @api /api/cart/add
 * @access Private
 * @type POST
 * @return response
 */
router.post("/add", auth, createNewCart);

/**
 * @description To delete the user's cart
 * @api /api/cart/delete
 * @access Private
 * @type DELETE
 * @return response
 */
router.delete("/delete", auth, deleteCartByUserId);

/**
 * @description To remove a specific item from the cart
 * @api /api/cart/remove
 * @access Private
 * @type DELETE
 * @return response
 */
router.delete("/remove", auth, removeItemFromCart);

module.exports = router;
