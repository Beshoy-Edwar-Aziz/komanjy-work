let addBtns = document.querySelectorAll(".add-btn");
let deduceBtns = document.querySelectorAll(".deduce-btn");
const showMoney = document.querySelector(".contain");
const reelsCreation = document.querySelector(".reels-creation");
const contentCreation = document.querySelector(".content-creation");
const socialMedia = document.querySelector(".social-media");
const reelsCreationPrice = document.querySelector(".reels-creation-price");
const socialMediaPrice = document.querySelector(".social-media-price");
const contentCreationPrice = document.querySelector(".content-creation-price");
const totalPrice = document.querySelector(".total-price");
let money = 0;
let content;
addBtns.forEach((add) => {
  add.addEventListener("click", function () {
    console.log(this.parentNode.querySelector('[name="totalMoney"]'));
    fetch("/offers/add", {
      method: "POST",
      body: JSON.stringify({
        totalMoney: +this.parentNode.querySelector('[name="totalMoney"]').value,
        title: this.parentNode.id,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        content = data;
        money = data.money.totalPrice;
        showMoney.innerHTML = `
        <h2>Monthly Total: EGP${money}</h2>
        `;
        reelsCreation.innerHTML = `
        qty: ${data.money.reelsCreation.qty}
        `;
        reelsCreationPrice.innerHTML = `
        EGP${data.money.reelsCreation.qty * data.money.reelsCreation.price}
        `;
        socialMedia.innerHTML = `
        qty: ${data.money.socialMediaMarketing.qty}
        `;
        socialMediaPrice.innerHTML = `
        EGP${data.money.socialMediaMarketing.qty * data.money.socialMediaMarketing.price}
        `;
        contentCreation.innerHTML = `
        qty: ${data.money.contentCreation.qty}
        `;
        contentCreationPrice.innerHTML = `
        EGP${data.money.contentCreation.qty * data.money.contentCreation.price}
        `;
        totalPrice.innerHTML = `
        Total Price= EGP${money}
        `;
      })
      .catch((err) => console.log(err));
  });
});
deduceBtns.forEach((deduce) => {
  deduce.addEventListener("click", function () {
    console.log(this.parentNode.querySelector('[name="totalMoney"]'));
    fetch("/offers/deduce", {
      method: "POST",
      body: JSON.stringify({
        totalMoney: +this.parentNode.querySelector('[name="totalMoney"]').value,
        title: this.parentNode.id,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        content = data;
        money = data.money.totalPrice;
        showMoney.innerHTML = `
        <h2>Monthly Total: EGP${money}</h2>
        `;
        console.log(socialMedia.parentNode);
        reelsCreation.innerHTML = `
        qty: ${data.money.reelsCreation.qty}
        `;
        reelsCreationPrice.innerHTML = `
        EGP${data.money.reelsCreation.qty * data.money.reelsCreation.price}
        `;
        socialMedia.innerHTML = `
        qty: ${data.money.socialMediaMarketing.qty}
        `;
        socialMediaPrice.innerHTML = `
        EGP${data.money.socialMediaMarketing.qty * data.money.socialMediaMarketing.price}
        `;
        contentCreation.innerHTML = `
        qty: ${data.money.contentCreation.qty}
        `;
        contentCreationPrice.innerHTML = `
        EGP${data.money.contentCreation.qty * data.money.contentCreation.price}
        `;
        totalPrice.innerHTML = `
        Total Price= EGP${money}
        `;
      })
      .catch((err) => console.log(err));
  });
});
