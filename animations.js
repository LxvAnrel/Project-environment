const loginform = document.getElementById('login');
const singupform = document.getElementById('sing_up');
const bgform = document.getElementById('background');
const altbtt = document.getElementById('alt');
var login = true;
var register = false;
let isresposive = false;

document.addEventListener("DOMContentLoaded", () => {
  console.log("A página foi carregada!");
  console.log(register) // teste
  if (localStorage.getItem("log_register") == "true") {
    register = true
  }
  if (window.innerWidth = 768) {
    console.log("a página não esta no responsivo")
    isresposive = false;
    return;
  } else {
    isresposive = true;
  }
  if (register == true) {
    loginform.className = ('forms disabled');
    bgform.className = ('background');
    bgform.style.right = '-50%';
    altbtt.className = ('alt');
    altbtt.style.left = 'calc(50% - 230px)'
    altbtt.innerHTML = 'Login <i class="material-icons">arrow_forward</i>';
    singupform.className = ('forms');
    localStorage.removeItem("log_register")
    register = false;
    login = false;
  }
});

function register_mode() {
  localStorage.setItem("log_register", "true")
  window.location.href = '/login.html';
}

function alternar() {
  if (isresposive == true) {
    if (login) {
      loginform.className = 'forms none';
      bgform.className = 'background';
      altbtt.className = 'alt';
      altbtt.innerHTML = 'Login <i class="material-icons">arrow_forward</i>';
      singupform.className = 'forms see';
      login = false;
    } else {
      loginform.className = 'forms see';
      bgform.className = 'background';
      altbtt.className = 'alt';
      altbtt.innerHTML = 'Registrar <i class="material-icons">arrow_forward</i>';
      singupform.className = 'forms none';
      login = true;
    }
    return console.log("Não necessita da função");
  }
  if (login) {
    loginform.className = 'forms none';
    bgform.className = 'background right';
    altbtt.className = 'alt right_alt';
    altbtt.innerHTML = 'Login <i class="material-icons">arrow_forward</i>';
    singupform.className = 'forms see';
    login = false;
  } else {
    loginform.className = 'forms see';
    bgform.className = 'background left';
    altbtt.className = 'alt left_alt';
    altbtt.innerHTML = 'Registrar <i class="material-icons">arrow_forward</i>';
    singupform.className = 'forms none';
    login = true;
  }

  // Adiciona animação de transição suave
  setTimeout(() => {
    bgform.style.transition = 'transform 0.5s ease';
  }, 0);
}

/* Animação para a página index */
let currentIndex = 0;
let autoPlayTimeout;
const autoPlayDelay = 3000;
const pauseDelay = 6000;
const carouselWrapper = document.querySelector('.carousel-wrapper');
const slides = document.querySelectorAll('.carousel-slide');
const totalSlides = slides.length;
const progressBar = document.getElementById('progressBar');

let startX = 0;
let endX = 0;

// Criar os pontos da barra de progresso
for (let i = 0; i < totalSlides; i++) {
  const dot = document.createElement('div');
  dot.classList.add('progress-dot');
  if (i === 0) dot.classList.add('active');
  progressBar.appendChild(dot);
}

const dots = document.querySelectorAll('.progress-dot');

// Atualizar a barra de progresso
function updateProgressBar() {
  dots.forEach((dot, index) => {
    if (index === currentIndex) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });
}

// Mover slides
function moveSlide(direction) {
  currentIndex += direction;

  if (currentIndex < 0) {
    currentIndex = totalSlides - 1;
  } else if (currentIndex >= totalSlides) {
    currentIndex = 0;
  }

  carouselWrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
  updateProgressBar();
}

// Função para autoplay
function startAutoPlay() {
  clearInterval(autoPlayTimeout);
  autoPlayTimeout = setInterval(() => {
    moveSlide(1);
  }, autoPlayDelay);
}

// Pausar e reiniciar autoplay
function pauseCarousel() {
  clearInterval(autoPlayTimeout);
  setTimeout(() => {
    startAutoPlay();
  }, pauseDelay);
}

// Swipe - Eventos de toque
carouselWrapper.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
  clearInterval(autoPlayTimeout); // Pausa o autoplay enquanto o usuário desliza
});

carouselWrapper.addEventListener('touchmove', (e) => {
  endX = e.touches[0].clientX;
});

carouselWrapper.addEventListener('touchend', () => {
  const swipeDistance = endX - startX;

  if (swipeDistance > 50) {
    // Swipe para a direita
    moveSlide(-1);
    pauseCarousel();
  } else if (swipeDistance < -50) {
    // Swipe para a esquerda
    moveSlide(1);
    pauseCarousel();
  }

  startX = 0;
  endX = 0;
});

// Iniciar autoplay
startAutoPlay();