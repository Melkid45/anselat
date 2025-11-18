function observerFadeIn() {
  function onEntry(e) {
    e.forEach((e => { e.isIntersecting && e.target.classList.add("show") }))
  }
  let options = { threshold: [.5] },
    observer = new IntersectionObserver(onEntry, options),
    elements = document.querySelectorAll(".el--fade, .el--opacity"); for (let e of elements) observer.observe(e);
}



let title = document.querySelector('.hero-title')
if (title) {
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
  function animateHero() {
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
  }
}



// Works 
let workContainer = document.querySelector('.works-container')
if (workContainer) {
  let gap = window.getComputedStyle(workContainer).getPropertyValue("gap")
  let padding = window.getComputedStyle(document.querySelector('.works')).getPropertyValue("padding-left");
  padding = Number(padding.slice(0, -2));
  gap = Number(gap.slice(0, -2));
  let works = workContainer.querySelectorAll('.work')
  let formula = (works[0].clientWidth + gap) * (works.length - 1) - (works[0].clientWidth - gap * 3.5) - (padding * 4);

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

}

if (workContainer || document.querySelector('.case')) {
  let works = document.querySelectorAll('.work, .item--frame-el .wrap')
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
}





// Margue


function updateMarqueeAnimation() {
  const marqueeContainer = document.getElementById('marqueeContainer');
  const strokeItems = document.querySelectorAll('.partners__body-frame');

  if (!marqueeContainer || strokeItems.length === 0) return;

  const itemWidth = strokeItems[0].scrollWidth;
  const containerWidth = marqueeContainer.parentElement.offsetWidth;

  const gap = parseFloat(getComputedStyle(marqueeContainer).gap) || 0;
  const totalItemWidth = itemWidth + gap;

  const translateValue = -((totalItemWidth / containerWidth) * 100);

  let style = document.getElementById('dynamic-marquee');
  if (!style) {
    style = document.createElement('style');
    style.id = 'dynamic-marquuee';
    document.head.appendChild(style);
  }

  style.innerHTML = `
        @keyframes animPartners {
            0% { 
                transform: translateX(0);
                opacity: 1;
            }
            95% {
                opacity: 1;
            }
            100% { 
                transform: translateX(${translateValue}%);
                opacity: 1;
            }
        }
        
        .stroke {
            animation-fill-mode: both;
        }
    `;

  marqueeContainer.style.animation = 'none';
  setTimeout(() => {
    marqueeContainer.style.animation = '';
  }, 10);
}

document
  .getElementById('marqueeContainer')
  ?.addEventListener('animationiteration', function () {
    this.style.opacity = '1';
  });

let resizeTimeout;
function debouncedUpdate() {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(updateMarqueeAnimation, 250);
}

document.addEventListener('DOMContentLoaded', function () {
  setTimeout(updateMarqueeAnimation, 1000);
  updateMarqueeAnimation();
});

window.addEventListener('resize', debouncedUpdate);


// Indicators

let Indititles = document.querySelectorAll('.indicators__body .item .awesome');

Indititles.forEach((item) => {
  const originalText = item.textContent.trim();
  item.textContent = '';

  const digits = originalText.split('');

  digits.forEach((char) => {
    let div = document.createElement('div');

    if (char === '+' || char === ' ') {
      div.textContent = char;
      item.appendChild(div);
      return;
    }

    if (!isNaN(char)) {
      div.classList.add('animate-number');
      div.dataset.target = char;

      // создаём 10 цифр (0–9)
      for (let i = 0; i < 10; i++) {
        let span = document.createElement('span');
        span.textContent = i;
        div.appendChild(span);
      }

      item.appendChild(div);
    } else {
      div.textContent = char;
      item.appendChild(div);
    }
  });

  const numbers = item.querySelectorAll('.animate-number');

  numbers.forEach((num, index) => {
    const targetDigit = parseInt(num.dataset.target);
    if (isNaN(targetDigit)) return;

    gsap.fromTo(
      num,
      { yPercent: 0 },
      {
        yPercent: -(targetDigit * 100),
        duration: 2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: item,
          start: 'top 80%',
        },
        delay: index * 0.15,
      }
    );
  });
});


// Preloader
window.addEventListener('load', () => {
  const preloader = document.getElementsByClassName('preloader');
  gsap.to(preloader, {
    opacity: 0,
    pointerEvents: 'none',
    duration: 1,
    ease: 'power1.inOut',
    onComplete: () => {
      preloader[0].style.display = 'none';
      if (title) {
        animateHero();
      }
      observerFadeIn();
      document.querySelector('.header').classList.remove('back');
    }
  });
});


// Menu Header


let linkElements = document.querySelectorAll('.header__menu ul li a')
linkElements.forEach((element) => {
  let word = element.textContent;
  element.textContent = '';
  for (let index = 0; index < 2; index++) {
    let div = document.createElement('div')
    div.textContent = word;
    element.appendChild(div)
  }
})