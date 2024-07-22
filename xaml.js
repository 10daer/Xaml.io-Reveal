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
  const isMobile = window.innerWidth < 450;
  const isTab = window.innerWidth > 450 && window.innerWidth < 1000;

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

  gsap.set(".loading-background", {
    delay: 4.25,
    duration: 1,
    borderTopWidth: isMobile ? "calc(100vh + 20px)" : "calc(200vh + 20px)",
    borderRightWidth: "calc(100vw - 90px)",
    borderBottomWidth: isMobile ? "calc(100vh - 25px)" : "calc(200vh - 25px)",
    borderLeftWidth: "calc(100vw - 110px)",
    width: "200px",
    height: "5px",
    transformOrigin: "center center",
  });

  gsap.to(".loading-logo", {
    width: 600,
    scale: 2,
    y: "-75vh",
    x: -60,
    rotate: -7.5,
    transformOrigin: "center center",
    delay: 4.25,
    duration: 2,
    ease: "power4.out",
  });

  gsap.to(".loading-background", {
    delay: 4.25,
    duration: isMobile || isTab ? 1 : 2,
    width: "200vw",
    borderRightWidth: "0vw",
    borderLeftWidth: "0vw",
    transformOrigin: "center center",
    ease: "power1.out",
  });

  gsap.to(".loading-background", {
    delay: 4.25,
    duration: isMobile ? 2 : 4,
    borderTopWidth: "0vh",
    borderBottomWidth: "0vh",
    height: isMobile ? "200vh" : "400vh",
    rotate: isMobile ? -30 : -45,
    transformOrigin: "center center",
    ease: "power1.out",
    onComplete: () => {
      document.querySelector(".load").remove();
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
      onComplete: () => startLoader(),
      // onComplete: () => finishedLoading(),
    });
  });
