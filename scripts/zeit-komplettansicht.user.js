// ==UserScript==
// @name         Zeit.de Komplettansicht Redirect
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Automatically redirect to the "komplettansicht" version of Zeit.de articles without adding a new browser history entry.
// @author       You
// @match        https://www.zeit.de/*20*/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
  const link = document.querySelector('a.article-toc__fullview');
  if (link) {
    window.location.replace(link.href);
  }
})();
