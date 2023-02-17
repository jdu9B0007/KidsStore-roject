// Load JSON data and make page resposive lines 1-126
import products from "./products.json" assert { type: "json" };
let screenBig = false;
let screenMin = false;
let isOpen = false;
let cart;
let screenSize = 768
toastr.options = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-top-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "100",
    "hideDuration": "200",
    "timeOut": "1000",
    "extendedTimeOut": "500",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}

if (window.innerWidth <= screenSize) {
    screenMin = true;
    cart = document.querySelector("#cartMax").innerHTML
    document.querySelector("#cartMenu").remove();
    document.querySelector("#cartMin").innerHTML = cart
    document.querySelector("#cartMenu").classList.remove("cartMenuMax")
    document.querySelector("#cartMenu").classList.add("cartMenuMin")
} else {
    screenBig = true;
}

const main = document.querySelector("#items");
products.forEach(product => {
    let item = MakeProduct(product);
    const productDispay = document.createElement("div");
    productDispay.setAttribute("class", "col-lg-4 col-md-6 p-2");
    productDispay.innerHTML = item;
    main.append(productDispay);
});


// let CartMenu = document.querySelector("#cartMenu");
// document.querySelector("#cartMenu a").onclick = function () {
//     document.querySelector("#cartMenu").classList.toggle("cartMenu-hidden")
//     setTimeout(() => {
//         document.querySelector("#siteBody").classList.toggle("poswidth1")
//         document.querySelector("#siteBody").classList.toggle("poswidth2")
//     }, 500);
//     document.querySelector("#cartMenu").style.height = "0px";

// }



document.querySelector("#CartIcon").onclick = function () {
    isOpen = !isOpen
    if (document.querySelector("#cartMenu").classList.contains("cartMenu-hidden")) {
        document.querySelector("#siteBody").classList.toggle("poswidth1")
        document.querySelector("#siteBody").classList.toggle("poswidth2")
        if (screenMin) {
            document.querySelector("#cartMenu").style.height = "25vh";
        } else {
            document.querySelector("#cartMenu").style.height = "calc( 100vh - 60px - 2.5rem - 30px)";
        }
        setTimeout(() => {
            document.querySelector("#cartMenu").classList.toggle("cartMenu-hidden")
        }, screenBig ? 250 : 0);

    } else {
        document.querySelector("#cartMenu").classList.toggle("cartMenu-hidden")
        setTimeout(() => {
            document.querySelector("#siteBody").classList.toggle("poswidth1")
            document.querySelector("#siteBody").classList.toggle("poswidth2")
        }, 500);
        document.querySelector("#cartMenu").style.height = "0px";
    }

}

window.onresize = resize;

function resize() {

    if (window.innerWidth <= screenSize) {
        screenMin = true
        cart = document.querySelector("#cartMax").innerHTML
        if (screenBig == screenMin) {
            document.querySelector("#cartMenu").remove();
            document.querySelector("#cartMin").innerHTML = cart
            document.querySelector("#cartMenu").classList.remove("cartMenuMax")
            document.querySelector("#cartMenu").classList.add("cartMenuMin")
            if (isOpen) {
                document.querySelector("#cartMenu").style.height = "25vh";
            }
            ReloadCartPanel()

        }
        screenBig = false
    } else {
        screenBig = true
        cart = document.querySelector("#cartMin").innerHTML
        if (screenBig == screenMin) {
            document.querySelector("#cartMenu").remove();
            document.querySelector("#cartMax").innerHTML = cart
            document.querySelector("#cartMenu").classList.remove("cartMenuMin")
            document.querySelector("#cartMenu").classList.add("cartMenuMax")
            if (isOpen) {
                document.querySelector("#cartMenu").style.height = "calc( 100vh - 60px - 2.5rem - 30px)";
            }
            ReloadCartPanel()
        }
        screenMin = false
    }
}

function MakeProduct(product) {
    let a = `
    <div class="col-12 p-1" style="border-radius: 10px; block-size: fit-content; background-color: white;">

            <div class="imageBack">
                <img src="images/${product.image}" class="card-img-top rounded ProductImage" />
            </div>
            <div class="ProductCard">
                <div class="card-body">
                    <div class="pl-1">
                        <p class="PrTitle">
                            ${product.name}
                        </p>
                    </div>
                    <div class="pl-1">
                        <p class="ProductDescription" title="${product.description}">
                        ${product.description}
                        </p>
                    </div>
                    <div class="pl-1">
                        <div class="PrPrice">
                            ${product.price}
                        </div>
                    </div>
                </div>
            </div>
            <div class="mx-4 mb-4">
                <a class="form-control mt-1 AddToCart" data-productId="${product.id}">
                    add to cart
                </a>
            </div>
            
        </div>
`
    return a;
}
///////////////////////////////////////////////////////////////////////////
//Initialize Local storage variables
if (localStorage.getItem('')) {

}


let CartProducts = {

}

let AddToCartButtons = document.querySelectorAll(".AddToCart")
AddToCartButtons.forEach(e => {
    CartProducts[e.getAttribute('data-productId')] = 0;
});

AddToCartButtons.forEach(e => {
    e.onclick = function () {
        if (CheckAcc()) {
            UserData = JSON.parse(localStorage.getItem(sessionStorage.getItem('ActiveUser')))
            if (UserData.CartProducts[e.getAttribute('data-productId')] != null) {
                UserData.CartProducts[e.getAttribute('data-productId')] = Number(UserData.CartProducts[e.getAttribute('data-productId')]) + Number(1);
            } else {
                UserData.CartProducts[e.getAttribute('data-productId')] = Number(1);
            }
            localStorage.setItem(sessionStorage.getItem('ActiveUser'), JSON.stringify(UserData))
            // console.log(localStorage.getItem(sessionStorage.getItem('ActiveUser')))
            toastr["success"]("Added to Cart Succesfully")
            ReloadCartPanel()
        } else {
            Swal.fire({
                template: '#my-template'
            }).then((result) => {
                if(result.isConfirmed) {
                    window.location.assign(window.location.origin+"/Account/Login.html")
                }
                if(result.isDenied) {
                    window.location.assign(window.location.origin+"/Account/Register.html")
                }
            })
        }
    }
});

/////////
// Cart Load


let UserData = undefined
function CheckAcc() {
    if (sessionStorage.getItem('ActiveUser') == null) {
        console.log("please login")

        return false;
    } else {
        UserData = JSON.parse(localStorage.getItem(sessionStorage.getItem('ActiveUser')))
        if (UserData.CartProducts == undefined) {
            UserData.CartProducts = CartProducts
            localStorage.setItem(sessionStorage.getItem('ActiveUser'), JSON.stringify(UserData))
        }
        return true
    }
}



function CartLoad() {
    let Cartitems = document.querySelector("#CartItems");
    let ActiveUserData = JSON.parse(localStorage.getItem(sessionStorage.getItem('ActiveUser')))
    if (ActiveUserData != null) {
        for (const key in ActiveUserData.CartProducts) {
            if (ActiveUserData.CartProducts[key] != 0) {
                let item = CartMake(ActiveUserData.CartProducts[key], Number(key))
                let cartDispay = document.createElement("div");
                cartDispay.setAttribute("class", "itemFlex");
                cartDispay.setAttribute("data-productCartId", key);
                cartDispay.innerHTML = item;
                Cartitems.append(cartDispay);
            }

        }
    } else {
        console.log("No cart data")
    }

}


function CartMake(productNumber, key) {
    let product
    products.forEach(u => {
        if (u.id == key) {
            product = u
        }
    })
    let cart = `<div class="ItemImage">
    <img class="imgIcon" src="./images/${product.image}" alt="product image">
  </div>
  <div class="ItemTitle">
    <div class="cartTitle" >
      ${product.name}
    </div>
    <div>
    <span id="price">${product.price}</span> x 
    <input class="CartItemNumbers" type="number" id="quantity" name="quantity" min="0" max="99" value="${productNumber}">
    <span class="DeleteButton">
    <i class="bi bi-trash delIcon" style="margin-left:5px"></i>
    </span>
    </div>
    <hr>
  </div>
  `

    return cart;
}



function CartReload() {
    let cartMenu = document.querySelector("#cartMenu");
    document.querySelector("#CartItems").remove();
    let CartItemsList = document.createElement("div");
    CartItemsList.setAttribute("id", "CartItems");
    cartMenu.append(CartItemsList);
}

function ReloadCartPanel() {
    CartReload();
    CartLoad();
    AddButton();
    DeleteButton()
    TotalCalculate()
}


function AddButton() {
    let inputN = document.querySelectorAll("div[data-productcartid]");
    inputN.forEach(u => {
        let productcartid = u.getAttribute("data-productcartid")
        u.querySelector(".CartItemNumbers").addEventListener('input', function () {
            // console.log(productcartid);
            let Data = JSON.parse(localStorage.getItem(sessionStorage.getItem("ActiveUser")))
            Data.CartProducts[productcartid] = this.value

            localStorage.setItem(sessionStorage.getItem("ActiveUser"), JSON.stringify(Data))
            // console.log(Data)
            // console.log(JSON.parse(localStorage.getItem(sessionStorage.getItem("ActiveUser"))))
            if (this.value < 1) {
                toastr["info"]("Item removef from Cart")
                ReloadCartPanel()
            }
            TotalCalculate()

        })
        // console.log(inputN[0].querySelector(".CartItemNumbers").value);

    })
}

function DeleteButton(params) {
    let inputN = document.querySelectorAll("div[data-productcartid]");
    inputN.forEach(u => {
        let productcartid = u.getAttribute("data-productcartid")
        u.querySelector(".DeleteButton").addEventListener('click', function () {
            // console.log(productcartid);
            let Data = JSON.parse(localStorage.getItem(sessionStorage.getItem("ActiveUser")))
            Data.CartProducts[productcartid] = 0;

            localStorage.setItem(sessionStorage.getItem("ActiveUser"), JSON.stringify(Data))
            // console.log(Data)
            // console.log(JSON.parse(localStorage.getItem(sessionStorage.getItem("ActiveUser"))))
            toastr["info"]("Item removef from Cart")
            ReloadCartPanel()
        })
        // console.log(inputN[0].querySelector(".CartItemNumbers").value);


    })
}

function TotalCalculate() {
    let total = 0;
    let ActiveUserData = JSON.parse(localStorage.getItem(sessionStorage.getItem('ActiveUser')))
    if (ActiveUserData != null) {
        for (const key in ActiveUserData.CartProducts) {
            if (ActiveUserData.CartProducts[key] != 0) {
                products.forEach(u => {
                    if (u.id == key) {
                        total += (ActiveUserData.CartProducts[key] * u.price)
                    }
                })
            }

        }
    }
    document.getElementById("TotalValue").innerHTML = total.toFixed(2);

}
ReloadCartPanel()
