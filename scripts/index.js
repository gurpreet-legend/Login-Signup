//Functions to toggle between signup and login
function toggleSignup() {
    document.getElementById("login-toggle").style.background = "#fff";
    document.getElementById("login-toggle").style.color = "#222";
    document.getElementById("signup-toggle").style.background = "linear-gradient(to top left,#FA24FA, #6609B8)";
    document.getElementById("signup-toggle").style.color = "#fff";
    document.getElementById("login-form").style.display = "none";
    document.getElementById("signup-form").style.display = "flex";
    // document.querySelector(".body").style.backgroundSize = "contain";
}

function toggleLogin() {
    document.getElementById("login-toggle").style.background = "linear-gradient(to top left,#FA24FA, #6609B8)";
    document.getElementById("login-toggle").style.color = "#fff";
    document.getElementById("signup-toggle").style.background = "#fff";
    document.getElementById("signup-toggle").style.color = "#222";
    document.getElementById("signup-form").style.display = "none";
    document.getElementById("login-form").style.display = "block";
    document.querySelector(".body").style.backgroundSize = "cover";
}

let signupBtn = document.querySelector(".signup")
signupBtn.addEventListener("click",(e)=>{
    e.preventDefault();
    sign_up();
})

async function sign_up () {
    

    let signup_email = document.getElementById("signup-email").value
    let signup_name = document.getElementById("signup-name").value
    let signup_age = document.getElementById("signup-age").value
    let signup_gender = document.getElementById("signup-gender").value
    let signup_address = document.getElementById("signup-address").value
    let signup_more = document.getElementById("signup-more").value

    myObject = {
        signup_email, 
        signup_name, 
        signup_age,
        signup_gender,
        signup_address,
        signup_more
    }

    let params = {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(myObject)
    }
    
    //Signing up the user
    await fetch("/", params)
        .then(response => {
            if (response.status == 402) {
                alert("Username or Email already registered")
            } 
            else {
                window.location = "/welcome"
            }
        })
}


