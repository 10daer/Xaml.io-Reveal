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

    animateCounter(currentValue);
    loader.style.width = currentValue + "%";

    const delay = Math.floor(Math.random() * 200) + 250;
    setTimeout(updateCount, delay);
  }

  updateCount();
}

function finishedLoading() {
  const progressBar = document.querySelector(".loader-reveal");
  const loaderProgress = document.querySelector(".loader-progress");
  const loaderRect = loaderProgress.getBoundingClientRect();
  const xValue = window.innerWidth < 450 ? "-250vw" : "-150vw";
  const yValue = window.innerWidth < 450 ? "-100vh" : "-60vh";

  gsap.to(".counter-container", {
    color: "white",
    duration: 1,
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
    delay: 1,
    ease: "power1.out",
  });

  gsap.to(".loader-progress", {
    delay: 4.25,
    display: "none",
    duration: 0,
    ease: "power1.out",
  });

  gsap.set(progressBar, {
    delay: 4.25,
    duration: 1,
    ease: "power4.out",
    width: 200,
    height: 5,
    transformOrigin: "center center",
    x: loaderRect.left,
    y: loaderRect.top,
  });

  gsap.to(".loading-logo", {
    width: 600,
    scale: 2,
    y: -300,
    x: -30,
    rotate: -7.5,
    transformOrigin: "center center",
    delay: 4.25,
    duration: 1,
    ease: "power4.out",
  });

  gsap.to(progressBar, {
    delay: 4.25,
    duration: 6,
    scale: 4,
    width:
      window.innerWidth < 450 ? 2.5 * window.innerWidth : 2 * window.innerWidth,
    height:
      window.innerWidth < 450
        ? 1.5 * window.innerHeight
        : 2 * window.innerHeight,
    rx: 40,
    ry: 40,
    ease: "power4.out",
    rotate: window.innerWidth < 450 ? -30 : -45,
    transformOrigin: "center center",
    x: xValue,
    y: yValue,
  });

  gsap.to(".loading-indicator", {
    delay: 4.25,
    duration: 4,
    ease: "power4.out",
    onComplete: () => {
      document.querySelector(".content").classList.remove("mask");
      document.querySelector(".loading-indicator").remove();
      document.querySelector("svg").remove();
    },
  });

  gsap.fromTo(
    "h1 span",
    { y: 80 },
    {
      y: 0,
      delay: 4.45,
      duration: 2,
      ease: "power4.inOut",
      stagger: {
        amount: 0.3,
      },
    }
  );
}

function animateCounter(newValue) {
  console.log(newValue);
  newValue = Math.min(newValue, 100);

  const count = Array.from(document.querySelectorAll(".odometer"));
  const currentValue = count.map((span) => span.textContent).join("");
  const newValueString = String(newValue).padStart(3, "0");
  for (let i = 0; i < newValueString.length; i++) {
    if (newValueString[i] !== currentValue[i]) {
      gsap.to(count[i], {
        y: -4,
        opacity: 0.5,
        duration: 0.075,
        ease: "none",
        onComplete: () => {
          count[i].textContent = newValueString[i];
          gsap.fromTo(
            count[i],
            { y: 4, opacity: 0.5 },
            { y: 0, opacity: 1, duration: 0.075, ease: "none" }
          );
        },
      });
    }
  }

  if (newValue === 100 && currentValue !== "100") {
    gsap.to(count[1], {
      y: -4,
      opacity: 0.5,
      duration: 0.075,
      ease: "none",
      onComplete: () => {
        count[1].textContent = "0";
        gsap.fromTo(
          count[1],
          { y: 4, opacity: 0.5 },
          { y: 0, opacity: 1, duration: 0.075, ease: "none" }
        );
      },
    });

    gsap.to(count[2], {
      y: -4,
      opacity: 0.5,
      duration: 0.075,
      ease: "none",
      onComplete: () => {
        count[2].textContent = "0";
        gsap.fromTo(
          count[2],
          { y: 4, opacity: 0.5 },
          { y: 0, opacity: 1, duration: 0.075, ease: "none" }
        );
      },
    });
  }
}

document
  .querySelector(".loading-logo")
  .addEventListener("load", function (event) {
    console.log("load");
    gsap.to(".loading-logo", {
      width: "100px",
      scale: 1,
      delay: 0.2,
      duration: 0.75,
      ease: "elastic.out",
    });

    gsap.to(".loader-progress", {
      width: "60vw",
      opacity: 1,
      duration: 1.75,
      ease: "power1.out",
      delay: 0.4,
    });

    gsap.to(".counter-container", {
      ease: "power1.out",
      delay: 1.5,
      transform: "translateY(0)",
      opacity: 1,
      duration: 0.5,
    });

    gsap.to(".loader", {
      duration: 2.5,
      delay: 0,
      // onComplete: () => startLoader(),
      onComplete: () => finishedLoading(),
    });
  });
