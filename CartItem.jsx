
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { removeItem, updateQuantity } from "./CartSlice";

export default function CartItem() {
  const dispatch = useDispatch();
  const [checkoutMessage, setCheckoutMessage] = useState("");

  const cartItems = useSelector(
    (state) => state.cart?.items ?? []
  );

  const totalAmount = cartItems.reduce(
    (total, item) =>
      total + Number(item.price) * Number(item.quantity),
    0
  );

  const totalItems = cartItems.reduce(
    (total, item) => total + Number(item.quantity || 0),
    0
  );

  const styles = {
    page: {
      minHeight: "100vh",
      background: "#f5f8f2",
      color: "#24372a",
      fontFamily: "Arial, sans-serif",
    },
    navbar: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      gap: "16px",
      padding: "20px 5%",
      background: "#17452d",
      color: "white",
    },
    link: {
      color: "white",
      textDecoration: "none",
      fontWeight: "bold",
    },
    content: {
      maxWidth: "1100px",
      margin: "0 auto",
      padding: "35px 20px 50px",
    },
    card: {
      display: "flex",
      alignItems: "center",
      flexWrap: "wrap",
      gap: "20px",
      padding: "20px",
      marginBottom: "18px",
      background: "white",
      borderRadius: "12px",
      boxShadow: "0 3px 12px rgba(0,0,0,0.07)",
    },
    image: {
      width: "120px",
      height: "120px",
      objectFit: "cover",
      borderRadius: "10px",
      background: "#e5eee4",
    },
    button: {
      padding: "9px 14px",
      border: "none",
      borderRadius: "7px",
      cursor: "pointer",
      fontWeight: "bold",
    },
  };

  return (
    <main style={styles.page}>
      <nav style={styles.navbar}>
        <Link to="/" style={{ ...styles.link, fontSize: "22px" }}>
          Paradise Nursery
        </Link>

        <div style={{ display: "flex", gap: "20px" }}>
          <Link to="/" style={styles.link}>Home</Link>
          <Link to="/plants" style={styles.link}>Plants</Link>
          <Link to="/cart" style={styles.link}>
            🛒 Cart ({totalItems})
          </Link>
        </div>
      </nav>

      <section style={styles.content}>
        <h1>Shopping Cart</h1>
        <p>Review your plants and update your order.</p>

        {cartItems.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              background: "white",
              padding: "40px 20px",
              borderRadius: "12px",
            }}
          >
            <h2>Your cart is empty</h2>
            <p>Discover beautiful plants for your home.</p>
            <Link
              to="/plants"
              style={{
                display: "inline-block",
                padding: "12px 20px",
                background: "#247342",
                color: "white",
                borderRadius: "8px",
                textDecoration: "none",
              }}
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            {cartItems.map((item) => {
              const quantity = Number(item.quantity) || 1;
              const unitPrice = Number(item.price) || 0;
              const itemTotal = unitPrice * quantity;

              return (
                <article key={item.id} style={styles.card}>
                  <img
                    src={item.image}
                    alt={item.name}
                    style={styles.image}
                  />

                  <div style={{ flex: "1 1 180px" }}>
                    <h2 style={{ marginTop: 0 }}>{item.name}</h2>
                    <p>Unit Price: ${unitPrice.toFixed(2)}</p>
                    <p>
                      <strong>
                        Plant Total: ${itemTotal.toFixed(2)}
                      </strong>
                    </p>
                  </div>

                  <div>
                    <p><strong>Quantity</strong></p>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                      }}
                    >
                      <button
                        type="button"
                        aria-label={`Decrease ${item.name} quantity`}
                        disabled={quantity <= 1}
                        onClick={() =>
                          dispatch(
                            updateQuantity({
                              id: item.id,
                              quantity: quantity - 1,
                            })
                          )
                        }
                        style={{
                          ...styles.button,
                          background: "#e1eadf",
                        }}
                      >
                        −
                      </button>

                      <span aria-live="polite">{quantity}</span>

                      <button
                        type="button"
                        aria-label={`Increase ${item.name} quantity`}
                        onClick={() =>
                          dispatch(
                            updateQuantity({
                              id: item.id,
                              quantity: quantity + 1,
                            })
                          )
                        }
                        style={{
                          ...styles.button,
                          background: "#e1eadf",
                        }}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      dispatch(removeItem(item.id));
                      setCheckoutMessage("");
                    }}
                    style={{
                      ...styles.button,
                      background: "#b3261e",
                      color: "white",
                    }}
                  >
                    Delete
                  </button>
                </article>
              );
            })}

            <div
              style={{
                marginTop: "25px",
                padding: "25px",
                background: "white",
                borderRadius: "12px",
                textAlign: "right",
              }}
            >
              <h2>
                Total Amount: ${totalAmount.toFixed(2)}
              </h2>

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  flexWrap: "wrap",
                  gap: "12px",
                  marginTop: "20px",
                }}
              >
                <Link
                  to="/plants"
                  style={{
                    display: "inline-block",
                    padding: "12px 18px",
                    background: "#e1eadf",
                    color: "#17452d",
                    borderRadius: "8px",
                    textDecoration: "none",
                    fontWeight: "bold",
                  }}
                >
                  Continue Shopping
                </Link>

                <button
                  type="button"
                  onClick={() =>
                    setCheckoutMessage(
                      "Checkout Coming Soon! Thank you for shopping with Paradise Nursery."
                    )
                  }
                  style={{
                    ...styles.button,
                    padding: "12px 20px",
                    background: "#247342",
                    color: "white",
                  }}
                >
                  Checkout
                </button>
              </div>

              {checkoutMessage && (
                <p
                  role="status"
                  style={{
                    marginTop: "20px",
                    color: "#247342",
                    fontWeight: "bold",
                  }}
                >
                  {checkoutMessage}
                </p>
              )}
            </div>
          </>
        )}
      </section>
    </main>
  );
}
