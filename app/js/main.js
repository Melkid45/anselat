let title = document.querySelector('.hero-title')
let childtitle = title.querySelectorAll('p')
childtitle.forEach((el, index) => {
    let letters = el.textContent.split('')
    el.textContent = '';
    letters.forEach((letter) => {
        let span = document.createElement('span')
        span.textContent = letter;
        if (letter == ' ') {
            span.classList.add('walker')
        }
        el.appendChild(span)
    })
})
let spans = title.querySelectorAll('p span')
spans.forEach((spanEl) => {
    gsap.set(spanEl, {
        opacity: 0,
        yPercent: 15,
        rotate: 5,
    })
})
gsap.to(spans, {
    opacity: 1,
    rotate: 0,
    yPercent: 0,
    duration: 0.3,
    ease: 'power1.inOut',
    stagger: {
        from: 'start',
        each: 0.1
    }
})



// Works 
let workContainer = document.querySelector('.works-container')
let gap = window.getComputedStyle(workContainer).getPropertyValue("gap")
let padding = window.getComputedStyle(document.querySelector('.works')).getPropertyValue("padding-left");
padding = Number(padding.slice(0, -2));
gap = Number(gap.slice(0, -2));
let works = workContainer.querySelectorAll('.work')
let formula = (works[0].clientWidth + gap) * (works.length - 1) - (works[0].clientWidth - gap * 3.5) - (padding * 4);
console.log(formula)

gsap.to(workContainer, {
    x: -formula,
    ease: 'power1.inOut',
    scrollTrigger: {
        start: 'top-=30%',
        trigger: workContainer,
        end: `+=${formula}`,
        pin: true,
        scrub: 1,
        pinSpacing: true,
    }
})


// View

works.forEach((work) => {
  let circle = work.querySelector('.circle');
  
  circle.style.position = 'absolute';
  circle.style.left = '0';
  circle.style.top = '0';
  
  work.addEventListener('mouseover', () => {
    circle.classList.add('animated');
  });
  
  work.addEventListener('mouseout', () => {
    circle.classList.remove('animated');
  });
  
  work.addEventListener('mousemove', (e) => {
    const rect = work.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    gsap.to(circle, {
      left: x,
      top: y,
      duration: 0.3,
      ease: "power2.out"
    });
  });
});
