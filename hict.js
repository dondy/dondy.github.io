// TODO:
// - combine the cardio template with the HICT setup to support
//  gradual training and buildup.
//  * requires persistent date tracking and corrections depending on breaking
//     schedule: missing a weeks quota gets you to the beginning of the
//       previous week if possible, otherwise first week.

// http://img3.wikia.nocookie.net/__cb20120503030643/4chanfit/images/7/74/Cardio_Template.gif

// - write a diet checking app complementary to this? see:
// http://liamrosen.com/fitness.html

// build/incorporate dumbbells/barbells?
// http://gomestic.com/do-it-yourself/how-to-make-dumbbells-on-a-budget/
// http://homemadestrength.blogspot.de/2011/05/strongest-bench-youll-never-buy.html

window.onload = function() {
  "use strict";
  // YOLO: fragile stuff would need proper testing on low-end hardware.

  var li = document.getElementsByTagName("li"), lil = li.length;
  var button = document.getElementsByTagName("button")[0];

  var e = 4, m = 3; // e:40, m:30; FIXME: need better names
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
