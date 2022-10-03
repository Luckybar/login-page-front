$("#submit").click(checkUser);

(function(){
    if (sessionStorage.getItem("token")){
        window.location.href = "index.html";
    }
})()

$("#register").click(function(){
    window.location.href = "register.html";
});

async function checkUser(){
    const acc = $("#username").val();
    const pwd = $("#password").val();
    if (acc === "" || pwd === "") {
        alert("Please input your account and password!");
    }else{
        const token = await login(acc, pwd).then(data => {
            console.log(data);
            return data;
        });
        if (token){
            sessionStorage.setItem("token", token);
            location.reload();
        }else{
            alert("Wrong account or password!");
        }
    }
}




