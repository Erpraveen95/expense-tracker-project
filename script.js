const balance =document.getElementById("balance")
const money_plus = document.getElementById("money-plus")
const money_minus = document.getElementById('money-minus')

const text = document.getElementById('text')
const amount = document.getElementById('amount')
const form = document.querySelector('#form')
const userList = document.getElementById('list')

form.addEventListener('submit',onSubmit)

window.addEventListener("DOMContentLoaded",()=>{
    axios.get('https://crudcrud.com/api/2e4518a69ec646468075d5cfcbb66733/tracker')
    .then(res=>{
       for(let i=0;i<res.data.length;i++){
        updateDom((res.data)[i])
       }
      
    })
    .catch(err=>console.error(err))
    }) 


async function onSubmit(e){
    
    try{
        e.preventDefault();
        if(amount.value === "" ||text.value == ""){
            alert("please input field")
        }else{
            const userDetails ={
                description: text.value,
                amount:amount.value
            }

          const vi = await axios.post('https://crudcrud.com/api/2e4518a69ec646468075d5cfcbb66733/tracker',userDetails)
            
                console.log(vi,'details saved success')
                updateDom(userDetails)
              
                text.value =""
                amount.value =""
            }
        }
        catch{
            console.error(err)
        }
}
// update dom
function updateDom(user){
    if(user.amount > 0){
           let temp = money_plus.textContent
           temp = parseInt(temp) + parseInt(user.amount)
           money_plus.textContent = `₹${temp}/-`
           let oldBal = balance.textContent
           oldBal = parseInt(oldBal) + parseInt(user.amount)
           balance.textContent = `₹${oldBal}/-`

    }else{
        let temp = money_minus.textContent
        temp = parseInt(temp) + parseInt(user.amount)
        money_minus.textContent = `₹${temp}/-`;
        let oldBal = balance.textContent
           oldBal = parseInt(oldBal) - parseInt(user.amount)
           balance.textContent = `₹${oldBal}/-`
    }
   
    const item = document.createElement('li');
    item.classList.add(
        `${user.amount}` < 0 ? "minus" : "plus"
    )
    item.id = `"${user._id}"`;
    item.innerHTML =`${user.description}<span id="${user._id}">₹${user.amount}</span>
                    <button onclick=deleteUser('${user._id}') class="delete-btn">X</button>`
    userList.appendChild(item)
    total()                
}




async function deleteUser(id){
    try {
        await axios.delete(`https://crudcrud.com/api/2e4518a69ec646468075d5cfcbb66733/tracker/${id}`)
        console.log('data Succesfully deleted')
         removeUserFromScreen(id)
         total()
    }
    catch{
        err=>console.error(err)
    }  
}
function removeUserFromScreen(id){
  
    const item = document.getElementById(id).parentNode; // get parent <li> element
    item.parentNode.removeChild(item);
  }

async function total(){
    try{
        var totalExpense=0;
        var positive =0
        var negative=0
    var res = await axios.get('https://crudcrud.com/api/2e4518a69ec646468075d5cfcbb66733/tracker')
    
        res.data.forEach(i => {
            //console.log(i)
            totalExpense+=parseInt(i.amount);
            if(i.amount>0){
                positive+=parseInt(i.amount)
            }else{
                negative+=parseInt(i.amount)
            }
           
        });
        
        balance.textContent = `₹${totalExpense}/-`
        money_minus.textContent =`₹${negative}`
        money_plus.textContent =`₹${positive}`
    
    }
    catch{
        err =>console.log(err)
    }
    
// Change element content
   
}
