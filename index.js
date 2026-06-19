let transactions =
JSON.parse(localStorage.getItem("transactions")) || [];

let editIndex = -1;

function saveData(){
localStorage.setItem(
"transactions",
JSON.stringify(transactions)
);
}

function addTransaction(){

let desc =
document.getElementById("desc").value;

let amount =
Number(document.getElementById("amount").value);

let type =
document.getElementById("type").value;

if(desc==="" || amount<=0){
alert("Enter valid data");
return;
}

let item={
desc,
amount,
type
};

if(editIndex===-1){
transactions.push(item); // CREATE
}
else{
transactions[editIndex]=item; // UPDATE
editIndex=-1;
}

saveData();

document.getElementById("desc").value="";
document.getElementById("amount").value="";

render();
}

function render(){

let list =
document.getElementById("list");

list.innerHTML="";

transactions.forEach((t,index)=>{

list.innerHTML+=`
<li>
${t.desc} - ₹${t.amount}
(${t.type})

<div class="actions">

<button onclick="editItem(${index})">
Edit
</button>

<button onclick="deleteItem(${index})">
Delete
</button>

</div>
</li>
`;

});

calculateTotals();
}

function editItem(index){

document.getElementById("desc").value=
transactions[index].desc;

document.getElementById("amount").value=
transactions[index].amount;

document.getElementById("type").value=
transactions[index].type;

editIndex=index;
}

function deleteItem(index){

transactions =
transactions.filter(
(_,i)=>i!==index
); // DELETE

saveData();

render();
}

function calculateTotals(){

let income =
transactions
.filter(t=>t.type==="income")
.reduce(
(sum,t)=>sum+t.amount,
0
);

let expense =
transactions
.filter(t=>t.type==="expense")
.reduce(
(sum,t)=>sum+t.amount,
0
);

let balance =
income-expense;

document.getElementById(
"income"
).innerText=`Income: ₹${income}`;

document.getElementById(
"expense"
).innerText=`Expense: ₹${expense}`;

document.getElementById(
"balance"
).innerText=`Balance: ₹${balance}`;
}

render(); // READ