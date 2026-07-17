// ==============================
// ROBOLAND v2 - main.js
// ==============================

// Smooth scrolling for anchor links

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

```
anchor.addEventListener('click', function (e) {

    e.preventDefault();

    const target = document.querySelector(this.getAttribute('href'));

    if(target){

        target.scrollIntoView({
            behavior: 'smooth'
        });

    }

});
```

});

// Fade-in animation

const observer = new IntersectionObserver((entries) => {

```
entries.forEach((entry) => {

    if(entry.isIntersecting){

        entry.target.classList.add('show');

    }

});
```

});

document.querySelectorAll('.card').forEach((card) => {

```
observer.observe(card);
```

});

// Navbar shadow on scroll

window.addEventListener('scroll', () => {

```
const navbar = document.querySelector('.navbar');

if(window.scrollY > 20){

    navbar.style.boxShadow =
    '0 4px 20px rgba(0,0,0,0.4)';

}else{

    navbar.style.boxShadow =
    'none';

}
```

});

// Welcome message

window.addEventListener('load', () => {

```
console.log('Welcome to ROBOLAND');
```

});

// Button click animation

document.querySelectorAll('.btn').forEach(button => {

```
button.addEventListener('click', () => {

    button.style.transform = 'scale(0.95)';

    setTimeout(() => {

        button.style.transform = 'scale(1)';

    }, 150);

});
```

});
