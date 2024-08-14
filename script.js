// Создаем конфетти
function createConfetti() {
  const confetti = document.createElement("div");
  confetti.classList.add("confetti");
  confetti.style.left = Math.random() * 100 + "vw";
  confetti.style.top = -10 + "px";
  confetti.style.animationDuration = Math.random() * 3 + 2 + "s";
  confetti.style.opacity = Math.random();
  confetti.style.transform = `rotate(${Math.random() * 360}deg)`;

  const colors = [
    "#f2d74e",
    "#95c3de",
    "#ff9a9e",
    "#87CEFA",
    "#98FB98",
    "#DDA0DD",
  ];
  confetti.style.background = colors[Math.floor(Math.random() * colors.length)];

  document.body.appendChild(confetti);

  confetti.animate(
    [
      { transform: `translateY(0) rotate(0deg)`, opacity: 1 },
      {
        transform: `translateY(${window.innerHeight}px) rotate(720deg)`,
        opacity: 0,
      },
    ],
    {
      duration: Math.random() * 3000 + 2000,
      easing: "cubic-bezier(0.25, 0.1, 0.25, 1)",
    }
  ).onfinish = () => confetti.remove();
}

setInterval(createConfetti, 300);

// Добавляем интерактивность шарикам
document.querySelectorAll(".balloon").forEach((balloon) => {
  balloon.addEventListener("click", () => {
    balloon.style.transform = "scale(1.2)";
    setTimeout(() => {
      balloon.style.transform = "";
    }, 300);
  });
});

// Анимация пламени свечи
const flame = document.getElementById("flame");
const cake = document.getElementById("cake");

function animateFlame() {
  if (flame.classList.contains("active")) {
    flame.style.transform = `translateX(-50%) scale(${
      0.9 + Math.random() * 0.2
    })`;
    flame.style.filter = `blur(${1 + Math.random()}px)`;
    requestAnimationFrame(animateFlame);
  }
}
animateFlame();

// Обработчик клика по торту
cake.addEventListener("click", () => {
  if (flame.classList.contains("active")) {
    flame.classList.remove("active");
    flame.classList.add("extinguished");
  } else {
    flame.classList.remove("extinguished");
    flame.classList.add("active");
    animateFlame();
  }
});

// Создаем падающие звезды
function createStar() {
  const star = document.createElement("div");
  star.innerHTML = "⭐";
  star.style.position = "fixed";
  star.style.top = "-10px";
  star.style.left = Math.random() * 100 + "vw";
  star.style.fontSize = Math.random() * 20 + 10 + "px";
  star.style.color = "gold";
  star.style.opacity = "0";
  star.style.zIndex = "5";
  star.style.pointerEvents = "none";

  document.body.appendChild(star);

  star.animate(
    [
      { transform: "translateY(0)", opacity: 1 },
      { transform: `translateY(${window.innerHeight + 20}px)`, opacity: 0 },
    ],
    {
      duration: 2000,
      easing: "linear",
    }
  ).onfinish = () => star.remove();
}

setInterval(createStar, 2000);

// Анимация торта и шампанского
const champagne = document.querySelector(".champagne");

cake.addEventListener("mouseover", () => {
  if (!cake.classList.contains("clicked")) {
    cake.style.transform = "scale(1.05) rotate(2deg)";
  }
});
cake.addEventListener("mouseout", () => {
  if (!cake.classList.contains("clicked")) {
    cake.style.transform = "";
  }
});

champagne.addEventListener("mouseover", () => {
  champagne.style.transform = "scale(1.05) rotate(-2deg)";
});
champagne.addEventListener("mouseout", () => {
  champagne.style.transform = "";
});

// Пересчитываем позиции шариков при изменении размера окна
window.addEventListener("resize", () => {
  document.querySelectorAll(".balloon").forEach((balloon, index) => {
    const positions = [
      { left: "10%", top: "20%" },
      { right: "10%", top: "30%" },
      { left: "20%", top: "60%" },
      { right: "20%", top: "70%" },
      { left: "50%", top: "10%" },
    ];
    Object.assign(balloon.style, positions[index]);
  });
});

// Добавляем эффект "взрыва" для торта
cake.addEventListener("click", () => {
  cake.classList.add("clicked");
  cake.style.transform = "scale(1.1)";
  setTimeout(() => {
    cake.style.transform = "";
    cake.classList.remove("clicked");
  }, 300);

  const explosion = document.createElement("div");
  explosion.style.position = "absolute";
  explosion.style.width = "100%";
  explosion.style.height = "100%";
  explosion.style.top = "0";
  explosion.style.left = "0";
  explosion.style.background =
    "radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)";
  explosion.style.borderRadius = "50%";
  explosion.style.opacity = "0";
  explosion.style.transition = "all 0.5s ease-out";
  cake.appendChild(explosion);

  setTimeout(() => {
    explosion.style.transform = "scale(1.5)";
    explosion.style.opacity = "1";
  }, 10);

  setTimeout(() => {
    explosion.remove();
  }, 500);

  // Создаем дополнительные конфетти при клике на торт
  for (let i = 0; i < 30; i++) {
    setTimeout(createConfetti, i * 50);
  }
});

// Добавляем эффект "открытия" для шампанского
champagne.addEventListener("click", () => {
  const pop = document.createElement("div");
  pop.style.position = "absolute";
  pop.style.top = "-40px";
  pop.style.left = "50%";
  pop.style.transform = "translateX(-50%)";
  pop.style.fontSize = "24px";
  pop.textContent = "🍾";
  champagne.appendChild(pop);

  pop.animate(
    [
      { transform: "translateX(-50%) translateY(0) scale(1)", opacity: 1 },
      { transform: "translateX(-50%) translateY(-50px) scale(2)", opacity: 0 },
    ],
    {
      duration: 1000,
      easing: "ease-out",
    }
  ).onfinish = () => pop.remove();

  // Создаем пузырьки
  for (let i = 0; i < 20; i++) {
    setTimeout(() => {
      const bubble = document.createElement("div");
      bubble.style.position = "absolute";
      bubble.style.width = "8px";
      bubble.style.height = "8px";
      bubble.style.borderRadius = "50%";
      bubble.style.background = "rgba(255, 255, 255, 0.7)";
      bubble.style.top = "0";
      bubble.style.left = `${Math.random() * 100}%`;
      champagne.appendChild(bubble);

      bubble.animate(
        [
          { transform: "translateY(0) scale(1)", opacity: 1 },
          {
            transform: `translateY(-${100 + Math.random() * 100}px) scale(0)`,
            opacity: 0,
          },
        ],
        {
          duration: 1000 + Math.random() * 1000,
          easing: "ease-out",
        }
      ).onfinish = () => bubble.remove();
    }, i * 50);
  }
});

// Анимация числа 18
const number = document.querySelector(".number");
function animateNumber() {
  number.style.transform = `translate(-50%, -50%) scale(${
    1 + Math.random() * 0.1
  })`;
  number.style.textShadow = `${Math.random() * 2 - 1}px ${
    Math.random() * 2 - 1
  }px 3px rgba(255,105,180,0.7)`;

  requestAnimationFrame(animateNumber);
}
animateNumber();

// Код для кнопки "СЮРПРИЗ" и воздушных шаров

const surpriseBtn = document.getElementById("surpriseBtn");
const balloonCounter = document.getElementById("balloonCounter");
const resultMessage = document.getElementById("resultMessage");
let poppedBalloons = 0;
let totalBalloons = 0;

function createSurpriseBalloon() {
  const balloon = document.createElement("div");
  balloon.classList.add("surprise-balloon");
  balloon.style.left = Math.random() * (window.innerWidth - 60) + "px";
  balloon.style.top = "-80px";

  const colors = [
    "#ff69b4",
    "#87CEFA",
    "#98FB98",
    "#DDA0DD",
    "#F0E68C",
    "#FF6347",
  ];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  balloon.style.background = randomColor;

  document.body.appendChild(balloon);
  totalBalloons++;

  const animation = balloon.animate(
    [
      { transform: "translateY(0)" },
      { transform: `translateY(${window.innerHeight + 80}px)` },
    ],
    {
      duration: 5000 + Math.random() * 2000,
      easing: "linear",
    }
  );

  animation.onfinish = () => {
    balloon.remove();
    checkGameEnd();
  };

  balloon.addEventListener("click", () => {
    poppedBalloons++;
    balloon.remove();
    updateCounter();
    createConfetti();
    checkGameEnd();
  });
}

function updateCounter() {
  balloonCounter.textContent = `Лопнуто шаров: ${poppedBalloons}`;
}

function checkGameEnd() {
  if (document.querySelectorAll(".surprise-balloon").length === 0) {
    resultMessage.textContent = `Игра окончена! Вы лопнули ${poppedBalloons} из ${totalBalloons} шаров.`;
    resultMessage.style.display = "block";
    setTimeout(() => {
      resultMessage.style.display = "none";
      poppedBalloons = 0;
      totalBalloons = 0;
      updateCounter();
    }, 5000);
  }
}

surpriseBtn.addEventListener("click", () => {
  for (let i = 0; i < 20; i++) {
    setTimeout(createSurpriseBalloon, i * 200);
  }
});

// Обновляем позиции шаров при изменении размера окна
window.addEventListener("resize", () => {
  document.querySelectorAll(".surprise-balloon").forEach((balloon) => {
    balloon.style.left = Math.random() * (window.innerWidth - 60) + "px";
  });
});

// Добавляем обработчик для touch-устройств
document.body.addEventListener(
  "touchstart",
  function (e) {
    if (e.target.classList.contains("surprise-balloon")) {
      e.preventDefault(); // Предотвращаем стандартное поведение браузера
      e.target.click(); // Вызываем событие клика на шаре
    }
  },
  { passive: false }
);

// Функция для определения, является ли устройство мобильным
function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

// Адаптируем размеры и поведение для мобильных устройств
if (isMobile()) {
  const cakeContainer = document.querySelector(".cake-container");
  const cake = document.querySelector(".cake");
  const champagne = document.querySelector(".champagne");

  cakeContainer.style.flexDirection = "column";
  cake.style.marginRight = "0";
  cake.style.marginBottom = "20px";

  // Увеличиваем область касания для мобильных устройств
  cake.style.transform = "scale(1.2)";
  champagne.style.transform = "scale(1.2)";

  // Адаптируем размер шрифта для мобильных устройств
  document.body.style.fontSize = "14px";

  // Уменьшаем количество конфетти для оптимизации производительности
  setInterval(createConfetti, 500);

  // Адаптируем размер и поведение сюрприз-шаров
  function createSurpriseBalloon() {
    const balloon = document.createElement("div");
    balloon.classList.add("surprise-balloon");
    balloon.style.width = "40px";
    balloon.style.height = "60px";
    balloon.style.left = Math.random() * (window.innerWidth - 40) + "px";
    balloon.style.top = "-60px";

    const colors = [
      "#ff69b4",
      "#87CEFA",
      "#98FB98",
      "#DDA0DD",
      "#F0E68C",
      "#FF6347",
    ];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    balloon.style.background = randomColor;

    document.body.appendChild(balloon);
    totalBalloons++;

    const animation = balloon.animate(
      [
        { transform: "translateY(0)" },
        { transform: `translateY(${window.innerHeight + 60}px)` },
      ],
      {
        duration: 4000 + Math.random() * 1000,
        easing: "linear",
      }
    );

    animation.onfinish = () => {
      balloon.remove();
      checkGameEnd();
    };

    balloon.addEventListener(
      "touchstart",
      (e) => {
        e.preventDefault();
        poppedBalloons++;
        balloon.remove();
        updateCounter();
        createConfetti();
        checkGameEnd();
      },
      { passive: false }
    );
  }

  // Уменьшаем количество сюрприз-шаров для мобильных устройств
  surpriseBtn.addEventListener("click", () => {
    for (let i = 0; i < 10; i++) {
      setTimeout(createSurpriseBalloon, i * 300);
    }
  });
}

// связь с ботом
function notifyBot() {
    const botToken = '7541209056:AAHQd9Qv_ljTbP7zfIumTdKhycC1zCfFpDI'; // Ваш токен бота
    const chatId = '864496207'; // Ваш chat_id
    const message = 'Кто-то открыл веб-приложение!';

    fetch(`https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`)
        .then(response => response.json())
        .then(data => console.log('Сообщение отправлено:', data))
        .catch(error => console.error('Ошибка отправки сообщения:', error));
}

// Вызов функции уведомления при открытии приложения
notifyBot();
