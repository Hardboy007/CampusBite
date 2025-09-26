document.addEventListener("DOMContentLoaded", function () {   //jab pura html content load ho jaye tab ye chale
    //mobile image element ko select kiya
    const mobileImage = document.querySelector('.mobile-image');

    //Intersection Observer ek browser API hai jo detect krta hai ki koi element viewport me aa rha h ya nahi
    const observer = new IntersectionObserver(entries => {
        //ab mobile ke andar jitne elements hai un sabke liye loop lagaya
        entries.forEach(entry => {                          //entry naam ka object banaya
            if (entry.isIntersecting) {                     //agar mobile viewport me aaya
                mobileImage.classList.add('visible');       //toh visible class add kr denge jisme visible hone ka animation likha h css me
                mobileImage.classList.remove('hidden');     //aur visible hote hi hidden class hata denge jo css me likhi thi
                observer.unobserve(entry.target);         //ab ek bar animate hone pr unobserve kr do taki bar bar scroll krne par animate na ho
            }
        });
    }, {
        threshold: 0.4, // jab element ka 40% part dikhne lage tab trigger kro
    });

    observer.observe(mobileImage);      //mobile image ko observe krna shuru kro
});


// Open modal on "Continue as Customer"
document.querySelector(".customer-btn").addEventListener("click", function(e) {
    e.preventDefault();      //prevent form submit
    document.getElementById("overlay").style.display = "block";
    document.getElementById("loginModal").style.display = "block";
});
//close modal ❌
function closeModal(){
    document.getElementById("overlay").style.display = "none";
    document.getElementById("loginModal").style.display = "none";
}

//login functionality
function login(){
    const user = document.getElementById("username").value;
    const pass = document.getElementById("password").value;
    const errorMsg = document.getElementById("loginError");

    // Hide previous error
    errorMsg.style.display = "none";

    if(user === "" || pass === ""){
        errorMsg.textContent = "Please enter both email and password.";
        errorMsg.style.display = "block";
        return;
    }
}


//for eye toggle for password
function togglePassword(){
    const passwordInput = document.getElementById("password");  //password wala input field
    const toggleIcon = document.querySelector(".toggle-password");  //eye icon ko pakdo

    if(passwordInput.type === "password"){  //agar password type yaani hidden dots me hai
        passwordInput.type = "text";    //input ka type text kr do
        toggleIcon.classList.remove("fa-eye-slash");  //eye 
        toggleIcon.classList.add("fa-eye");
    }else{                                  //agar already show ho rha h to hide kr do
        passwordInput.type = "password";
        toggleIcon.classList.remove("fa-eye");
        toggleIcon.classList.add("fa-eye-slash");
    }
}