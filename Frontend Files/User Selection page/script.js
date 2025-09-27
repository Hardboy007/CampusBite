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


// Open Customer Modal
document.querySelector(".customer-btn").addEventListener("click", function (e) {
    e.preventDefault();
    document.getElementById("customerOverlay").style.display = "block";
    document.getElementById("customerModal").style.display = "block";
});

// Open Staff Modal
document.querySelector(".staff-btn").addEventListener("click", function (e) {
    e.preventDefault();
    document.getElementById("staffOverlay").style.display = "block";
    document.getElementById("staffModal").style.display = "block";
});

// Close Modal (reusable function)
function closeModal(modalId, overlayId) {
    document.getElementById(modalId).style.display = "none";
    document.getElementById(overlayId).style.display = "none";
}

//Login form submission (UPDATED)
const loginForm = document.getElementById("loginForm");
if (loginForm) {        //agar page pe form hai tabhi ye code chale
    loginForm.addEventListener("submit", function (e) {            //Jab user submit id wala (login button click) karega, ye function run hoga

        const email = document.getElementById("username").value.trim();     //.trim() lagaya taaki extra spaces hat jaye.
        const password = document.getElementById("password").value.trim();  //.trim() lagaya taaki extra spaces hat jaye.
        const errorMsg = document.getElementById("loginError");

        // Hide previous error
        errorMsg.style.display = "none";    //Pehle ke error ko clear kar diya (agar koi pehle dikh raha tha to).
        errorMsg.textContent = "";          //error ka text hata dena.

        if (!email || !password) {
            e.preventDefault();       //STOP form submission
            errorMsg.textContent = "Please enter both email and password.";
            errorMsg.style.display = "block";       //Error box visible kar diya.
            return;         //form submit na ho
        }
    });
}


//for eye toggle for password
function togglePassword() {
    const passwordInput = document.getElementById("password");  //password wala input field
    const toggleIcon = document.querySelector(".toggle-password");  //eye icon ko pakdo

    if (passwordInput.type === "password") {  //agar password type yaani hidden dots me hai
        passwordInput.type = "text";    //input ka type text kr do
        toggleIcon.classList.remove("fa-eye-slash");  //eye 
        toggleIcon.classList.add("fa-eye");
    } else {                                  //agar already show ho rha h to hide kr do
        passwordInput.type = "password";
        toggleIcon.classList.remove("fa-eye");
        toggleIcon.classList.add("fa-eye-slash");
    }
}