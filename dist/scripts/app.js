// Smooth scrolling using JavaScript
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Contact Form

let contactFormSubmit = document.querySelector("#contactForm");

if (contactFormSubmit) {
  // Get the values from contact form
  let name = document.querySelector("#name");
  let email = document.querySelector("#email");
  let message = document.querySelector("#message");

  // Validates form

  contactFormSubmit.addEventListener("submit", (e) => {
    e.preventDefault();
    const url = "process/email_submit.php";
    const contactFormData = {
      name: name.value,
      email: email.value,
      message: message.value,
    };

    axios
      .post(url, contactFormData)
      .then((response) => {
        let button = document.querySelector("#contactForm .submit");
        let loader = document.querySelector("#contactForm .loader");
        let successMessage = document.querySelector(
          "#contactForm .form-notification-success"
        );
        button.classList.add("d-none");
        loader.classList.remove("d-none");

        // Temporary timeout
        setTimeout(function () {
          axios.get(url).then((response) => {
            loader.classList.add("d-none");
            successMessage.classList.remove("d-none");
          });
        }, 2000);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  });
}
