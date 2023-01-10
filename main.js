
let searchbtn = document.querySelector("#search-btn");

let cartbtn = document.querySelector("#cart-btn");
let searchsection = document.querySelector(".search");

let shopingcartSection = document.querySelector(".shoping-cart");
//for menu show
let navber = document.querySelector(".header .navbar");
let menubtn = document.querySelector("#menu-btn");

//////for login /////
//let getuser = document.querySelector(".get");
let EmailInput = document.querySelector(".email");
let passwordinput = document.querySelector(".password");
//show login
let logincontaner = document.querySelector(".login-contaner")
let loginshowbtn = document.querySelector("#login-btn");
let Signuplogin = document.querySelector(".Sign-uplogin");
//////////
let signupbtn = document.querySelector(".tosignup");
let signincontaner = document.querySelector(".signin-contaner");
let signup = document.querySelector(".signup");
let emailError = document.querySelector(".email-error");
let passworderror = document.querySelector(".password-error");
let usernameerror = document.querySelector(".username-error");
let username = document.querySelector(".username");
let email = document.querySelector(".emailS");
let passwordSign = document.querySelector(".passwordS");
let phoneNum = document.querySelector(".phonenumber");
let phoneerror = document.querySelector(".phone-error");
/////
let logintohome = document.querySelector('.login');
let emailLoginError = document.querySelector(".email-login-error");
let passwordLoginError = document.querySelector(".password-login-error");
let rememberme = document.querySelector('#remember-me');
let rememberdata = [];
////logout
let logout = document.querySelector(".logout");
logout.addEventListener("click", () => {
    localStorage.removeItem("remembered-user");
    EmailInput.value = "";
    passwordinput.value = "";

})
//login from signup
Signuplogin.addEventListener("click", (e) => {
    e.preventDefault();
    logincontaner.classList.toggle("active");
    signincontaner.classList.remove("active");
});
///
let users = [];
let user = [];
let Rusers = [];
let userdata = [];
/////login to home
logintohome.addEventListener('click', (e) => {
    e.preventDefault();
    let re = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    let emailInput = EmailInput.value;
    let v1, v2 = false;
    if (re.test(emailInput)) {

        v1 = true;
        if (emailLoginError.classList.contains("active")) {
            emailLoginError.classList.remove("active");
        }
    }
    else {
        emailLoginError.classList.add("active");
    }
    if (passwordinput.value.length > 8) {
        console.log("valid password");
        v2 = true;
        if (passwordLoginError.classList.contains("active")) {
            passwordLoginError.classList.remove("active");
        }
    }
    else {
        passwordLoginError.classList.add("active");
    }
    if (v1 && v2) {
        let saveduser = localStorage.getItem('user-info');
        if (saveduser) {

            console.log(JSON.parse(saveduser).email);
            console.log(JSON.parse(saveduser).password);
            let email1 = JSON.parse(saveduser).email;
            let password1 = JSON.parse(saveduser).password;
            if (emailInput === email1 && passwordinput.value === password1) {
                logincontaner.classList.remove('active');

            }
        }

    }
});
signupbtn.addEventListener("click", () => {
    logincontaner.classList.remove("active");
    signincontaner.classList.add("active");
});
rememberme.onchange = function () {
    if (rememberme.checked == true) {
        console.log('checked');
        localStorage.setItem('remembered-user', JSON.stringify({ val: "theremembered", myemail: EmailInput.value, password: passwordinput.value }));
    }
}

signup.addEventListener('click', (e) => {
    e.preventDefault();
    let re = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    let emailInput = email.value;
    let v1, v2, v3, v4 = false;
    if (re.test(emailInput)) {

        v1 = true;
        if (emailError.classList.contains("active")) {
            emailError.classList.remove("active");
        }
    }
    else {
        emailError.classList.add("active");
    }
    if (passwordSign.value.length > 8) {
        console.log("valid password");
        v2 = true;
        if (passworderror.classList.contains("active")) {
            passworderror.classList.remove("active");
        }
    }
    else {
        passworderror.classList.add("active");
    }
    if (username.value != "") {
        console.log("valid username");
        v3 = true;
        if (usernameerror.classList.contains("active")) {
            usernameerror.classList.remove("active");
        }
    }
    else {
        usernameerror.classList.toggle("active");
    }
    if (phoneNum.value != "") {
        console.log("valid phonenum");
        v4 = true;
        if (phoneerror.classList.contains("active")) {
            phoneerror.classList.remove("active");
        }
    }
    else {
        phoneerror.classList.toggle("active");
    }
    if (v1 == true && v2 == true && v3 == true && v4 == true) {
        console.log("valid signup");
        let userinfo = localStorage.getItem("user-info");
        if (userinfo) {
            localStorage.removeItem("user-info");
        }
        postuser();
        username.value = "";
        passwordSign.value = "";
        emailInput = "";
        phoneNum.value = "";
        signincontaner.classList.remove('active');

    }
})

async function postuser() {
    await axios.post('https://restaurant-db-2e9d2-default-rtdb.firebaseio.com/users.json', {
        name: username.value,
        email: email.value,
        password: passwordSign.value,
        phoneNum: phoneNum.value
    }).then((res) => {
        console.log(res.status);
        user = res.data;
    });
    let userid = Object.values(user)[0];
    getuser(userid);

}

async function getuser(userId) {
    await axios.get(`https://restaurant-db-2e9d2-default-rtdb.firebaseio.com/users.json`).then((mydata) => {
        let res = mydata.data;
        users = res;

    });
    userdata = users[userId];
    console.log(userdata);
    localStorage.setItem('user-info', JSON.stringify(userdata));
    Rusers = Object.values(users);
}
/////
searchbtn.addEventListener("click", () => {
    searchsection.classList.toggle("active");
    shopingcartSection.classList.remove("active");
    logincontaner.classList.remove("active");
    console.log("active");
});

cartbtn.addEventListener("click", () => {
    shopingcartSection.classList.toggle("active");
    searchsection.classList.remove("active");
    logincontaner.classList.remove("active");
    console.log("active cart");
});
//show menu navbar
menubtn.addEventListener("click", () => {
    navber.classList.toggle("active")
    logincontaner.classList.remove("active");
    shopingcartSection.classList.remove("active");
    searchsection.classList.remove("active");
})
//show login
loginshowbtn.addEventListener("click", () => {

    logincontaner.classList.toggle("active");
    let rememberuser = localStorage.getItem('remembered-user');
    if (rememberuser) {
        //rememberuser.toString().split(",")[1].split(":")[1].replaceAll('"', '')
        let emailval = JSON.parse(rememberuser).myemail;
        EmailInput.value = emailval;
        passwordinput.value = JSON.parse(rememberuser).password;
    }
    shopingcartSection.classList.remove("active");
    searchsection.classList.remove("active");

})
//home
let home = document.querySelector(".home");
let homePimg = document.querySelector(".home-parallax");
home.addEventListener("mousemove", (e) => {
    let x = (window.innerWidth - e.pageX * 2) / 90;//w of the page - w of element ..i dont understand the ref
    console.log(window.innerWidth);
    console.log(e.pageX * 2);

    let y = (window.innerHeight - e.pageY * 2) / 90;//h of the page - h of element
    console.log(window.innerHeight);
    console.log(e.pageY * 2);
    homePimg.style.transform = `translateX(${y}px) translateY(${x}px)`;

});
home.addEventListener("mouseleave", (e) => {
    homePimg.style.transform = `translateX(${0}px) translateY(${0}px)`;

});
document.querySelector(".tohome").addEventListener("click", () => {
    logincontaner.classList.remove("active");
    shopingcartSection.classList.remove("active");
    searchsection.classList.remove("active");
    signincontaner.classList.remove("active");

})

