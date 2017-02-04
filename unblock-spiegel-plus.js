// ==UserScript==
// @name         Fix SpOn Plus
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://www.spiegel.de/*/**
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const run = () => {
        const NODE_TYPES = {
          TEXT_NODE: 3
        };
        const toArray = obj => Object.keys(obj).map(k => obj[k]);

        let unObfuscate = text => text.split("").map(replaceChr).join("");
        let replaceChr = chr => /^\s$/.test(chr) ? chr : String.fromCharCode(chr.charCodeAt(0) - 1);

        // recursively travel paragraphs
        let visitParagraph = node => {
          if (node.nodeType == NODE_TYPES.TEXT_NODE) {
            node.textContent = unObfuscate(node.textContent);
            return;
          } else if (node.tagName && node.tagName == 'A') {
            return;
          }

          toArray(node.childNodes).map(visitParagraph);
        };

        // remove intro text
        document.getElementsByClassName("js-spiegelplus-obfuscated-intro")[0].remove();

        const content = document.getElementsByClassName("laterpay-under-overlay")[0].nextSibling.childNodes[0];
        const children = toArray(content.childNodes);
        content.removeChild(children[children.length - 1]);
        children[children.length - 2].className = "";

        const paragraphs = toArray(document.getElementsByClassName("obfuscated"));
        paragraphs.map(visitParagraph);
    };


    const waitFor = () => {
        if (document.getElementsByClassName('lp_mwi_payment-method-wrapper').length) {
            run();
        } else {
            setTimeout(waitFor, 15);
        }
    };

    waitFor();

})();
