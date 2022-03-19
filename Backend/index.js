const express = require("express");
require('./db/config');
const cors = require('cors');
const User = require('./db/User');
const Product = require('./db/Product');
const res = require("express/lib/response");
const app = express();
app.use(express.json());
app.use(cors());


app.post("/register", async (req, resp) => {
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password
    resp.send(result);
})

app.post("/login", async (req, resp) => {
    // console.log(req.body);
    if (req.body.password && req.body.email) {
        let user = await User.findOne(req.body).select("-password");//findOne is lye q  ka ak he result match krna.
        if (user) {
            resp.send(user);
        }
        else {
            resp.send({ result: "No User Found" })
        }
    }
    else {
        resp.send({ result: "No  Found" })
    }
})

app.post("/add-product", async (req, resp) => {
    let product = new Product(req.body);
    let result = await product.save();
    resp.send(result);
})

app.get("/products", async (req, resp) => {
    let products = await Product.find();
    if (products.length > 0) {
        resp.send(products);
    }
    else {
        resp.send({ result: "Result not FOund" });
    }
})

app.delete("/product/:id", async (req, resp) => {
    let result = await Product.deleteOne({ _id: req.params.id });
    resp.send(result);
})

app.get("/product/:id", async (req, resp) => {
    let result = await Product.findOne({ _id: req.params.id });

    if (result) {
        resp.send(result);
    }
    else {
        resp.send({ result: "Record not Found" });
    }
})
app.put("/product/:id", async (req, resp) => {
    let result = await Product.updateOne(
        { _id: req.params.id },
        { $set: req.body }
    )
    resp.send(result);
});

app.get("/search/:key",async(res,resp)=>{
    let result=await Product.find({
        "$or":[
            {name: {$regex:res.params.key}},
            {category: {$regex:res.params.key}},
            {company: {$regex:res.params.key}}
        ]
    })
    resp.send(result);
})
app.listen(7000, () => console.log("app listening on 5000"));


