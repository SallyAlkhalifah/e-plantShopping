import React from "react";
import { useDispatch } from "react-redux";
import { removeItem, updateQuantity } from "./CartSlice";

const CartItem = ({ item, onContinueShopping }) => {
  const dispatch = useDispatch();

  // حساب مجموع تكلفة كل المنتجات في هذا النوع
  const calculateTotalCost = () => {
    const price = parseFloat(item.cost.substring(1)); // تحويل $10.00 إلى 10
    return (price * item.quantity).toFixed(2);
  };

  // زيادة كمية المنتج
  const handleIncrement = () => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  // نقصان كمية المنتج
  const handleDecrement = () => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  // حذف المنتج بالكامل
  const handleRemove = () => {
    dispatch(removeItem(item.name));
  };

  // العودة لصفحة المنتجات
  const handleContinueShopping = () => {
    if (onContinueShopping) onContinueShopping();
  };

  // زر الدفع (حالياً مجرد رسالة تنبيه)
  const handleCheckoutShopping = () => {
    alert("Functionality to be added for future reference");
  };

  return (
    <div className="cart-item">
      <img src={item.image} alt={item.name} className="cart-item-image" />
      <div className="cart-item-details">
        <h3>{item.name}</h3>
        <p>Unit Price: {item.cost}</p>
        <p>Subtotal: ${calculateTotalCost()}</p>
        <div className="cart-item-controls">
          <button onClick={handleDecrement}>-</button>
          <span>{item.quantity}</span>
          <button onClick={handleIncrement}>+</button>
          <button onClick={handleRemove}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
