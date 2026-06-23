(function(){
  // ---------- Page enter transition ----------
  document.body.classList.add('page-enter');

  // Create the page-leave curtain element (used when navigating to another page)
  var leaveCurtain = document.createElement('div');
  leaveCurtain.className = 'page-leave';
  document.body.appendChild(leaveCurtain);

  function navigateWithTransition(href){
    leaveCurtain.classList.add('go');
    setTimeout(function(){
      window.location.href = href;
    }, 480);
  }

  // ---------- Marquee (only runs if marquee track exists on the page) ----------
  var track = document.getElementById('marqueeTrack');
  if(track){
    var items = ["ACTIVE NOISE CANCELLING","10,000mAh PASS-THROUGH CHARGING","IPX5 SWEAT RESISTANT","38H TOTAL PLAYBACK","USB-C 20W FAST CHARGE","BLUETOOTH 5.3"];
    function buildMarqueeRow(){
      return items.map(function(t){ return '<span>'+t+' <span class="dot">\u25CF</span></span>'; }).join('');
    }
    track.innerHTML = buildMarqueeRow() + buildMarqueeRow();
  }

  // ---------- Menu overlay ----------
  var menuOverlay = document.getElementById('menuOverlay');
  var menuOpenBtn = document.getElementById('menuOpenBtn');
  var menuCloseBtn = document.getElementById('menuCloseBtn');
  var menuLinks = document.querySelectorAll('.menu-link');
  var body = document.body;

  function openMenu(){
    menuOverlay.classList.add('active');
    menuOverlay.setAttribute('aria-hidden', 'false');
    menuOpenBtn.setAttribute('aria-expanded', 'true');
    body.classList.add('menu-open');
  }
  function closeMenu(){
    menuOverlay.classList.remove('active');
    menuOverlay.setAttribute('aria-hidden', 'true');
    menuOpenBtn.setAttribute('aria-expanded', 'false');
    body.classList.remove('menu-open');
  }

  if(menuOpenBtn) menuOpenBtn.addEventListener('click', openMenu);
  if(menuCloseBtn) menuCloseBtn.addEventListener('click', closeMenu);

  menuLinks.forEach(function(link){
    link.addEventListener('click', function(e){
      var href = link.getAttribute('href');
      var isAnchor = href.charAt(0) === '#';
      var isSamePageAnchor = isAnchor && document.querySelector(href);

      e.preventDefault();
      closeMenu();

      if(isSamePageAnchor){
        // same-page scroll
        setTimeout(function(){
          document.querySelector(href).scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 450);
      } else {
        // cross-page navigation with cinematic wipe
        setTimeout(function(){
          navigateWithTransition(href);
        }, 350);
      }
    });
  });

  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape' && menuOverlay && menuOverlay.classList.contains('active')) closeMenu();
  });

  // ---------- FAQ accordion (only runs if faqList exists) ----------
  var faqList = document.getElementById('faqList');
  if(faqList){
    var faqData = [
      {q:"Do the earbuds charge from the power bank case, or from the bank itself?", a:"Both. Dock the earbud case on the power bank's pass-through port to top it up on the move, or place it on its own USB-C cable independently."},
      {q:"How long does the full kit last between charges?", a:"The earbuds alone run 7 hours. The case carries 4 more full charges (38h total). The power bank adds roughly 2 additional full case charges on top of that."},
      {q:"Is it safe to run the bank and a phone off the same cable?", a:"Yes — pass-through charging is built in, so the bank can charge a connected device while it's itself being charged, without degrading either battery."},
      {q:"What's covered under warranty?", a:"The earbuds carry a 1-year defect warranty. The power bank's battery cycle is covered for 2 years from date of purchase, covering capacity drop below 80%."}
    ];
    faqData.forEach(function(item, i){
      var div = document.createElement('div');
      div.className = 'faq-item' + (i === 0 ? ' open' : '');
      div.innerHTML =
        '<button class="faq-q" type="button"><span>'+item.q+'</span><span class="icon">+</span></button>' +
        '<div class="faq-a">'+item.a+'</div>';
      faqList.appendChild(div);
    });
    faqList.addEventListener('click', function(e){
      var btn = e.target.closest('.faq-q');
      if(!btn) return;
      var item = btn.parentElement;
      var wasOpen = item.classList.contains('open');
      faqList.querySelectorAll('.faq-item').forEach(function(el){ el.classList.remove('open'); });
      if(!wasOpen) item.classList.add('open');
    });
  }

  // ---------- Contact form (only runs if contactForm exists) ----------
  var form = document.getElementById('contactForm');
  if(form){
    var submitBtn = document.getElementById('contactSubmitBtn');
    var sentMsg = document.getElementById('contactSentMsg');
    form.addEventListener('submit', function(e){
      e.preventDefault();
      submitBtn.textContent = 'Message sent';
      submitBtn.classList.add('sent');
      sentMsg.classList.add('show');
    });
  }

  // ---------- Mark current page link in menu ----------
  var currentPage = window.location.pathname.split('/').pop() || 'home.html';
  menuLinks.forEach(function(link){
    var href = link.getAttribute('href');
    if(href === currentPage || (currentPage === '' && href === 'home.html')){
      link.classList.add('is-current');
    }
  });
})();
