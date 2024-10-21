const getStoredCart = () => {
  const stroedCartString = localStorage.getItem('cart')

  if(stroedCartString){
    return JSON.parse(stroedCartString)
  }
  return[]
}


const saveCartToLs = cart => {
  const cartStringified = JSON.stringify(cart)
  localStorage.setItem('cart', cartStringified)
}

const addToLS = (id)  => {
    const cart = getStoredCart()
    cart.push(id);
    saveCartToLs(cart)

}


const removeFromLS = id => {
  const cart = getStoredCart();
  const remaining = cart.filter(idx=> idx !== id);
  saveCartToLs(remaining);
}

export{addToLS, getStoredCart , removeFromLS}