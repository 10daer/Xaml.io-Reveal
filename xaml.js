function startLoader() {
  const counter = document.querySelector(".counter");
  const loader1 = document.querySelector(".loader-1");
  const loader2 = document.querySelector(".loader-2");
  let currentValue = 0;

  if (!counter || !loader1 || !loader2) return;

  loader1.style.width = "0%";
  loader2.style.width = "0%";

  function updateCounter() {
    if (currentValue === 100) {
      finishedLoading();
      return;
    }

    currentValue += Math.floor(Math.random() * 10) + 1;
    if (currentValue > 100) currentValue = 100;

    counter.textContent = currentValue + "%";
    loader1.style.width = currentValue + "%";
    loader2.style.width = currentValue + "%";

    const delay = Math.floor(Math.random() * 200) + 250;
    setTimeout(updateCounter, delay);
  }

  updateCounter();
}

gsap.from(".circles", {
  duration: 2,
  top: "-100%",
  ease: "elastic.out",
  delay: 0,
});

gsap.to(".circle-inner", {
  duration: 1,
  width: "70px",
  height: "70px",
  delay: 0.5,
  ease: "power4.inOut",
});

gsap.to(".circle-inner-rotator", {
  duration: 1.5,
  scale: 1,
  ease: "power4.inOut",
  delay: 1,
});

gsap.to(".circles", {
  duration: 1.5,
  rotation: 360,
  ease: "power4.inOut",
  delay: 2,
  repeat: -1,
  onStart: () => startLoader(),
});

function finishedLoading() {
  gsap.to(".loader-progress", {
    backgroundColor: "transparent",
    background: "none",
    alignItems: "center",
    duration: 0.1,
    delay: 0.1,
  });

  gsap.to(".counter", {
    y: window.innerHeight / 2,
    delay: 0.15,
    duration: 0.1,
    ease: "power2.inOut",
  });

  gsap.to(".circles", {
    y: window.innerHeight / 2,
    delay: 0.15,
    duration: 0.1,
    ease: "power2.inOut",
  });

  gsap.to(".loader-1", {
    width: "150px",
    rotate: 45,
    height: "60px",
    y: 15,
    transformOrigin: "center center",
    delay: 0.25,
    duration: 0.5,
  });

  gsap.to(".loader-2", {
    width: "150px",
    rotate: -45,
    height: "60px",
    y: -15,
    transformOrigin: "center center",
    delay: 0.25,
    duration: 0.5,
  });

  gsap.to(".loader-1", {
    x: -80,
    delay: 0.75,
    duration: 0.5,
    ease: "power2.inOut",
  });

  gsap.to(".loader-2", {
    x: -80,
    delay: 0.75,
    duration: 0.5,
    ease: "power2.inOut",
  });

  gsap.to(".aml", {
    opacity: 1,
    x: 0,
    duration: 0.5,
    delay: 0.75,
    ease: "power2.inOut",
  });

  gsap.to(".loader-1", {
    scale: 40,
    duration: 1.5,
    delay: 2,
    ease: "power2.inOut",
  });

  gsap.to(".loader-2", {
    scale: 40,
    duration: 1.5,
    delay: 2,
    ease: "power2.inOut",
  });

  gsap.to(".loading-indicator", {
    opacity: 0,
    duration: 1,
    delay: 2.5,
    ease: "power1.inOut",
  });

  gsap.to(".website-content", {
    opacity: 1,
    delay: 2.5,
    duration: 0.5,
    ease: "power1.inOut",
    onComplete: () => {
      document.querySelector(".loading-indicator").remove();
    },
  });

  gsap.to("h1", {
    y: -80,
    delay: 2.5,
    duration: 1.5,
    ease: "power4.inOut",
    stagger: {
      amount: 0.15,
    },
  });
}
