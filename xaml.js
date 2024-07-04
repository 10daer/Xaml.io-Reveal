function startLoader() {
  const count = document.querySelector(".odometer");
  const loader = document.querySelector(".loader-progress-bar");
  let currentValue = 0;

  if (!count || !loader) return;

  loader.style.width = "0%";

  function updateCount() {
    if (currentValue === 100) {
      finishedLoading();
      return;
    }

    currentValue += Math.floor(Math.random() * 10) + 1;
    if (currentValue > 100) currentValue = 100;

    count.textContent = currentValue;
    loader.style.width = currentValue + "%";

    const delay = Math.floor(Math.random() * 200) + 250;
    setTimeout(updateCount, delay);
  }

  updateCount();
}

function finishedLoading() {
  gsap.to(".counter-container", {
    color: "white",
    duration: 1,
    delay: 0.5,
    onComplete: () => {
      gsap.to(".counter-container", {
        y: -10,
        opacity: 0,
        ease: "power1.out",
      });
    },
  });

  gsap.to(".loading-logo", {
    opacity: 1,
    duration: 1.5,
    delay: 1.25,
    ease: "power1.out",
  });

  gsap.to(".loader-progress-bar", {
    delay: 4,
    backgroundColor: "rgba(80, 80, 80,)",
    duration: 0.1,
    ease: "power1.out",
  });

  gsap.to(".loader-progress", {
    height: "40vw",
    width: "400vw",
    scaleZ: 10,
    delay: 4,
    borderRadius: "16px",
    duration: 1,
    ease: "power1.out",
  });

  gsap.to(".loading-logo", {
    width: "400px",
    delay: 4,
    duration: 1,
    ease: "power1.out",
  });

  gsap.to(".loading-indicator", {
    rotation: -90,
    scale: 4,
    x: -280,
    transformOrigin: "center center",
    delay: 4,
    duration: 1,
    ease: "power1.out",
  });

  gsap.to(".loading-indicator", {
    opacity: 0,
    duration: 1,
    delay: 4.5,
    ease: "power1.inOut",
  });

  gsap.to(".website-content", {
    opacity: 1,
    delay: 4.5,
    duration: 0.5,
    ease: "power1.inOut",
    onComplete: () => {
      document.querySelector(".loading-indicator").remove();
    },
  });

  gsap.to("h1", {
    y: -80,
    delay: 4.5,
    duration: 1.5,
    ease: "power4.inOut",
    stagger: {
      amount: 0.15,
    },
  });
}

gsap.to(".loader", {
  duration: 1.5,
  delay: 0,
  onComplete: () => startLoader(),
});
