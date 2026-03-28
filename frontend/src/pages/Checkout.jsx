import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import OrderConfirmation from "./OrderConfirmation";
import { Link } from "react-router-dom";
import { Package, MapPin } from "lucide-react";
import API from "../services/api";

const Checkout = () => {
  const { cartTotal, clearCart, cart } = useCart();
  const [deliveryDetails, setDeliveryDetails] = useState({
    name: "",
    address: "",
    city: "",
    zip: "",
  });
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderError, setOrderError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDeliveryDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSumbit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setOrderError(null);

    try {
      await API.post("/orders", {
        shippingName: deliveryDetails.name,
        shippingAddress: deliveryDetails.address,
        shippingCity: deliveryDetails.city,
        shippingZip: deliveryDetails.zip,
        totalAmount: cartTotal,
        items: cart.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
          price: item.price,
        })),
      });

      clearCart();
      setIsConfirmed(true);
    } catch (err) {
      console.error("Order placement failed:", err);
      setOrderError("Failed to place order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isConfirmed)
    return <OrderConfirmation deliveryDetails={deliveryDetails} />;

  return (
    <>
      <div className="container mx-auto px-4 md:px-8 pt-8">
        <h2 className="text-5xl font-extrabold text-white mb-10 tracking-tight">
          Finalize Order
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 p-8 bg-gray-900 rounded-2xl shadow-2xl border border-gray-800">
            <h3 className="text-3xl font-bold text-orange-400 mb-6 flex items-center space-x-3 border-b border-gray-700 pb-4">
              <MapPin className="w-7 h-7 text-orange-500" />
              <span>Shipping Information</span>
            </h3>

            <form className="space-y-6" onSubmit={handleSumbit}>
              {Object.keys(deliveryDetails).map((key) => (
                <div key={key}>
                  <label
                    htmlFor={key}
                    className="block text-sm font-semibold text-gray-300 capitalize mb-1"
                  >
                    {key === "zip" ? "Pin Code" : key}
                  </label>
                  <input
                    type={key === "zip" ? "number" : "text"}
                    id={key}
                    name={key}
                    value={deliveryDetails[key]}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full px-5 py-3 border border-gray-700 rounded-xl shadow-inner text-white bg-gray-800 placeholder-gray-500"
                  />
                </div>
              ))}

              {/* Show error if order fails */}
              {orderError && (
                <p className="text-red-400 text-sm font-semibold">
                  {orderError}
                </p>
              )}

              <div className="pt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-orange-600 text-white font-extrabold text-xl rounded-full shadow-lg shadow-orange-800/50 cursor-pointer hover:bg-orange-700 transition duration-300 flex items-center justify-center space-x-2 transform hover:ring-4 hover:ring-pink-600/50 uppercase tracking-wider disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting
                    ? "Placing Order..."
                    : `Pay and Confirm Order (Rs.${cartTotal.toFixed(2)})`}
                </button>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1 p-8 bg-gray-900 rounded-2xl shadow-2xl sticky top-20 h-fit border border-gray-800">
            <h3 className="text-3xl font-bold text-white mb-5 border-b border-y-gray-700 pb-3 flex items-center space-x-2">
              <Package className="w-6 h-6 text-orange-400" />
              <span>Summary</span>
            </h3>
            <div className="space-y-4 text-gray-400">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between text-base border-b border-gray-800 pb-2"
                >
                  <span className="truncate text-gray-300">{item.name}</span>
                  <span className="font-medium text-orange-300">
                    Rs.{(Number(item.price) * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}

              <div className="space-y-4 text-gray-400">
                <div className="flex justify-between text-xl">
                  <span>SubTotal :</span>
                  <span className="font-semibold text-white">
                    Rs.{cartTotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-xl">
                  <span>Shipping (Express):</span>
                  <span className="font-semibold text-green-400">Free</span>
                </div>
                <div className="flex justify-between pt-6 border-t border-gray-700">
                  <span className="text-2xl font-extrabold text-white">
                    Total Due:
                  </span>
                  <span className="text-3xl font-extrabold text-orange-400">
                    Rs.{cartTotal.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
