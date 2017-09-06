// Vanilla

document.addEventListener('DOMContentLoaded', function() {

  function fadeIn(el) {
    el.style.opacity = 0;

    var last = +new Date();
    var tick = function() {
      el.style.opacity = +el.style.opacity + (new Date() - last) / 400;
      last = +new Date();

      if (+el.style.opacity < 1) {
        (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
      }
    };

    tick();
  }

  function fadeOut(el) {
    el.style.opacity = 1;

    var last = +new Date();
    var tick = function() {
      el.style.opacity = +el.style.opacity + (new Date() - last) / 300;
      last = +new Date();

      if (+el.style.opacity > 1) {
        (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
      }
    };

    tick();
  }

  var menu = document.querySelector('#highlight_menu'),
      twitterLink = document.getElementById('twitter'),
      twitterAPI = 'https://twitter.com/intent/tweet?text=';

  window.addEventListener('mouseup', function (evt) {
    var s = document.getSelection(),
        r = s.getRangeAt(0);
    if (r && s.toString()) {
      var p = r.getBoundingClientRect();
      if (p.left || p.top) {

        menu.style.left = (p.left + (p.width / 2)) - (menu.clientWidth / 2) + 'px';
        menu.style.top = (p.top - menu.clientHeight - 10) + 'px';
        menu.style.display = 'block';
        menu.style.opacity = 0;

        var tweet = s.toString();
        console.log('tweet_length', tweet.length);
        if (tweet.length >= 90) {
          var longTweet = replaceIndex(tweet, 90, '...');
          var position = longTweet.indexOf('...');
          tweet = longTweet.substring(0, position + 3);

        }
        twitterLink.href = twitterAPI + '"'+ tweet.trim() + '"' + " —@richmondgozarin" + ' ' + window.location.href;
        fadeIn(menu);

        setTimeout(function() {
          if (menu.classList)
            menu.classList.add('highlight_menu_animate');
          else
            menu.className += ' ' + 'highlight_menu_animate';
        }, 10);
        return;
      }
    }

    fadeOut(menu);
    setTimeout(function() {
      menu.style.display = 'none';

      if (menu.classList)
        menu.classList.remove('highlight_menu_animate');
      else
        menu.className = menu.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }, 3);
  });

});

function replaceIndex(string, at, repl) {
   return string.replace(/\S/g, function(match, i) {
        if( i === at ) {
          return repl;
        }
        return match;
    });
}
