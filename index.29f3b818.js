!function(){var n=document.querySelector("#search-box"),t=document.querySelector(".country-list");document.querySelector(".country-info");n.addEventListener("input",(function(n){var o;(o=n.currentTarget.value,fetch("https://restcountries.com/v3.1/name/".concat(o,"?fields=name,capital,population,flags,languages")).then((function(n){if(!n.ok)throw new Error(n.status);return n.json()}))).then((function(n){console.log(n),function(n){var o=n.map((function(n){var t=n.name,o=n.capital,e=n.population,a=n.flags,c=n.languages;return"<li>\n          <p><b>Name</b>: ".concat(t.official,"</p>\n          <p><b>Capitol</b>: ").concat(o,"</p>\n          <p><b>Population</b>: ").concat(e,"</p>\n          <p><b>Flags</b>: ").concat(a.svg,"</p>\n          <p><b>Languages</b>: ").concat(Object.values(c),"</p>\n        </li>")})).join("");t.innerHTML=o}(n)})).then(console.log("sprawdzamm")).catch((function(n){console.log(n),t.innerHTML=""}))}))}();
//# sourceMappingURL=index.29f3b818.js.map