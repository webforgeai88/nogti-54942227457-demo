/* Прайс плашками: на десктопе открыта ровно одна плашка (как вкладки), на телефоне плашки открываются независимо. */
(function () {
  var root = document.querySelector('.s-tiles');
  if (!root) return;
  var tiles = [].slice.call(root.querySelectorAll('.s-tile'));
  var wide = window.matchMedia('(min-width: 861px)');
  function panel(t) { return document.getElementById(t.getAttribute('aria-controls')); }
  function set(t, open) { t.setAttribute('aria-expanded', open ? 'true' : 'false'); panel(t).hidden = !open; }
  function isOpen(t) { return t.getAttribute('aria-expanded') === 'true'; }
  function normalize() {
    var open = tiles.filter(isOpen);
    if (wide.matches) {
      var keep = open[0] || tiles[0];
      tiles.forEach(function (t) { set(t, t === keep); });
    }
  }
  tiles.forEach(function (t, i) {
    set(t, i === 0);
    t.addEventListener('click', function () {
      if (wide.matches) { tiles.forEach(function (o) { set(o, o === t); }); }
      else { set(t, !isOpen(t)); }
    });
  });
  if (wide.addEventListener) wide.addEventListener('change', normalize); else if (wide.addListener) wide.addListener(normalize);
})();
