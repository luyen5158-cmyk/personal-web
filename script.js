// 1. 打字機效果：輪流顯示 data-words 裡的文字
(function () {
  var el = document.getElementById('typed');
  var words = el.dataset.words.split('|');
  var w = 0, i = 0, deleting = false;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    el.textContent = words[0];
    return;
  }

  function tick() {
    var word = words[w];
    el.textContent = word.slice(0, i);
    if (!deleting && i === word.length) { deleting = true; return setTimeout(tick, 1400); }
    if (deleting && i === 0) { deleting = false; w = (w + 1) % words.length; }
    i += deleting ? -1 : 1;
    setTimeout(tick, deleting ? 60 : 120);
  }
  tick();
})();

// 2. 捲動到區塊時淡入
(function () {
  var items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    items.forEach(function (n) { n.classList.add('visible'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
    });
  }, { threshold: 0.15 });
  items.forEach(function (n) { io.observe(n); });
})();

// 3. 深色／淺色模式切換（記住選擇）
(function () {
  var root = document.documentElement;
  var btn = document.getElementById('theme');
  try {
    var saved = localStorage.getItem('theme');
    if (saved) root.setAttribute('data-theme', saved);
  } catch (e) {}
  btn.addEventListener('click', function () {
    var dark = root.getAttribute('data-theme') === 'dark' ||
      (!root.getAttribute('data-theme') && matchMedia('(prefers-color-scheme: dark)').matches);
    var next = dark ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) {}
  });
})();
