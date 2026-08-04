const PRODUCTS=[
{id:1,name:"Founders Varsity Jacket",category:"jacket",price:1250,color:"Burgundy / Beige",img:"founders-jacket.svg",desc:"Our signature made-to-order varsity jacket."},
{id:2,name:"Denim Varsity Jacket",category:"jacket",price:1250,color:"Vintage Blue",img:"denim-jacket.svg",desc:"A classic denim take on the varsity silhouette."},
{id:3,name:"Olive Green Varsity Jacket",category:"jacket",price:1250,color:"Olive / Beige",img:"olive-jacket.svg",desc:"A statement varsity jacket in olive."},
{id:4,name:"OBSESSED Signature Hoodie",category:"hoodie",price:899,color:"Beige",img:"signature-hoodie.svg",desc:"The everyday OBSESSED essential."},
{id:5,name:"Classic Zip Hoodie",category:"hoodie",price:899,color:"Burgundy",img:"classic-hoodie.svg",desc:"A clean zip hoodie with OBSESSED attitude."}
];
let cart=JSON.parse(localStorage.getItem("obsessedCart")||"[]");

const money=n=>"R"+n.toLocaleString("en-ZA");
function renderProducts(filter="all"){
 const grid=document.getElementById("productGrid");
 const list=filter==="all"?PRODUCTS:PRODUCTS.filter(p=>p.category===filter);
 grid.innerHTML=list.map(p=>`<article class="product-card">
   <div class="pic"><img src="${p.img}" alt="${p.name}"></div>
   <div class="product-info"><div class="meta">${p.color}</div><h3>${p.name}</h3><div class="price">${money(p.price)}</div></div>
   <button class="add" aria-label="Add ${p.name}" onclick="addToCart(${p.id})">+</button>
 </article>`).join("");
}
function addToCart(id){const p=PRODUCTS.find(x=>x.id===id);const item=cart.find(x=>x.id===id);item?item.qty++:cart.push({id,qty:1});saveCart();showToast(`${p.name} added to cart`);}
function saveCart(){localStorage.setItem("obsessedCart",JSON.stringify(cart));renderCart();document.getElementById("cartCount").textContent=cart.reduce((s,x)=>s+x.qty,0);}
function renderCart(){
 const el=document.getElementById("cartItems");
 if(!cart.length){el.innerHTML='<div style="padding:50px 0;text-align:center;color:#776d65">Your cart is waiting for its first obsession.</div>';document.getElementById("cartTotal").textContent="R0";return;}
 el.innerHTML=cart.map(i=>{const p=PRODUCTS.find(x=>x.id===i.id);return `<div class="cart-item"><img src="${p.img}" alt=""><div><h4>${p.name}</h4><p>${p.color}</p><div class="qty"><button onclick="changeQty(${p.id},-1)">−</button><span>${i.qty}</span><button onclick="changeQty(${p.id},1)">+</button></div></div><div><strong>${money(p.price*i.qty)}</strong><br><button class="remove" onclick="removeItem(${p.id})">Remove</button></div></div>`}).join("");
 document.getElementById("cartTotal").textContent=money(cart.reduce((s,i)=>s+PRODUCTS.find(p=>p.id===i.id).price*i.qty,0));
}
function changeQty(id,n){const i=cart.find(x=>x.id===id);if(!i)return;i.qty+=n;if(i.qty<1)cart=cart.filter(x=>x.id!==id);saveCart();}
function removeItem(id){cart=cart.filter(x=>x.id!==id);saveCart();}
function openCart(){document.getElementById("cart").classList.add("open");document.getElementById("overlay").classList.add("open");}
function closeCart(){document.getElementById("cart").classList.remove("open");document.getElementById("overlay").classList.remove("open");}
function goCheckout(){if(!cart.length){showToast("Your cart is empty");return}closeCart();document.getElementById("checkoutTotal").textContent=document.getElementById("cartTotal").textContent;document.getElementById("checkout").classList.add("open");}
function closeCheckout(){document.getElementById("checkout").classList.remove("open")}
function placeOrder(e){e.preventDefault();cart=[];saveCart();closeCheckout();showToast("Order received — thank you for choosing OBSESSED.");setTimeout(()=>alert("Demo order complete. Before launch, connect a real payment gateway and order database."),350);}
function subscribe(e){e.preventDefault();document.getElementById("email").value="";showToast("You're on the list. Welcome to the obsession.");}
function showToast(t){const x=document.getElementById("toast");x.textContent=t;x.classList.add("show");clearTimeout(window.tt);window.tt=setTimeout(()=>x.classList.remove("show"),2400);}
function focusSearch(){const q=prompt("Search OBSESSED products:");if(q)showToast("Search is ready for the next build phase.");}
document.querySelectorAll(".filter").forEach(b=>b.addEventListener("click",()=>{document.querySelectorAll(".filter").forEach(x=>x.classList.remove("active"));b.classList.add("active");renderProducts(b.dataset.filter);}));
renderProducts();saveCart();




  alert("SUPABASE ERROR:\n" + error);
});
