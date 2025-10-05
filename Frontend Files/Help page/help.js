// FAQ data
const faqData = {
    "orders": [
        { q: "How can I track my order?", a: "You can track your order in real-time from the homepage." },
        { q: "My order is delayed. What should I do?", a: "If delayed, please wait for a while or contact support from the app." },
        { q: "Can I cancel my order?", a: "Yes, you can cancel within 2 minutes of placing it." }
    ],
    "payments": [
        { q: "What if my payment fails?", a: "If payment fails, the amount is usually refunded within 3–5 working days." },
        { q: "Do you support UPI and wallets?", a: "Yes, we support UPI, wallets, cards, and net banking." }
    ],
    "account": [
        { q: "How do I reset my password?", a: "Go to Settings → Account → Change Password." },
        { q: "Can I change my registered email?", a: "Yes, in Account Settings you can update your email and phone number." }
    ],
    "cafes": [
        { q: "Why is my favorite cafe not listed?", a: "We’re onboarding new cafes daily. Please check back soon." }
    ],
    "legal": [
        { q: "Where can I read your privacy policy?", a: "You can find it at the bottom of our website under ‘Privacy’." },
        { q: "Do you store my payment details?", a: "No, we never store sensitive payment data." }
    ],
    "other": [
        { q: "How do I contact support?", a: "For Customer Support, Call us at +91 95089 95197." },
        { q: "What are your service timings?", a: "Our support is available 9AM – 8PM, everyday." }
    ]
};

// Load FAQs
function loadFAQs(category) {
    const faqList = document.getElementById("faq-list");//faqList → FAQ ka content area jahan questions/answers inject honge
    const categoryTitle = document.getElementById("category-title");//categoryTitle → Jo title dikh raha hai (“Orders & Delivery” etc.), usko update karna hai
    faqList.innerHTML = "";
    categoryTitle.textContent = document.querySelector(`li[data-category="${category}"]`).textContent;

    faqData[category].forEach(item => {
        const faqItem = document.createElement("div");
        faqItem.classList.add("faq-item");

        faqItem.innerHTML = `
          <button class="faq-question">${item.q}</button>
          <div class="faq-answer">${item.a}</div>
        `;
        faqList.appendChild(faqItem);
    });

    // Accordion behavior
    document.querySelectorAll(".faq-question").forEach(btn => {
        btn.addEventListener("click", () => {
            btn.classList.toggle("active");
            let answer = btn.nextElementSibling;
            if (answer.style.maxHeight) {
                answer.style.maxHeight = null;
            } else {
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });
}

// Sidebar click
document.querySelectorAll(".sidebar li").forEach(item => {
    item.addEventListener("click", () => {
        document.querySelectorAll(".sidebar li").forEach(li => li.classList.remove("active"));
        item.classList.add("active");
        loadFAQs(item.dataset.category);
    });
});

// Initial load
loadFAQs("orders");

//for Dark mode
function toggleDarkMode() {
    const body = document.body;
    const toggleBtn = document.querySelector('.toggle-btn');

    body.classList.toggle('dark-mode');

    // Update button text
    if (body.classList.contains('dark-mode')) {
        toggleBtn.textContent = 'Light Mode';
        localStorage.setItem('darkMode', 'on');  // save state
    } else {
        toggleBtn.textContent = 'Dark Mode';
        localStorage.setItem('darkMode', 'off'); // save state
    }
}