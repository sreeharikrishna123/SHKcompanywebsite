const API = "http://localhost:3000";

function showOnly(id){
    document.querySelectorAll('.page').forEach(p=>p.style.display='none');
    document.getElementById(id).style.display='block';
}

function login(){
    if(username.value==="SHK01" && password.value==="hari999"){
        showOnly("dashboardPage");
    } else {
        loginError.innerText="Invalid credentials";
    }
}

function goPage(id){
    showOnly(id);
    loadData();
}

async function addCustomer(){

    let data = {
        name:custName.value,
        phone:custPhone.value,
        boards:custBoards.value,
        sent:sent.checked,
        received:received.checked,
        time:new Date().toLocaleDateString()
    };

    await fetch(API+"/add",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(data)
    });

    alert("Customer Added");
}

async function loadData(){

    let res = await fetch(API+"/data");
    let data = await res.json();

    let pendingHTML="";
    let historyHTML="";

    data.forEach((c,index)=>{

        if(c.sent && c.received){

            historyHTML += `
                <div>
                <p>${c.name} - ${c.phone} - ${c.boards} - ${c.time}</p>
                <button onclick="deleteCustomer(${index})">Delete</button>
                <hr>
                </div>
            `;

        }else{

            pendingHTML += `
                <div>
                <p>${c.name} - ${c.phone} - ${c.boards} - ${c.time}</p>
                <button onclick="deleteCustomer(${index})">Delete</button>
                <hr>
                </div>
            `;

        }

    });

    pendingList.innerHTML=pendingHTML;
    historyList.innerHTML=historyHTML;
}

async function deleteCustomer(index){

    await fetch(API+"/delete/"+index,{
        method:"DELETE"
    });

    loadData();
}

showOnly("loginPage");