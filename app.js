const dns = require("node:dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const TotalOrder = require("./models/total-order");
const db = require('./db');
const app = express();

app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(async (req, res, next) => {
  try { await db(); next(); } catch (e) { next(e); }
});
app.get("/", (req, res, next) => {
  TotalOrder.find({ _id: "6ad9f45bf312e4761a4cc9a3" }).then((total) => {
    if (!total) {
      const order = new TotalOrder({
        reelsCreation: {
          qty: 0,
          price: 4999,
        },
        socialMediaMarketing: {
          qty: 0,
          price: 5997,
        },
        contentCreation: {
          qty: 0,
          price: 6000,
        },
        totalPrice: 0,
      });
      order.save();
    }
    return res.render("index");
  })
  .catch(err=>console.log(err));
});
app.get("/offers", (req, res, next) => {
  return TotalOrder.findOne()
    .then((total) => {
      return res.render("offers", {
        total: total,
      });
    })
    .catch((err) => console.log(err));
});
app.post("/offers/add", (req, res, next) => {
  const totalMoney = +req.body.totalMoney;
  const choice = req.body.title;
  TotalOrder.findOne()
    .then((total) => {
      if (choice === "reels-creation") {
        total.reelsCreation.qty += 1;
      } else if (choice === "social-media") {
        total.socialMediaMarketing.qty += 1;
      } else if (choice === "content-creation") {
        total.contentCreation.qty += 1;
      }
      total.totalPrice =
        total.reelsCreation.qty * total.reelsCreation.price +
        total.socialMediaMarketing.qty * total.socialMediaMarketing.price +
        total.contentCreation.qty * total.contentCreation.price;
      return total.save();
    })
    .then(() => {
      TotalOrder.findOne().then((total) => {
        res.status(200).json({ money: total });
      });
    })
    .catch((err) => console.log(err));
});
app.post("/offers/deduce", (req, res, next) => {
  const totalMoney = +req.body.totalMoney;
  const choice = req.body.title;
  TotalOrder.findOne()
    .then((total) => {
      if (choice === "reels-creation") {
        if (total.reelsCreation.qty != 0) {
          total.reelsCreation.qty -= 1;
        }
      } else if (choice === "social-media") {
        if (total.socialMediaMarketing.qty != 0) {
          total.socialMediaMarketing.qty -= 1;
        }
      } else if (choice === "content-creation") {
        if (total.contentCreation.qty != 0) {
          total.contentCreation.qty -= 1;
        }
      }
      total.totalPrice =
        total.reelsCreation.qty * total.reelsCreation.price +
        total.socialMediaMarketing.qty * total.socialMediaMarketing.price +
        total.contentCreation.qty * total.contentCreation.price;
      return total.save();
    })
    .then(() => {
      TotalOrder.findOne().then((total) => {
        res.status(200).json({ money: total });
      });
    })
    .catch((err) => console.log(err));
});
if (process.env.NODE_ENV !== 'production') {
  mongoose
  .connect(MONGODB_URI, { dbName: "komanjy" })
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));
}
module.exports = app;
// mongoose
//   .connect(MONGODB_URI, { dbName: "komanjy" })
//   .then(() => {
//     app.listen(3000);
//   })
//   .catch((err) => console.log(err));
