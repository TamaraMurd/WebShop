let registerBtn = document.getElementById("Register");
let exampleModal = document.getElementById("exampleModalLabel");
let modalFooter = document.getElementsByClassName("modal-footer")[0];
let modalBody = document.getElementsByClassName("modal-body")[0];

registerBtn.addEventListener("click", () => {
    exampleModal.innerText = "Register";
    modalFooter.style.display = "none";
    modalBody.innerHTML = createForm();
    let submitBtn = document.getElementById("submitBtn");

    submitBtn.addEventListener("click", (e) => {
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
        return
       }
      

       postForm();

       
    })
})


function createForm() {

return `
<form class="row g-3 needs-validation dis-flex_justcont-cent width-100" novalidate id="myForm">
<div class="error" id="errorAll"></div>  
<div class="col-md-7">
    <label for="firstName" class="form-label">First name</label>
    <input type="text" class="form-control" id="firstName" name="firstName" minlength="3" maxlength="15" onblur="validateInput(this)" required>

    <div class="error">    
    </div>
  </div>
  <div class="col-md-7">
    <label for="lastName" class="form-label">Last name</label>
    <input type="text" class="form-control" id="lastName" name="lastName" minlength="3" maxlength="15" onblur="validateInput(this)" required>
    <div class="error">      
    </div>
  </div>
  <div class="col-md-7">
  <label for="city" class="form-label">City</label>
  <input type="text" class="form-control" id="city" name="city" minlength="3" maxlength="15" onblur="validateInput(this)" required>
  <div class="error">      
  </div>
</div>
<div class="col-md-7">
<label for="email" class="form-label">Email</label>
<input type="email" class="form-control" id="email" name="email" onblur="validateInput(this)" required>
<div class="error">      
</div>
</div>
<div class="col-md-7">
<label for="job" class="form-label">Job</label>
<input type="text" class="form-control" id="job" name="job" minlength="3" maxlength="15" onblur="validateInput(this)" required>
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
    <button class="btn btn-primary" id="submitBtn" type="submit">Submit form</button>
  </div>
</form>
`

}


function postForm() {

    let firstNameInput = document.getElementById("firstName");
    let lastNameInput = document.getElementById("lastName");
    let cityInput = document.getElementById("city");
    let emailInput = document.getElementById("email");
    let jobInput = document.getElementById("job");
    let passwordInput = document.getElementById("password");

    let user = {
        firstName : firstNameInput.value,
        lastName : lastNameInput.value,
        city : cityInput.value,
        email : emailInput.value,
        job : jobInput.value,
        password : passwordInput.value
    }

     let postUser = JSON.stringify(user);

     let formIsValid = isValid();

     if(formIsValid ) {

        fetch("https://63debe54f1af41051b181ca8.mockapi.io/users", {
            headers: {
                'Content-Type': 'application/json',
            },
            method : "POST",
            body: postUser
                 })
                 .then((response) => {
                    if(response.ok) {
                        let form = document.getElementById("myForm");
                        form.reset();
                    }       
                    return response.json();
                 })
                 .then((data) => {       
            
                 })
     }
     else {

     }

    

}

