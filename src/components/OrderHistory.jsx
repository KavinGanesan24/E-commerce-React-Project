import React from "react";
import { useSelector } from "react-redux";
import { Container, Card } from "react-bootstrap";

const OrderHistory = () => {

  const orders = useSelector(
    state => state.orders.orders
  );

  return (
    <Container className="mt-5">
      <h2>Your Orders</h2>

      {orders.length === 0 && (
        <h4>No Orders Yet</h4>
      )}

      {orders.map(order => (
        <Card key={order.id} className="mb-4">
          <Card.Body>

            <Card.Title>
              Order Date: {order.date}
            </Card.Title>

            {order.items.map(item => (
              <div key={item.id}>
                {item.title} —
                Qty: {item.quantity} —
                ₹ {item.price * item.quantity}
              </div>
            ))}

            <h5 className="mt-2">
              Total: ₹ {order.totalAmount}
            </h5>

          </Card.Body>
        </Card>
      ))}
    </Container>
  );
};

export default OrderHistory;