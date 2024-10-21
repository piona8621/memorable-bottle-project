import { useEffect } from "react";
import { useState } from "react";
import Bottle from "../../Bottle/Bottle";
import './Bottlos.css'
import { addToLS, getStoredCart, removeFromLS } from "../../../utilities/localstorage";
import Cart from "../../cart/Cart";


const Bottols = () => {


const [bottles, setBottles] = useState([]);

const [cart, setCart] = useState([]);

useEffect(() => {
  fetch('bottle.json')
  .then(res => res.json())
  .then(data => setBottles(data))
},[])


// load cart from local storage

useEffect(() => {
  console.log('called the use effect', bottles.length)
  if(bottles.length > 0){
    const storedCart = getStoredCart()
  console.log(storedCart,bottles);

const saveCart = [];
for (const id of storedCart){
  console.log(id)
  const bottle = bottles.find (bottle => bottle.id === id);
   
  if(bottle) {
    saveCart.push(bottle)
  }

  }

 console.log(saveCart)
 setCart(saveCart)


}
},[bottles])

const handleAddToCart = bottle => {
  // console.log(bottle)
  const newCart = [...cart, bottle]
  setCart(newCart);

  addToLS(bottle.id)

}


const handleRemoveFromCart = id =>{
  // visual cart from remove
  const remanningCart = cart.filter(bottle => bottle.id !== id);
  setCart(remanningCart);
  // remove from ls
  removeFromLS(id);
}



  return (
    <div>
      <h2>Bottles here: {bottles.length}</h2>
      <Cart cart={cart} handleRemoveFromCart={handleRemoveFromCart}></Cart>
      <div className="bottle-container">
      {
        bottles.map(bottle => <Bottle key={bottle.id} bottle={bottle}
        handleAddToCart={handleAddToCart}
        ></Bottle>)
      }
      </div>
    </div>
  );
};

export default Bottols;