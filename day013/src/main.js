// import "core-js";
// 手动引入
// import "core-js/es/promise";
import count from "./js/count";
import list from "./js/list";
import "./fonts/iconfont.css";
import "./less/index.less";

new Promise((resove) => {
  setTimeout(() => {
    resove();
  }, 1000);
});

const arr = [1, 2, 3];

console.log(arr.includes(1));
list([1, 2, 3, 4, 5, 6]);
console.log(count(1, 2));

console.log(100);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log("SW registered: ", registration);
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError);
      });
  });
}
