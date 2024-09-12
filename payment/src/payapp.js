import React, { useState } from "react";
import axios from "axios";
import { Container, Box, TextField, Button, Typography } from "@mui/material";

const Payapp = () => {
  const [amount, setAmount] = useState("");

  const handlePayment = async () => {
    try {
      const orderResponse = await axios.post("http://localhost:5000/api/create-order", {
        amount: amount
      });

      const { id: order_id, currency, amount: order_amount } = orderResponse.data;

      const options = {
        key: "rzp_test_VkzPrkBPfLyk9p",
        amount: order_amount,
        currency: currency,
        name: "Your Company Name",
        description: "Test Transaction",
        order_id: order_id,
        handler: async (response) => {
          try {
            const paymentId = response.razorpay_payment_id;
            const orderId = response.razorpay_order_id;
            const signature = response.razorpay_signature;

            await axios.post("http://localhost:5000/api/payment-verification", {
              razorpay_order_id: orderId,
              razorpay_payment_id: paymentId,
              razorpay_signature: signature
            });

            alert("Payment Transfer Successful");
          } catch (error) {
            console.error("Error processing payment", error);
          }
        },
        prefill: {
          name: "Shubham Sharma",
          email: "shubham.ap.sharma@gmail.com",
          contact: "9777674004",
        },
        theme: {
          color: "#3399cc"
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Error in payment", error);
    }
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ marginTop: 8 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          boxShadow: 3,
          padding: 3,
          borderRadius: 2,
          backgroundColor: "#fff",
        }}
      >
        <Typography component="h1" variant="h5" gutterBottom>
          Make a Payment
        </Typography>
        <TextField
          margin="normal"
          fullWidth
          type="number"
          label="Enter Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <Button
          variant="contained"
          fullWidth
          color="primary"
          onClick={handlePayment}
          sx={{ mt: 2 }}
        >
          Pay Now
        </Button>
      </Box>
    </Container>
  );
};

export default Payapp;
