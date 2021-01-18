function listItems(){
    
    let listing = document.getElementById('itemContainer');
	let index = 0;
	for(let d of data['items']){
            let div = document.createElement('div');
            div.classList.add('col-md-4');
			div.classList.add('col-sm-6');
			div.classList.add('col-xs-12');
            div.innerHTML = `<div class='item'>
                                <div class='productImage'>
                                    <div class='conditions-box'>
                                        <span class='sale_product'>${d['discount']}% Off</span>
                                    </div>
                                    <img src='${d['image']}' />
                                </div>
                                <div class='productDescription'>
                                    <div class='productname'><p>${d['name']}</p></div>
                                    <div class='product-price-and-shipping'>
                                        <div class='buttonContainer'>
                                            <button class='addtocart' onclick='listAddCart(${index})'>Add To Cart</button>
                                        </div>
                                        <div class='content-price'>                                            
                                            <span class='regular-price'>$&nbsp;${d['price']['display']}</span>
											<span class='price'>$&nbsp;${d['price']['actual']}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
            `;           
            listing.appendChild(div);
			index++;
        }
    
    
}

function listAddCart(itemIndex) {
	
	var selectedItem = data['items'][itemIndex];
	var cartItem = null;
	for(let d of dataCart['items']) {
		if(d.name == selectedItem['name']) {
			d.qty = d.qty + 1;
			cartItem = d;
			document.getElementById("number_" + d.itemIndex).value = d.qty;
			document.getElementById("aprice_" + d.itemIndex).innerText = d.qty * d.aPrice;
			break;
		}
		
	}
	let addcart = document.getElementById('cartContainer');
	if(cartItem == null || cartItem == "undefined") {
		let tr = document.createElement('tr');
		tr.innerHTML = `
		<td>
                                        <div class='imgContainer'>
                                            <img src='${selectedItem['image']}' />
                                            <span class='itemRemove'>X</span>
                                            <span class='itemName'>${selectedItem['name']}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <input onclick='updateValue(${itemIndex}, 1)' type='button' value='+' class='incrementBtn' />
                                        <input id='number_${itemIndex}' type='text' value='1' class='countText' />

                                        <input onclick='updateValue(${itemIndex}, -1)' type='button' value='-' class='decrementBtn' />
                                    </td>
                                    <td><span id='aprice_${itemIndex}'>${selectedItem['price']['actual']}</span></td>
		`;
		addcart.appendChild(tr);
		var obj = `{
           "name" : "${selectedItem['name']}",
           "qty" : 1,
		   "itemIndex": ${itemIndex},
		   "aPrice": ${selectedItem['price']['actual']},
		   "dPrice": ${selectedItem['price']['display']}
           }`;

           
		
		dataCart['items'].push(JSON.parse(obj));
		console.log(dataCart);
	}
	totalValue();
}

function updateValue(itemIndex, increment) {
           for(let d of dataCart['items']) {
		if(d.itemIndex == itemIndex) {
			d.qty = d.qty + increment;
			if(d.qty < 0) {
				d.qty = 0;
			}
			document.getElementById("number_" + d.itemIndex).value = d.qty;
			document.getElementById("aprice_" + d.itemIndex).innerText = d.qty * d.aPrice;
			break;
		}
		
	} 
	totalValue();
}  

function totalValue() {
	var totalQty = 0;
	var totalItemprice = 0;
	var totalDiscount = 0;
	
           for(let d of dataCart['items']) {
		totalQty = totalQty + d.qty;
		totalItemprice = totalItemprice + (d.dPrice * d.qty);
		totalDiscount = totalDiscount + (d.aPrice * d.qty);		
		
	} 
	document.getElementById("totalItemQty").innerText = totalQty;
		document.getElementById("totalItemPrice").innerText = totalItemprice;
		document.getElementById("discount").innerText = totalDiscount;
		document.getElementById("rTotal").innerText = totalItemprice - totalDiscount;
}  