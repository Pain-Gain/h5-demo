export const adapterFun = function (width) {
      (function (doc, win) {
          var docEl = doc.documentElement,
              resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
              devicePixelRatio = win.devicePixelRatio,
              tid,
              dpr;
          // dpr 
          if (devicePixelRatio >= 3 && (!dpr || dpr >= 3)) {
              dpr = 3;
          } else if (devicePixelRatio >= 2 && (!dpr || dpr >= 2)) {
              dpr = 2;
          } else {
              dpr = 1;
          }
          // 这里假设的是 设计给的 750px的 图
          var designWidth = width
          var recalc = function () {
              var width = docEl.clientWidth;
              if (width > designWidth) {
                  width = designWidth;
              }
              // 乘以100，px : rem = 100 : 1
              docEl.style.fontSize = 100 * (width / designWidth) + 'px';
          };
          recalc()
          if (!doc.addEventListener) return;
  
          win.addEventListener(resizeEvt, function () {
              clearTimeout(tid);
              tid = setTimeout(recalc, 300);
          }, false);
  
          win.addEventListener('pageshow', function (e) {
              // 不觉得有用,但flexible加上了就加上吧
              // https://github.com/amfe/lib-flexible
              if (e.persisted) {
                  clearTimeout(tid);
                  tid = setTimeout(recalc, 300);
              }
          }, false);
      })(document, window);
  }