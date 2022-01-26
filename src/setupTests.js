// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom/extend-expect";

// need this for async/await in tests
import "core-js/stable";
import "regenerator-runtime/runtime";

import jquery from "jquery";
window.$ = window.jQuery = jquery;
jquery.expr.pseudos.visible = function () {
    // Fix jQuery ":visible" selector always returns false in JSDOM.
    // https://github.com/jsdom/jsdom/issues/1048#issuecomment-401599392
    return true;
};

class URL {
    constructor(url) {
        this.url = url;
        this.protocol = url.split("//")[0];
    }
}
window.URL = URL;

// pat-subform
// See https://github.com/jsdom/jsdom/issues/1937#issuecomment-461810980
window.HTMLFormElement.prototype.submit = () => {};

// patch dom.is_visible to not rely on jest-unavailable offsetWidth/Height but
// simply test on display-none, which is set by jQuery show/hide.
import dom from "@patternslib/patternslib/src/core/dom";
dom.is_visible = (el) => {
    return el.style.display !== "none";
};

Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    })),
});
