let comemoracao = false;

// Inicializa AOS
AOS.init({
  duration: 1000,
  once: true,
  offset: 100
});

// Contador de tempo juntos
function atualizarContador() {
  const dataInicio = new Date(2024, 5, 6, 17, 0, 0);
  const dataAtual = new Date();
  const dataAlvo = new Date(2026, 5, 6, 17, 0, 0); //data para comemoração

  if (isNaN(dataInicio)) {
    console.error("Data inválida!");
    return;
  }

  let anos = dataAtual.getFullYear() - dataInicio.getFullYear();
  let meses = dataAtual.getMonth() - dataInicio.getMonth();
  let dias = dataAtual.getDate() - dataInicio.getDate();

  if (dias < 0) {
    meses--;
    const ultimoDiaMesAnterior = new Date(dataAtual.getFullYear(), dataAtual.getMonth(), 0).getDate();
    dias = ultimoDiaMesAnterior - dataInicio.getDate() + dataAtual.getDate();
  }

  if (meses < 0) {
    anos--;
    meses += 12;
  }


  const diff = dataAtual - dataInicio;
  const diffTotalHoras = Math.floor(diff / (1000 * 60 * 60));
  const horas = diffTotalHoras % 24;
  const minutos = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const segundos = Math.floor((diff % (1000 * 60)) / 1000);

  const diasParaMostrar = dias >= 0 ? dias : 0;

  if (dataAtual >= dataAlvo && !comemoracao) {
    startFireworks();
    comemoracao = true;
  }

  document.getElementById('anos').textContent = anos;
  document.getElementById('meses').textContent = meses;
  document.getElementById('dias').textContent = diasParaMostrar;
  document.getElementById('horas').textContent = horas.toString().padStart(2, '0');
  document.getElementById('minutos').textContent = minutos.toString().padStart(2, '0');
  document.getElementById('segundos').textContent = segundos.toString().padStart(2, '0');

  
}

function startFireworks() {
  const endTime = Date.now() + 15000; // 15 segundos
  const interval = setInterval(() => {
    launchFirework();
    if (Date.now() >= endTime) {
      clearInterval(interval);
    }
  }, 300);
}

function launchFirework() {
  const firework = document.createElement('div');
  firework.className = 'firework';
  firework.style.left = Math.random() * 90 + 'vw';
  firework.style.top = Math.random() * 40 + 'vh';
  firework.style.setProperty('--hue', Math.floor(Math.random() * 360));
  firework.style.setProperty('--size', Math.random() * 18 + 12 + 'px');

  for (let i = 0; i < 12; i++) {
    const particle = document.createElement('span');
    particle.className = 'particle';
    particle.style.setProperty('--angle', (360 / 12) * i + 'deg');
    particle.style.setProperty('--distance', Math.random() * 120 + 100 + 'px');
    particle.style.animationDuration = 1.2 + Math.random() * 0.8 + 's';
    firework.appendChild(particle);
  }

  document.body.appendChild(firework);
  setTimeout(() => firework.remove(), 1800);
}


atualizarContador();
setInterval(atualizarContador, 1000);


// Controle do player de música
const player = document.getElementById('player');
const playPauseBtn = document.getElementById('playPauseBtn');
const restartBtn = document.getElementById('restartBtn');

playPauseBtn.addEventListener('click', () => {
  if (player.paused) {
    player.play();
    playPauseBtn.innerHTML = '<i class="fas fa-pause mr-2"></i> Pausar';
  } else {
    player.pause();
    playPauseBtn.innerHTML = '<i class="fas fa-play mr-2"></i> Tocar';
  }
});

restartBtn.addEventListener('click', () => {
  player.currentTime = 0;
  player.play();
  playPauseBtn.innerHTML = '<i class="fas fa-pause mr-2"></i> Pausar';
});

player.addEventListener('ended', () => {
  playPauseBtn.innerHTML = '<i class="fas fa-play mr-2"></i> Tocar';
});

// Galeria Modal
let currentImageIndex = 0;
const images = [
  { src: 'foto1.jpg', caption: 'Nosso primeiro momento especial' },
  { src: 'foto2.jpg', caption: 'Aquele dia inesquecível' },
  { src: 'foto3.jpg', caption: 'Mais uma memória linda' }
];

function openModal(index) {
  currentImageIndex = index;
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImage');
  const captionText = document.getElementById('modalCaption');
  
  modal.style.display = "block";
  modalImg.src = images[index].src;
  captionText.innerHTML = images[index].caption;
}

function closeModal() {
  document.getElementById('imageModal').style.display = "none";
}

function changeImage(direction) {
  currentImageIndex += direction;
  
  if (currentImageIndex >= images.length) {
    currentImageIndex = 0;
  } else if (currentImageIndex < 0) {
    currentImageIndex = images.length - 1;
  }
  
  document.getElementById('modalImage').src = images[currentImageIndex].src;
  document.getElementById('modalCaption').innerHTML = images[currentImageIndex].caption;
}

// Fechar modal com ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeModal();
  } else if (e.key === 'ArrowLeft') {
    changeImage(-1);
  } else if (e.key === 'ArrowRight') {
    changeImage(1);
  }
});

// Toggle das cartas
function toggleLetter(id) {
  const content = document.getElementById(`letter${id}`);
  const icon = content.parentElement.querySelector('.fa-chevron-down');
  
  content.classList.toggle('active');
  
  if (content.classList.contains('active')) {
    icon.style.transform = 'rotate(180deg)';
  } else {
    icon.style.transform = 'rotate(0)';
  }
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 100) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  
  // Back to top button
  const backToTop = document.getElementById('backToTop');
  if (window.scrollY > 500) {
    backToTop.classList.add('show');
    backToTop.style.opacity = '1';
    backToTop.style.visibility = 'visible';
  } else {
    backToTop.classList.remove('show');
    backToTop.style.opacity = '0';
    backToTop.style.visibility = 'hidden';
  }
});

// Back to top function
document.getElementById('backToTop').addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Smooth scroll para links da navbar
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Criar corações caindo (efeito especial)
function createHeart() {
  const heart = document.createElement('i');
  heart.classList.add('fas', 'fa-heart', 'falling-heart');
  heart.style.left = Math.random() * 100 + 'vw';
  heart.style.animationDuration = Math.random() * 3 + 2 + 's';
  heart.style.opacity = Math.random();
  heart.style.fontSize = Math.random() * 20 + 10 + 'px';
  
  document.body.appendChild(heart);
  
  setTimeout(() => {
    heart.remove();
  }, 5000);
}

// Ativar corações caindo a cada 500ms
setInterval(createHeart, 500);

// CSS para corações caindo (adicione ao style.css)
const style = document.createElement('style');
style.textContent = `
  .falling-heart {
    position: fixed;
    top: -50px;
    color: rgba(255, 255, 255, 0.5);
    pointer-events: none;
    z-index: 9999;
    animation: fall linear forwards;
  }
  
  @keyframes fall {
    to {
      transform: translateY(100vh);
    }
  }
`;
document.head.appendChild(style);




// Menu mobile toggle
document.getElementById('menuToggle').addEventListener('click', function() {
  document.getElementById('menu').classList.toggle('show');
});

// Fechar menu ao clicar em um link
document.querySelectorAll('#menu a').forEach(link => {
  link.addEventListener('click', function() {
    document.getElementById('menu').classList.remove('show');
  });
});

// Fechar menu ao rolar a página
window.addEventListener('scroll', function() {
  document.getElementById('menu').classList.remove('show');
});