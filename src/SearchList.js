import React, { useState } from 'react';
import './css/lookUpScreen.css';
import groceryUtils from './grocery';
function SearchList({ filteredItems }) {
  var [groceryItem, setGroceryItem] = useState("");
  var [groceryPrice, setGroceryPrice] = useState("");
  var [amount, setAmountField] = useState("");
  var [zeroDisabled, setZeroDisabled] = useState(true);

  const itemDetails = (item) => {
    document.querySelector('#add-box').style.display = "flex";
    setGroceryItem(item.name);
    setGroceryPrice(item.price);
  }

  const closeAmount = () => {
    document.querySelector('#add-box').style.display = "none";
    document.querySelector("#add-amount").value = "";
  }

  const filtered = filteredItems.map(item =>
    <div key={item.id} onClick={() => { itemDetails(item); }} className="grocery-box">
      <img draggable="false" className="image-item" alt={item.name} src={item.imgPath} />
      <div>
        <div className="item-label" >{item.name}</div>
      </div>
    </div>
  );

  const pressNumberPad = (value) => {
    var prevText = document.querySelector("#add-amount").value;
    document.querySelector("#add-amount").value = prevText + value;
    setAmountField(prevText + value);
    setZeroDisabled(false);
  }

  const removeNumber = () => {
    var prevText = document.querySelector("#add-amount").value;
    prevText = prevText.slice(0, -1);
    document.querySelector("#add-amount").value = prevText;
    setAmountField(prevText);
    if (prevText === "")
      setZeroDisabled(true);
  }

  const generateId = () => new Date().getTime();

  const [item, setItem] = useState({ id: generateId(), name: '', quantity: null });
  const [groceryList, setGroceryList] = useState(groceryUtils.get());

  const enterAmount = () => {
    if (document.querySelector("#add-amount").value === "")
      return;

    setAmountField(document.querySelector("#add-amount").value);

    document.querySelector("#add-amount").value = "";
    document.querySelector('#add-box').style.display = "none";
    document.querySelector('#look-up-screen').style.display = "none";
    document.querySelector('#home-screen').style.display = "flex";
    var groceryTotal = groceryPrice.replace('$', '')
    var value = (parseFloat(amount) * parseFloat(groceryTotal)).toFixed(2)
    groceryTotal = value.toString()

    groceryUtils.createOrUpdate(item.id, groceryItem, parseInt(amount));
    setItem({ id: item.id, name: groceryItem, quantity: parseInt(amount) })
    setGroceryList(groceryUtils.get());
    console.log(groceryUtils.get())
    document.querySelector('#welcome-screen').style.display = "none";
    document.querySelector('#home-screen').style.display = "flex";
    document.getElementById("refresh").click();
    document.location.reload();
  }


  return (
    <>
      <div id="add-box">
        <div id="enter-add">
          <svg id="close-add" onClick={() => { closeAmount(); }} width="16" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.826508" y="16.068" width="20" height="2" transform="rotate(-51.2253 0.826508 16.068)" fill="#161D39" />
            <rect x="2.20688" y="0.594833" width="20" height="2" transform="rotate(50 2.20688 0.594833)" fill="#161D39" />
          </svg>
          <div id="add-question">How many would you like to add {"\n"}for the following item: <input id="item-name" readOnly style={{ fontFamily: "Poppins", fontWeight: "bold", fontSize: "16px", color: "blue", border: "none", width: "100%", textAlign: "center" }} value={groceryItem}></input></div>
          <input readOnly id="add-amount" type="text" />
          <div id="number-pad">
            <input onClick={e => { pressNumberPad(e.target.value); }} value="1" type="button" className="number-btn"></input>
            <input onClick={e => { pressNumberPad(e.target.value); }} value="2" type="button" className="number-btn"></input>
            <input onClick={e => { pressNumberPad(e.target.value); }} value="3" type="button" className="number-btn"></input>
            <div style={{ width: "100%", height: "6px" }}></div>
            <input onClick={e => { pressNumberPad(e.target.value); }} value="4" type="button" className="number-btn"></input>
            <input onClick={e => { pressNumberPad(e.target.value); }} value="5" type="button" className="number-btn"></input>
            <input onClick={e => { pressNumberPad(e.target.value); }} value="6" type="button" className="number-btn"></input>
            <div style={{ width: "100%", height: "6px" }}></div>
            <input onClick={e => { pressNumberPad(e.target.value); }} value="7" type="button" className="number-btn"></input>
            <input onClick={e => { pressNumberPad(e.target.value); }} value="8" type="button" className="number-btn"></input>
            <input onClick={e => { pressNumberPad(e.target.value); }} value="9" type="button" className="number-btn"></input>
            <div style={{ width: "100%", height: "6px" }}></div>
            <input onClick={() => { removeNumber(); }} className="number-btn" id="delete-btn-num" type="button" value="Delete"></input>
            <input disabled={zeroDisabled} onClick={e => { pressNumberPad(e.target.value); }} value="0" type="button" className="number-btn"></input>
            <div onClick={() => { enterAmount(); }} type="button" className="number-btn" id="enter-btn-num">Enter</div>
          </div>
        </div>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-evenly" }}>
        {filtered}
      </div>
    </>
  );
}

export default SearchList;