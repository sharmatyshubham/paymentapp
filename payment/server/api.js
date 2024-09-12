const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const Razorpay = require("razorpay");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const razorpay = new Razorpay({
    key_id: "rzp_test_VkzPrkBPfLyk9p",
    key_secret: "UfNShLd1JkHBW9gIMZKXXFSR"
});

// Create Razorpay order
app.post("/api/create-order", async (req, res) => {
    const { amount } = req.body;

    try {
        const options = {
            amount: amount * 100, // amount in the smallest currency unit
            currency: "INR",
            receipt: `receipt_order_${Date.now()}`
        };

        const order = await razorpay.orders.create(options);
        res.json(order);
    } catch (error) {
        res.status(500).send("Error creating order");
    }
});

// Verify Razorpay payment
app.post("/api/payment-verification", async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    // Logic to verify payment and update the database
    // (This part would involve checking the signature, which is skipped for brevity)

    res.json({ status: "success" });
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
