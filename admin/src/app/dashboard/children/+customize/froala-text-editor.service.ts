import { Injectable, Renderer2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

const FontAwesome = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.4.0/css/font-awesome.min.css';
const CodeMirrorCSS = 'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.3.0/codemirror.min.css';
const FroalaEditorCSS = 'https://cdnjs.cloudflare.com/ajax/libs/froala-editor/2.6.0/css/froala_editor.pkgd.min.css';
const FroalaStyleCSS = 'https://cdnjs.cloudflare.com/ajax/libs/froala-editor/2.6.0/css/froala_style.min.css';
const CodeViewerPluginCSS = 'https://cdnjs.cloudflare.com/ajax/libs/froala-editor/2.6.0/css/plugins/code_view.min.css';
const PathwayGothicFont = 'https://fonts.googleapis.com/css?family=Pathway+Gothic+One';
const SourceSansProFont = 'https://fonts.googleapis.com/css?family=Source+Sans+Pro:200,400';
const IndieFlowerFont = 'https://fonts.googleapis.com/css?family=Indie+Flower';

const jQuery = 'https://cdnjs.cloudflare.com/ajax/libs/jquery/1.11.0/jquery.min.js';
const CodeMirrorJS = 'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.25.0/codemirror.min.js';
const CodeMirrorXml = 'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.25.0/mode/xml/xml.min.js';
const FroalaEditorJS = 'https://cdnjs.cloudflare.com/ajax/libs/froala-editor/2.6.0/js/froala_editor.pkgd.min.js';


export const TextEditorOptions = {
    fontFamily: {
        'Source Sans Pro,sans-serif': 'Source Sans Pro',
        'Arial,Helvetica,sans-serif': 'Arial',
        'Georgia,serif': 'Georgia',
        'Impact,Charcoal,sans-serif': 'Impact',
        'Tahoma,Geneva,sans-serif': 'Tahoma',
        [`'Times New Roman',Times,serif`]: 'Times New Roman',
        'Verdana,Geneva,sans-serif': 'Verdana',
        'Indie Flower,cursive': 'Indie Flower',
        'Pathway Gothic One,sans-serif': 'Pathway Gothic One'
    },
    /*toolbarButtons: [
        'bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', '|',
        'fontFamily', 'fontSize', 'color', 'paragraphStyle', '|',
        'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'quote', '-',
        'insertLink', '|',
        'emoticons', 'specialCharacters', 'insertHR', 'selectAll', 'clearFormatting', '|',
        'help', 'html', '|',
        'undo', 'redo'
        ],*/
    heightMin: 100,
    heightMax: 400,
    pluginsEnabled: ['align', 'charCounter', 'codeBeautifier', 'codeView', 'colors',
                    'emoticons', 'entities', 'fontFamily', 'fontSize', 'link', 'lists',
                    'paragraphFormat', 'paragraphStyle', 'quote', 'url']
};

const ResourceLinks = {
    css: [
        FontAwesome,
        CodeMirrorCSS,
        FroalaEditorCSS,
        FroalaStyleCSS,
        CodeViewerPluginCSS,
        PathwayGothicFont,
        SourceSansProFont,
        IndieFlowerFont
    ],
    js: [
        {
            lib: jQuery,
            deps: [ { lib: FroalaEditorJS, deps: [] } ]
        },
        {
            lib: CodeMirrorJS,
            deps: [ { lib: CodeMirrorXml, deps: [] } ]
        }
    ]
};

@Injectable()
export class FroalaEditorService {
    private _isLinksAllocated = false;
    constructor(@Inject(DOCUMENT) private _doc: any) {}

    resolveLinks(_renderer2) {
        if (this._isLinksAllocated) {
            return;
        }
        const createElemFn = tagName => _renderer2.createElement(tagName);
        const appendElemFn = (appendTo, newElement) => _renderer2.appendChild(appendTo, newElement);
        const setPropsJSFn = libLink => {
            const newElement = createElemFn('script');
            newElement.src = libLink;
            newElement.type = 'text/javascript';
            appendElemFn(this._doc.body, newElement);
            return newElement;
        };
        const iterateOverPluginsJS = (arrOfResorces: Array<any>) => {
            const iterator = ({ lib, deps }) => {
                const newElem = setPropsJSFn(lib);
                if (deps.length > 0) {
                    newElem.onload = () => iterateOverPluginsJS(deps);
                }
            };
            arrOfResorces.forEach(iterator);
        };

        for (const resourceType in ResourceLinks) {
            if (resourceType === 'css') {
                ResourceLinks[resourceType].forEach(resourceLink => {
                    const newElem = createElemFn('link');
                    newElem.href = resourceLink;
                    newElem.rel = 'stylesheet';
                    newElem.type = 'text/css';
                    appendElemFn(this._doc.head, newElem);
                });
            }else if (resourceType === 'js') {
                iterateOverPluginsJS(ResourceLinks[resourceType]);
            }
        }
        this._isLinksAllocated = true;
    }
}
