let loginBtn = document.getElementById("Login");
let logoutBtn = document.getElementById("Logout");
const el = document.getElementById('test');
let users = [];
fetch("https://63debe54f1af41051b181ca8.mockapi.io/users")
.then((response) => {
    return response.json();
})
.then((data) => {
    console.log(data);
    users = data;
});

isUserLogged();


loginBtn.addEventListener("click", () => {
    exampleModal.innerText = "Login";
    modalFooter.style.display = "none";
    modalBody.innerHTML = createLoginForm();
    let submitLoginBtn = document.getElementById("submitBtn");
    submitLoginBtn.addEventListener("click", (e) => {
        e.preventDefault();
        let inputArray = document.querySelectorAll("input");
       let emptyField = false;
        inputArray.forEach(element => {
            if(element.value === "") {
                emptyField = true;
                return;
            }
        
       });
       if(emptyField) {
        let errorAll = document.getElementById("errorAll");
        errorAll.innerText = "Please fill all of the fields";
        return;
       }
       login();
    })
});

function createLoginForm() {

    return `
    <form class="row g-3 needs-validation dis-flex_justcont-cent width-100" novalidate id="myForm">
    <div class="error" id="errorAll"></div>  
    <div class="col-md-7">
    <label for="email" class="form-label">Email</label>
    <input type="email" class="form-control" id="email" name="email" onblur="validateInput(this)" required>
    <div class="error">      
    </div>
    </div>
    <div class="col-md-7">
    <label for="password" class="form-label">Password</label>
    <input type="password" class="form-control" id="password" name="password" onblur="validateInput(this)"  required>
    <div class="error">      
    </div>
    </div>
      <div class="col-12 dis-flex_justcont-cent">
        <button  class="btn btn-primary" id="submitBtn" type="submit">Login</button>
      </div>
    </form>
    `
    }

    function uuidv4() {
        return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
          (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        );
    }
    function login() {
        let emailInput = document.getElementById("email");
        let passwordInput = document.getElementById("password");
        let errorAll = document.getElementById("errorAll");
        let user = users.find(el => el.email === emailInput.value);
        if(!user) {
            errorAll.innerText = "Email is not valid";
            return;
        }
        if(!user.password === passwordInput.value) {
            errorAll.innerText = "Password is not valid";
            return;
        }
        let token = uuidv4();
        localStorage.setItem('token',token);

simulateClick( el );
        loginBtn.style.display = 'none';
        registerBtn.style.display = 'none';
        logoutBtn.style.display = 'block';
    }

    function userLoggedIn() {
        loginBtn.style.display = "none";
        registerBtn.style.display = "none";
        logoutBtn.style.display = "block"
    }


function isUserLogged() {
    if(localStorage.getItem("token")) {
        userLoggedIn()
    }
}

function logout() {
    loginBtn.style.display = 'block';
    registerBtn.style.display = 'block';
    logoutBtn.style.display = 'none';
    localStorage.removeItem("token");
}



function simulateClick(element){  
    trigger( element, 'click' );
    console.log(element)

    function trigger( elem, event ) {
      elem.dispatchEvent( new MouseEvent( event ) );
    }
}