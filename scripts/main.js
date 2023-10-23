/* Declare and initialize global variables */

    //Declare a const variable named productElement that references the HTML div element that eventually will be populated with product data.
const productElement = document.querySelector("#products");
    //Declare a global empty array variable to store a list of products named templeList.
    // use let not const
let productList= [];

/* async displayProducts Function */

    //Declare a function expression using const named displayproducts that uses an arrow function
    // to accept a list of temples as an array argument.
const displayProducts = (products) =>{
    //Process each product in the product array using a forEach method and do the following for each product item:
    products.forEach((product) => {
    //Create an HTML <article> element (createElement).
    const article= document.createElement("article");    
    //Create an HTML <h3> element and add the product's productName property to this new element.
    const h3 = document.createElement("h3");   
    h3.textContent = product.productName;
    // create price element
    const priceElement = document.createElement('p');
    priceElement.textContent = `價格: $${product.price}`;
    // create quantity element
    const quantityElement = document.createElement('p');
    quantityElement.textContent = `數量: ${product.quantity}`;
    //Create an HTML <img> element and add the product's imageUrl property to the src attribute and 
    //the product's location property to the alt attribute.
    const img = document.createElement("img"); 
    img.src = product.imageUrl;
    img.alt = product.class;
    //Create button for each product
    const button = document.createElement("button");
    button.textContent = "加入購物車";
    // Trigger the addToCart function with the respective product as a parameter in the button's click event listener
    button.addEventListener("click", function() {
        console.log("Button clicked with productId: " + product.productId);
        console.log("Button clicked with productQuantity: " + product.quantity);
        product.quantity = 0;
        addToCart(product.productId);
    });
    //Append the <h3> element and the <img> element to the <article> element as children. (appendChild)
    article.appendChild(h3);
    article.appendChild(img);
    article.appendChild(priceElement);
    article.appendChild(quantityElement);
    article.appendChild(button);
    //Append the <article> element to the global productElement variable declared in Step 2
    productElement.appendChild(article); })

}

/* async getProducts Function using fetch()*/

    //Create another function expression called getProducts. Make it an async anonymous, arrow function.
const getProducts = async () => {
    //In the function, declare a const variable named response that awaits the built-in fetch method calling the product data, absolute URL given in Step 2 above.
    const response = await fetch("https://stdog210420.github.io/best_sale/products.json"); 
    //Convert your fetch response into a JavaScript object (.json) and assign the result to the productList global array variable you declared in Step 3 above. 
    //Make sure the the execution of the code waits here as well until it finishes.
    if (response.ok) {
        // the API will send us JSON...but we have to convert the response before we can use it
        // .json() also returns a promise...so we await it as well.
        // assign the result to the templeList global array variable you declared in Step 3 above. 
        //Make sure the the execution of the code waits here as well until it finishes
        //not use let, it's a local variable. Without the let or const prefix is assumed to be a global variable. 
        productList  = await response.json();
        //The last statement in the getProducts function calls the displayProducts function and passes it the list of products (productList).
        displayProducts(productList);
        console.log(productList)
    }
}   

/* reset Function */

    //Clear the displayed list of products.
const reset = () => {
    //get productElement 
    const productElement = document.querySelector("#products");
    //clear all article elements
    productElement.innerHTML = "";
}

// if (Array.isArray(productList)) {
    // templeList 是一個陣列，可以使用 filter
//     console.error("productList 是一個陣列。");
// } else {
//     console.error("productList 不是一個陣列。");
// }

/* sortBy Function */

    //Declare a function expression named sortBy
    //The function should accept a argument in a parameter named products.
const sortBy = (productList) => {
    //In this function, first call the reset function to clear the output.
    reset ();
    //Define a variable named filter that obtains the value of the HTML element with the ID of sortBy (The pull-down menu).
    const filter = document.querySelector("#sortBy").value;
    //Use a switch statement that uses the filter value as the selector responding to four (4) cases.
    //For each case, call the displayProducts function using an filter statement that filters the products parameter for the four options provided.
    switch (filter) {
        //"utah": filter for products where the location contains "束口提袋" as a string.
        case "handbag":
            const handbag =productList.filter((product) => product.class.includes("束口提袋"));
            displayProducts(handbag);
            break;
        //"nonutah": filter for products where the location does not contain "束口提袋" as a string.
        case "notHandbag":
            const notHandbag = productList.filter((product) => !product.class.includes("束口提袋"));
            displayProducts(notHandbag);
            break;
        //"all": no filter. Just use products as the argument.
        case "all":
            displayProducts(productList);
            break;
    }
}
/* Event Listener */

    //Add a change event listener to the HTML element with an ID of sortBy that calls the sortBy function 
    //and sends a arrow function result with the productList as the argument.
    document.querySelector("#sortBy").addEventListener("change", () => {sortBy(productList)});

    getProducts();

// Add shopping cart button functionality
const addToCartButton = document.getElementById("addToCart");
const cartItems = document.getElementById("cart-items");
const totalQuantity = document.getElementById("quantity");
const totalCost = document.getElementById("total");
let cart = [];
let totalPrice = 0;
let sum = 0;
//click button function
function addToCart(productId) {
    const product = productList.find((item) => item.productId === productId);
    console.log(product)

    if (product) {
        // If the product is found, add it to the cart
        cart.push(product);
        // Update the quantity of the added product
        product.quantity++;

        // Create a new list element
        const listItem = document.createElement("li");
        listItem.textContent = `商品編號: ${product.productId}, 商品名稱: ${product.productName}, 價格: $${product.price}, 數量: ${product.quantity}`;
        // add listItem to the shopping cart
        cartItems.appendChild(listItem);

        //update total number
        sum += product.quantity;
        console.log(totalQuantity)
        console.log(product.quantity)
        // update total price
        totalPrice += product.price * product.quantity;
        totalQuantity.textContent = `合計: ${sum}`;
        totalCost.textContent = `總金額: $${totalPrice}`;
    } else {
        // Handle the case where the product is not found
        console.log("Product not found.");
    }
}
// Get a reference to the "Clear" button element
const clearCartButton = document.getElementById("clearCart");

// Add a click event listener to the "Clear" button
clearCartButton.addEventListener("click", () => {
    // Clear the shopping cart
    cart = [];
    sum = 0;
    totalPrice = 0;

    // Remove all items from the cart display
    cartItems.innerHTML = ""; // Assuming "cartItems" is the container for cart items

    // Update the total cost and total quantity displays
    totalCost.textContent = "總金額: $0";
    totalQuantity.textContent = "合計: 0"; // Make sure to use the correct element

    // You can also add additional logic as needed, like showing a message or resetting other parts of your application.
});

