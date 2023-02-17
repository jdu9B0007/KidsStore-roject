
function store() {
    document.getElementById("ErrorBox").innerHTML = ""
    var lowerCaseLetters = /[a-z]/g;
    var upperCaseLetters = /[A-Z]/g;
    var numbers = /[0-9]/g;
    var validEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    let PhoneNumberRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    let isValid = true;
    var ul = document.getElementById("ErrorBox");

    console.log()

    if (localStorage.getItem(document.getElementById('Email').value) != null) {
        console.log("0")
        document.getElementById('Email').focus();
        let li = document.createElement("li");
        li.appendChild(document.createTextNode("This Email is already taken"));
        ul.appendChild(li);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'User account for this Email already exists. Use different Email address',
            footer: '<a href="https://www.quora.com/Why-cant-you-have-multiple-accounts-with-the-same-email">Why do I have this issue?</a>'
          })
        isValid = false;
        return false;
    }

    if (document.getElementById('FullName').value.trim().length == 0) {
        let li = document.createElement("li");
        li.appendChild(document.createTextNode("Please enter your Full Name"));
        ul.appendChild(li);
        isValid = false;
    }

    if (document.getElementById('Username').value.trim().length == 0) {
        let li = document.createElement("li");
        li.appendChild(document.createTextNode("Please enter your Username"));
        ul.appendChild(li);
        isValid = false;
    }

    if (!document.getElementById('Email').value.match(validEmail)) {
        let li = document.createElement("li");
        li.appendChild(document.createTextNode("Enter Valid Email"));
        ul.appendChild(li);
        isValid = false;
    }
    if (!document.getElementById('PhoneNumber').value.match(PhoneNumberRegex)) {
        let li = document.createElement("li");
        li.appendChild(document.createTextNode("Please enter Valid phone number"));
        ul.appendChild(li)
        isValid = false;
    }
    if (document.getElementById('Password').value.length < 8) {
        let li = document.createElement("li");
        li.appendChild(document.createTextNode("Your password must be less than 8 characters"));
        ul.appendChild(li);
        isValid = false;
    }
    if (!document.getElementById('Password').value.match(numbers)) {
        let li = document.createElement("li");
        li.appendChild(document.createTextNode("Your password must contain at least 1 number"));
        ul.appendChild(li);
        isValid = false;
    }
    if (!document.getElementById('Password').value.match(upperCaseLetters)) {
        let li = document.createElement("li");
        li.appendChild(document.createTextNode("Your password must contain at least 1 uppercasee character"));
        ul.appendChild(li);
        isValid = false;
    }
    if (!document.getElementById('Password').value.match(lowerCaseLetters)) {
        let li = document.createElement("li");
        li.appendChild(document.createTextNode("Your password must contain at least 1 lowercase character"));
        ul.appendChild(li);
        isValid = false;
    }

    if (document.getElementById('Password').value != document.getElementById('PassConfirm').value) {
        let li = document.createElement("li");
        li.appendChild(document.createTextNode("Your password didn't match"));
        ul.appendChild(li);
        isValid = false;
    }

    if (isValid) {
        var User = {
            FullName: document.getElementById('FullName').value,
            UserName: document.getElementById('Username').value,
            Email: document.getElementById('Email').value,
            PhoneNumber: document.getElementById('PhoneNumber').value,
            Password: document.getElementById('Password').value,
            Gender: document.querySelector('input[name="gender"]:checked').value
        }
        localStorage.setItem(User.Email, JSON.stringify(User))
        console.log(JSON.parse(localStorage.getItem(User.Email)).FullName)
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your account has been created!',
            showConfirmButton: false,
            timer: 2000
        }).then(r => {
            sessionStorage.setItem('ActiveUser', User.Email)
            window.location.href = window.location.origin;
        })
    }


}

//checking
function check() {
    let Email = document.getElementById("Email").value
    let Password = document.getElementById("Password").value
    let UserData = localStorage.getItem(Email)
    document.getElementById("ErrorBox").innerHTML = ""
    if (UserData == null) {
        document.getElementById("ErrorBox").innerHTML = "There is no such User or incorrect Password"
    } else {
        UserData = JSON.parse(UserData)
        if (UserData.Password != Password) {
            document.getElementById("ErrorBox").innerHTML = "There is no such User or incorrect Password"
        } else {
            sessionStorage.setItem('ActiveUser', UserData.Email)
            window.location.href = window.location.origin;
        }

    }

}