/* ===== heroのスライドショー ===== */
(function(){
  var s=document.querySelectorAll('#slides .slide'),d=document.getElementById('dots'),i=0,t,b=[];
  s.forEach(function(_,n){var x=document.createElement('button');x.setAttribute('aria-label','スライド'+(n+1));x.onclick=function(){go(n);start()};d.appendChild(x);b.push(x)});
  function go(n){s[i].classList.remove('on');b[i].classList.remove('on');i=n;s[i].classList.add('on');b[i].classList.add('on')}
  function start(){clearInterval(t);t=setInterval(function(){go((i+1)%s.length)},6000)}
  go(0);start();
})();

/* ===== セクションのフェードイン ===== */
(function () {
  // フェードさせる対象(ヒーローは除く)
  var targets = document.querySelectorAll(
    'section > *, .sns, footer > *'
  );
  // 授与品・お知らせ・年表は1つずつ時間差で表示
  var staggerGroups = document.querySelectorAll('.grid, .news, .tl');

  // JSが動いている時だけ非表示状態にする(JSオフ対策)
  document.documentElement.classList.add('js-fade');

  targets.forEach(function (el) { el.classList.add('fade'); });

  staggerGroups.forEach(function (group) {
    Array.prototype.forEach.call(group.children, function (child, n) {
      child.classList.add('fade');
      child.style.transitionDelay = (n * 0.12) + 's';
    });
  });

  // 画面に入ったら .in を付ける
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);  // 1回だけ表示
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });

  document.querySelectorAll('.fade').forEach(function (el) { io.observe(el); });
})();