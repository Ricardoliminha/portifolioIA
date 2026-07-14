/* ============================================
   PORTFÓLIO PESSOAL — JavaScript
   Autor: [Seu Nome]
   Disciplina: Fundamentos da Programação Web
   ============================================ */

/* -----------------------------------------------
   1. MENU HAMBURGUER (responsivo para mobile)
   Controla abertura/fechamento do menu em telas pequenas
----------------------------------------------- */
const btnMenu  = document.getElementById('btn-menu');
const navLinks = document.getElementById('nav-links');

if (btnMenu && navLinks) {
  btnMenu.addEventListener('click', function () {
    // Alterna a classe 'open' no botão e no menu
    this.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  // Fecha o menu ao clicar em qualquer link
  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      btnMenu.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });
}

/* -----------------------------------------------
   2. TEMA CLARO / ESCURO
   Salva a preferência do usuário no localStorage
----------------------------------------------- */
const btnTema = document.getElementById('btn-tema');

// Ao carregar a página, aplica o tema salvo (se houver)
(function aplicarTemaSalvo() {
  const temaSalvo = localStorage.getItem('tema');
  if (temaSalvo === 'dark') {
    document.body.classList.add('dark');
    if (btnTema) btnTema.textContent = '☀️';
  }
})();

if (btnTema) {
  btnTema.addEventListener('click', function () {
    // Alterna a classe 'dark' no body
    document.body.classList.toggle('dark');

    const isDark = document.body.classList.contains('dark');

    // Atualiza ícone do botão
    this.textContent = isDark ? '☀️' : '🌙';

    // Salva preferência no localStorage
    localStorage.setItem('tema', isDark ? 'dark' : 'light');
  });
}

/* -----------------------------------------------
   3. DESTAQUE DO LINK ATIVO NO MENU
   Marca o link da página atual como ativo
----------------------------------------------- */
(function marcarPaginaAtiva() {
  // Pega o nome do arquivo HTML atual
  const paginaAtual = window.location.pathname.split('/').pop() || 'index.html';

  document.querySelectorAll('.nav-links a').forEach(function (link) {
    const href = link.getAttribute('href');
    if (href === paginaAtual) {
      link.classList.add('active');
    }
  });
})();

/* -----------------------------------------------
   4. ANIMAÇÃO DAS BARRAS DE IDIOMA (Formação)
   Aciona a animação quando a seção fica visível
----------------------------------------------- */
(function animarBarrasIdioma() {
  const barras = document.querySelectorAll('.lang-fill');
  if (barras.length === 0) return; // Sai se não estiver na página de formação

  // Usa IntersectionObserver para acionar ao entrar na viewport
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        const barra   = entry.target;
        const largura = barra.getAttribute('data-width'); // Ex: "90%"
        barra.style.width = largura;
        observer.unobserve(barra); // Executa só uma vez
      }
    });
  }, { threshold: 0.3 });

  barras.forEach(function (barra) {
    observer.observe(barra);
  });
})();

/* -----------------------------------------------
   5. VALIDAÇÃO E ENVIO DO FORMULÁRIO DE CONTATO
   Valida campos obrigatórios e formato de e-mail
----------------------------------------------- */
const formulario = document.getElementById('form-contato');

if (formulario) {
  formulario.addEventListener('submit', function (evento) {
    evento.preventDefault(); // Impede o envio padrão do formulário

    // Pega os valores dos campos
    const nome     = document.getElementById('nome');
    const email    = document.getElementById('email');
    const mensagem = document.getElementById('mensagem');

    let valido = true; // Flag de validação

    // --- Valida nome ---
    limparErro(nome);
    if (nome.value.trim() === '') {
      mostrarErro(nome, 'Por favor, informe seu nome.');
      valido = false;
    }

    // --- Valida e-mail ---
    limparErro(email);
    if (email.value.trim() === '') {
      mostrarErro(email, 'Por favor, informe seu e-mail.');
      valido = false;
    } else if (!validarEmail(email.value.trim())) {
      mostrarErro(email, 'Informe um e-mail válido (ex: usuario@dominio.com).');
      valido = false;
    }

    // --- Valida mensagem ---
    limparErro(mensagem);
    if (mensagem.value.trim() === '') {
      mostrarErro(mensagem, 'Por favor, escreva sua mensagem.');
      valido = false;
    }

    // --- Se todos os campos são válidos, simula o envio ---
    if (valido) {
      simularEnvio();
    }
  });
}

/* Função auxiliar: exibe mensagem de erro abaixo do campo */
function mostrarErro(campo, texto) {
  campo.classList.add('error');
  const msgErro = campo.parentElement.querySelector('.error-msg');
  if (msgErro) {
    msgErro.textContent = texto;
    msgErro.style.display = 'block';
  }
}

/* Função auxiliar: remove o estado de erro do campo */
function limparErro(campo) {
  campo.classList.remove('error');
  const msgErro = campo.parentElement.querySelector('.error-msg');
  if (msgErro) {
    msgErro.style.display  = 'none';
    msgErro.textContent = '';
  }
}

/* Função auxiliar: valida formato de e-mail com regex */
function validarEmail(valor) {
  // Expressão regular para validar e-mail básico
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(valor);
}

/* Função: simula o envio e exibe modal de confirmação */
function simularEnvio() {
  // Limpa todos os campos do formulário
  document.getElementById('nome').value     = '';
  document.getElementById('email').value    = '';
  document.getElementById('mensagem').value = '';

  // Exibe o modal de confirmação
  const modal = document.getElementById('modal-sucesso');
  if (modal) {
    modal.classList.add('show');
  }
}

/* -----------------------------------------------
   6. FECHAR O MODAL AO CLICAR NO BOTÃO OU FORA
----------------------------------------------- */
const modal      = document.getElementById('modal-sucesso');
const btnFechar  = document.getElementById('modal-fechar');

if (btnFechar && modal) {
  btnFechar.addEventListener('click', function () {
    modal.classList.remove('show');
  });

  // Fecha ao clicar fora do modal (no overlay)
  modal.addEventListener('click', function (e) {
    if (e.target === modal) {
      modal.classList.remove('show');
    }
  });
}
