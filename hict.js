window.onload = function() {
  "use strict";
  // YOLO: fragile stuff would need proper testing on low-end hardware.

  var li = document.getElementsByTagName("li"), lil = li.length;
  var button = document.getElementsByTagName("button")[0];

  var e = 40, m = 30; // FIXME: need better names
  // e is the time in seconds times 4 you spend on each station
  // m is the number of stations you will have total.

  var f = true; // flag to toggle "onclick" behaviour

  function setLiColor(t, color) {
    if (li[t % lil].style.color !== color)
      li[t % lil].style.color = color }

  button.onclick = function() {
    if (f) {
      f = !f;

      for (var i = 0; i < lil; setLiColor(i++, ""));

      var startTime = Date.now();

      !function timeoutLoop() {
        var ms = Date.now() - startTime;
        var s = Math.floor(ms / 1e3), st = s / e, t = Math.floor(st);

        if (st === t + .75) // this is rather fragile
          setLiColor(t + 1, "rgb(95, 155, 10)");
        else if (st === t) { // same here
          setLiColor(t, "rgb(185, 0, 0)");
          setLiColor(Math.abs(t - 1), "") }

        button.innerHTML = s + "." + // FIXME: countdown each station
          Math.floor((ms - s * 1e3) / 100) + "s";

        if (!f && s !== m * e) // relatively fragile, like before
          setTimeout(timeoutLoop, 100) }() }
    else
      f = !f } };
