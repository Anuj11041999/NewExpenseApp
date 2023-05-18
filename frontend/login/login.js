function login(e) {
    e.preventDefault();
    console.log(e.target.name);

    const loginDetails = {
        email: e.target.email.value,
        password: e.target.password.value

    }
    axios.post('http://localhost:3000/user/login',loginDetails).then(response => {
            alert(response.data.message)
            console.log(response.data)
            localStorage.setItem('token', response.data.token)
            window.location.href = "../index/index.html"
    }).catch(err => {
        console.log(JSON.stringify(err.response.data))
        document.body.innerHTML += `<div style="color:red;">${err.message} <div>`;
    })
}

const forgot  = document.getElementById('forgot');
forgot.addEventListener('click',()=>{
    document.getElementById("loginForm").style.display = "none";
  document.getElementById("forgotPasswordForm").style.display = "block";
})

document.getElementById("submitEmail").addEventListener("click", async function(event) {
    event.preventDefault();
    try{
        const email = document.getElementById("email").value;
        console.log('yes');
        const response = await axios.post("https://localhost:3000/password/forgotpassword", { email })
        console.log(response);
      console.log("Forgot password email sent successfully!");
    }catch(error) {
        console.error("Failed to send forgot password email:", error);
      }
  });















