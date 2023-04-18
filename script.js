const { type } = require("os");
export async function login(){
    uname=document.getElementById('uname').value;
    pwd=document.getElementById('pwd').value;
    let login=fetch('http://localhost:3000/login',{
    method:"POST",
    body:JSON.stringify({
        uname,
        pwd,
    }),
    headers:{
        "Content-Type":"application/json"
    }
});
    let response= await login.json();
    console.log(response.token)
    localStorage.setItem("token",response.token)
}
export async function profile(){
    let profile=fetch('http://localhost:3000/profile',{
        method:"POST",
        headers:{
            "Content-Type": "application/json",
            "authorization": "Bearer"+localStorage.getItem("token")
        }
    });
    let response=await profile.json();
    console.log(response);
}