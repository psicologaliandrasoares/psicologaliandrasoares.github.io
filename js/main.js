// Liandra Soares — landing page behaviour
(function () {
  'use strict';

  /*
   * WhatsApp contact. Accepts either a phone number (with country + area
   * code, e.g. 5548998041223) or a full link such as https://wa.link/xxxx.
   * With a number, the form opens the chat with the message pre-filled.
   * With a link, the message is copied to the clipboard instead.
   */
  var WHATSAPP = '5548998041223';
  var GREETING = 'Olá, Liandra! Gostaria de agendar uma sessão.';

  var raw = String(WHATSAPP).trim();
  var isLink = /^https?:\/\//.test(raw);
  var num = raw.replace(/\D/g, '');

  function waUrl(text) {
    return isLink ? raw : 'https://wa.me/' + num + '?text=' + encodeURIComponent(text);
  }

  document.querySelectorAll('[data-wa-link]').forEach(function (a) {
    a.href = waUrl(GREETING);
  });

  var ano = document.getElementById('ano');
  if (ano) ano.textContent = new Date().getFullYear();

  // ----- booking form -----
  var form = document.getElementById('agendamento');
  if (!form) return;

  var periodo = 'Tarde';
  var buttons = form.querySelectorAll('.period');
  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      periodo = btn.getAttribute('data-periodo');
      buttons.forEach(function (b) {
        var on = b === btn;
        b.classList.toggle('is-active', on);
        b.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
    });
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var nome = form.elements.nome.value.trim();
    var publico = form.elements.publico.value;
    var modalidade = form.elements.modalidade.value;
    var msg = form.elements.msg.value.trim();

    var txt = GREETING + '\n\nNome: ' + nome +
      '\nAtendimento para: ' + publico +
      '\nModalidade: ' + modalidade +
      '\nMelhor período: ' + periodo +
      (msg ? '\nMensagem: ' + msg : '');

    if (isLink && navigator.clipboard) {
      navigator.clipboard.writeText(txt).catch(function () {});
    }
    window.open(waUrl(txt), '_blank', 'noopener');
  });
})();
