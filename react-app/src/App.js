import "./App.css";
import React, { useState, useRef, useEffect } from "react";
import chair from "./chair.jpg";
import gif from "./giphy.gif";

function App() {
  const [paidFor, setPaidFor] = useState(false);
  const [loaded, setLoaded] = useState(false);

  let paypalRef = useRef();

  const product = {
    price: 777.77,
    description: "fancy chair, like new",
    img: "assets/couch.jpg"
  };

  useEffect(() => {
    // Load PayPal Script
    const script = document.createElement("script");
    script.src =
      "https://www.paypal.com/sdk/js?client-id=ARNRNvgJTH0oaRUrQUC-p-MgCXzIOl5T6um6YqdW7U9mkwzV-ZkfCtp9c0QH6dRWArJY85Yh3rLCT5Vu";
    script.addEventListener("load", () => setLoaded(true));
    document.body.appendChild(script);

    if (loaded) {
      setTimeout(() => {
        window.paypal
          .Buttons({
            createOrder: (data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    description: product.description,
                    amount: {
                      currency_code: "USD",
                      value: product.price
                    }
                  }
                ]
              });
            },
            onApprove: async (data, actions) => {
              const order = await actions.order.capture();

              setPaidFor(true);

              console.log(order);
            },
            onError: err => {
              console.log(err);
            }
          })
          .render(paypalRef);
      });
    }
  });

  return (
    <div className="App">
      {paidFor ? (
        <div>
          <h1>Congrats, you just bought comfy chair!</h1>
          <img src={gif} />
        </div>
      ) : (
        <div>
          <h1>
            {product.description} for ${product.price}
          </h1>
          <img src={chair} width="200" />
          <div ref={v => (paypalRef = v)} />
        </div>
      )}
    </div>
  );
}

export default App;
