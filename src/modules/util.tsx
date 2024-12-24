import DOMPurify from "isomorphic-dompurify";
import { marked } from 'marked';

const DEBUG = true;

const ALLOWED_IFRAMES = /^https:\/\/www.youtube(-nocookie)?.com\/embed\//

const PURIFY_CONFIG = { ADD_TAGS: ['iframe'], KEEP_CONTENT: false }

DOMPurify.addHook('uponSanitizeElement', (node, data) => {
    if (data.tagName === 'iframe') {
        log(typeof node)
        if (node instanceof Element) {
            const src = node.getAttribute('src') || ''
            log(src)
            if (!src.match(ALLOWED_IFRAMES)) {
                return node.parentNode?.removeChild(node)
            }
        }
    }
})

export const debug = (message: string, element: HTMLElement) => {
    if (!DEBUG)
        return;
    const pre = document.createElement("pre")
    pre.appendChild(document.createTextNode(message))
    element.appendChild(pre)
}

export const log = (message: object | string | number, element?: HTMLElement | null) => {
    if (!DEBUG)
        return;
    const s= (typeof message == "string")?message:message.toString();
    console.log(s);
    if (element)
        debug(s, element)
}

export const sanitize = (html: string): string => {
    return DOMPurify.sanitize(html, PURIFY_CONFIG);
}

const stripBOM = (content: string):string => { 
    return content.replace(/^[\u200B\u200C\u200D\u200E\u200F\uFEFF]/,"") 
}


export const html = (markdown: string): string => {
    return sanitize(marked.parse(stripBOM(markdown)) as string);
}

export default log 