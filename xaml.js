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
    delay: 4,
    backgroundColor: "#201f1f",
    duration: 0.5,
    ease: "power1.out",
  });

  gsap.to(".loader-progress-bar", {
    delay: 4,
    backgroundColor: "#201f1f",
    duration: 0.5,
    ease: "power1.out",
  });

  gsap.to(".loader-progress", {
    height: "60vw",
    scaleX: 4,
    delay: 4.25,
    borderRadius: "16px",
    duration: 2,
    ease: "power4.out",
  });

  gsap.to(".loader-progress-bar", {
    height: "60vw",
    scaleX: 4,
    delay: 4.25,
    borderRadius: "16px",
    duration: 2,
    ease: "power4.out",
  });

  gsap.to(".loading-logo", {
    width: "400px",
    delay: 4.25,
    duration: 2,
    ease: "power4.out",
  });

  gsap.to(".loading-indicator", {
    rotation: -90,
    scale: 4,
    x: -280,
    transformOrigin: "center center",
    delay: 4.25,
    duration: 2,
    ease: "power4.out",
  });

  gsap.to(".loading-indicator", {
    opacity: 0,
    duration: 2,
    delay: 4.25,
    ease: "power4.inOut",
  });

  gsap.to(".website-content", {
    opacity: 1,
    delay: 4.25,
    ease: "none",
  });

  gsap.to(".website-content", {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    delay: 4.35,
    duration: 4,
    ease: "elastic.out",
    onComplete: () => {
      document.querySelector(".loading-indicator").remove();
    },
  });

  gsap.to("h1", {
    y: -80,
    delay: 4.45,
    duration: 1,
    ease: "power4.inOut",
    stagger: {
      amount: 0.3,
    },
  });
}

function animateCounter(newValue) {
  console.log(newValue);
  newValue = Math.min(newValue, 100);

  const count = Array.from(document.querySelectorAll(".odometer"));
  console.log(count);
  const currentValue = count.map((span) => span.textContent).join("");
  const newValueString = String(newValue).padStart(3, "0");
  console.log(currentValue, count);
  for (let i = 0; i < newValueString.length; i++) {
    if (newValueString[i] !== currentValue[i]) {
      console.log(newValueString[i], currentValue[i]);
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
      opacity: 1,
      duration: 0.25,
      ease: "none",
      delay: 1.25,
    });

    gsap.to(".counter-container > .odometer", {
      transform: "translateY(0)",
      duration: 0.25,
      ease: "none",
      delay: 1.25,
    });

    gsap.to(".loader", {
      duration: 2.5,
      delay: 0,
      onComplete: () => startLoader(),
    });
  });
