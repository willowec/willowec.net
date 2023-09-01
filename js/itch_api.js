// Generated by CoffeeScript 1.12.7
// Downloaded from https://static.itch.io/api.js
window.Itch = {};

Itch.getGameData = function(opts) {
  var domain, url, xhr;
  if (opts == null) {
    opts = {};
  }
  domain = opts.domain || "itch.io";
  if (!opts.user) {
    throw new Error("Missing user");
  }
  if (!opts.game) {
    throw new Error("Missing game");
  }
  url = "https://" + opts.user + "." + domain + "/" + opts.game + "/data.json";
  if (opts.secret) {
    url = url + "?secret=" + opts.secret;
  }
  xhr = new XMLHttpRequest();
  xhr.open("GET", url);
  xhr.addEventListener("readystatechange", (function(_this) {
    return function(e) {
      var game;
      if (xhr.readyState !== 4) {
        return;
      }
      game = JSON.parse(xhr.responseText);
      return typeof opts.onComplete === "function" ? opts.onComplete(game) : void 0;
    };
  })(this));
  return xhr.send();
};

Itch.attachBuyButton = function(el, opts) {
  var domain, height, left, top, width;
  if (opts == null) {
    opts = {};
  }
  domain = opts.domain || "itch.io";
  width = opts.width || 680;
  height = opts.height || 400;
  top = (screen.height - height) / 2;
  left = (screen.width - width) / 2;
  if (!opts.user) {
    throw new Error("Missing user");
  }
  if (!opts.game) {
    throw new Error("Missing game");
  }
  return el.onclick = function() {
    var w;
    w = window.open("https://" + opts.user + "." + domain + "/" + opts.game + "/purchase?popup=1", "purchase", "scrollbars=1, resizable=no, width=" + width + ", height=" + height + ", top=" + top + ", left=" + left);
    if (typeof w.focus === "function") {
      w.focus();
    }
    return false;
  };
};
