$(document).ready(function(){
    $(window).scroll(function(){
        if(this.scrollY > 20){
            $('.navbar').addClass("sticky"); 
        }else{
            $('.navbar').removeClass("sticky");
        }if(this.scrollY > 500){
            $(".scroll-up-btn").addClass("show");
        }else{
            $(".scroll-up-btn").removeClass("show");
        }
    });
     $('.scroll-up-btn').click(function(){
         $('html').animate({scrollTop: 0});
     });

    //  var typed = new Typed(".typing", {
    //      strings:["Programador FullStack","Desenvolvedor Web","Freelancer"],
    //      typeSpeed:100,
    //      backSpeed:60,
    //      loop:true
    //  });
    //  var typed = new Typed(".typing-2", {
    //     strings:["Programador FullStack","Desenvolvedor Web","Freelancer"],
    //     typeSpeed:100,
    //     backSpeed:60,
    //     loop:true
    // });


    $('.menu-btn').click(function(){
        $('.navbar .menu').toggleClass("active");
        $('.menu-btn i').toggleClass("active");
    });
    $('.carousel').owlCarousel({
        margin:20,
        loop:true,
        autoplayTimeOut:2000,
        autoplayHoverPauser:true,
        responsive:{
            0:{
                items:1,
                nav:false
            },
            60:{
                items:2,
                nav:false
            },
            100:{
                items:3,
                nav:false
            }
        }
    });
});

// const form = document.getElementById('form');

// form.addEventListener('submit', event => {
//     event.preventDefault();

//     const formData = new FormData(this);

//     console.log(formData);
// });

class FormSubmit{
    constructor(settings){
        this.settings = settings;
        this.form = document.querySelector(settings.form);
        this.formButton = document.querySelector(settings.button);

        if(this.form){
            this.url = this.form.getAttribute("action");
        }
        this.sendForm = this.sendForm.bind(this);
    }
        displaySuccess(){
            this.form.innerHTML = this.settings.success;
        }

        displayError(){
            this.form.innerHTML = this.settings.error;
        }

        getFormObject(){
            const formObject = {};
            const fields = this.form.querySelectorAll("[name]");
            fields.forEach((field) => {
                formObject[field.getAttribute("name")] = field.value;
            });
            return formObject;
        }

        onSubmission(event){
            event.preventDefault();
            event.target.disabled = true;
            event.target.innerText = "Enviando...";
        }

        async sendForm(event){
            try{
                this.onSubmission(event);
                await fetch(this.url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                    body: JSON.stringify(this.getFormObject()),
                });
                this.displaySuccess();
            } catch (error) {
            this.displayError();
            throw new Error(error);
        }
    }
        init(){
            if(this.form) this.formButton.addEventListener("click", this.sendForm);
            return this;
        }
}

const formSubmit = new FormSubmit({
    form: "[data-form]",
    button: "[data-button]",
    success: "<h1 class='success'>Mensagem Enviada!</h1>",
    error: "<h1 class='error'>Não foi possível enviar sua mensagem.</h1>"
});

formSubmit.init();