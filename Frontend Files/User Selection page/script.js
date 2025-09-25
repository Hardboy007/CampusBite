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