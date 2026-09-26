"use strict";

const PROCESSED_ATTR = "data-spt-processed";

function cleanRel(anchor) {
  const rel = anchor.getAttribute("rel");
  if (!rel) return;
  const kept = rel
    .split(/\s+/)
    .filter((t) => t && t !== "noopener" && t !== "noreferrer" && t !== "noopener noreferrer");
  if (kept.length) {
    anchor.setAttribute("rel", kept.join(" "));
  } else {
    anchor.removeAttribute("rel");
  }
}

function convertAnchors(root) {
  const anchors = root.querySelectorAll(`a[target]:not([${PROCESSED_ATTR}])`);
  for (const anchor of anchors) {
    anchor.setAttribute(PROCESSED_ATTR, "");
    anchor.setAttribute("target", "_self");
    cleanRel(anchor);
  }
}

convertAnchors(document);

const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    for (const node of mutation.addedNodes) {
      if (node.nodeType !== Node.ELEMENT_NODE) continue;
      if (node.tagName === "A") {
        if (!node.hasAttribute(PROCESSED_ATTR) && node.hasAttribute("target")) {
          node.setAttribute(PROCESSED_ATTR, "");
          node.setAttribute("target", "_self");
          cleanRel(node);
        }
      } else {
        convertAnchors(node);
      }
    }
  }
});

observer.observe(document.documentElement, { childList: true, subtree: true });