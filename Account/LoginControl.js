document.addEventListener('DOMContentLoaded', function () {
    if (sessionStorage.getItem('ActiveUser') == null) {
        document.querySelector("#User").style.display = 'none'
        document.querySelector("#LogOut").style.display = 'none'
    } else {
        document.querySelector("#register").style.display = 'none'
        document.querySelector("#login").style.display = 'none'
        document.querySelector("#User").innerHTML = sessionStorage.getItem('ActiveUser')
    }
  }, false);

  document.querySelector("#LogOut").onclick = function() {
    sessionStorage.removeItem("ActiveUser")
    location.reload();
    return false;
  }
    