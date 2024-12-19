(()=>{"use strict";var t={612:(t,e)=>{function i(t){for(;t.length;){const e=t.pop();e?.dispose()}}Object.defineProperty(e,"__esModule",{value:!0}),e.Disposable=void 0,e.disposeAll=i,e.Disposable=class{constructor(){this._isDisposed=!1,this._disposables=[]}dispose(){this._isDisposed||(this._isDisposed=!0,i(this._disposables))}_register(t){return this._isDisposed?t.dispose():this._disposables.push(t),t}get isDisposed(){return this._isDisposed}}},256:function(t,e,i){var s,n=this&&this.__createBinding||(Object.create?function(t,e,i,s){void 0===s&&(s=i);var n=Object.getOwnPropertyDescriptor(e,i);n&&!("get"in n?!e.__esModule:n.writable||n.configurable)||(n={enumerable:!0,get:function(){return e[i]}}),Object.defineProperty(t,s,n)}:function(t,e,i,s){void 0===s&&(s=i),t[s]=e[i]}),r=this&&this.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),o=this&&this.__importStar||(s=function(t){return s=Object.getOwnPropertyNames||function(t){var e=[];for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&(e[e.length]=i);return e},s(t)},function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var i=s(t),o=0;o<i.length;o++)"default"!==i[o]&&n(e,t,i[o]);return r(e,t),e});Object.defineProperty(e,"__esModule",{value:!0}),e.activate=function(t){const e=new c.SimpleBrowserManager(t.extensionUri);t.subscriptions.push(e),t.subscriptions.push(a.window.registerWebviewPanelSerializer(l.SimpleBrowserView.viewType,{deserializeWebviewPanel:async(t,i)=>{e.restore(t,i)}})),t.subscriptions.push(a.commands.registerCommand(p,(async t=>{t||(t=await a.window.showInputBox({placeHolder:a.l10n.t("https://example.com"),prompt:a.l10n.t("Enter url to visit")})),t&&e.show(t)}))),t.subscriptions.push(a.commands.registerCommand(u,((t,i)=>{e.show(t,i)}))),t.subscriptions.push(a.window.registerExternalUriOpener(w,{canOpenExternalUri(t){const e=new URL(t.toString(!0));return d.has(e.hostname)?"undefined"!=typeof navigator&&a.env.uiKind===a.UIKind.Web?a.ExternalUriOpenerPriority.Default:a.ExternalUriOpenerPriority.Option:a.ExternalUriOpenerPriority.None},openExternalUri:t=>e.show(t,{viewColumn:a.window.activeTextEditor?a.ViewColumn.Beside:a.ViewColumn.Active})},{schemes:["http","https"],label:a.l10n.t("Open in simple browser")}))};const a=o(i(398)),c=i(208),l=i(506),u="simpleBrowser.api.open",p="simpleBrowser.show",d=new Set(["localhost","127.0.0.1","[0:0:0:0:0:0:0:1]","[::1]","0.0.0.0","[0:0:0:0:0:0:0:0]","[::]"]),w="simpleBrowser.open"},208:(t,e,i)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.SimpleBrowserManager=void 0;const s=i(506);e.SimpleBrowserManager=class{constructor(t){this.extensionUri=t}dispose(){this._activeView?.dispose(),this._activeView=void 0}show(t,e){const i="string"==typeof t?t:t.toString(!0);if(this._activeView)this._activeView.show(i,e);else{const t=s.SimpleBrowserView.create(this.extensionUri,i,e);this.registerWebviewListeners(t),this._activeView=t}}restore(t,e){const i=e?.url??"",n=s.SimpleBrowserView.restore(this.extensionUri,i,t);this.registerWebviewListeners(n),this._activeView??(this._activeView=n)}registerWebviewListeners(t){t.onDispose((()=>{this._activeView===t&&(this._activeView=void 0)}))}}},506:function(t,e,i){var s,n=this&&this.__createBinding||(Object.create?function(t,e,i,s){void 0===s&&(s=i);var n=Object.getOwnPropertyDescriptor(e,i);n&&!("get"in n?!e.__esModule:n.writable||n.configurable)||(n={enumerable:!0,get:function(){return e[i]}}),Object.defineProperty(t,s,n)}:function(t,e,i,s){void 0===s&&(s=i),t[s]=e[i]}),r=this&&this.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),o=this&&this.__importStar||(s=function(t){return s=Object.getOwnPropertyNames||function(t){var e=[];for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&(e[e.length]=i);return e},s(t)},function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var i=s(t),o=0;o<i.length;o++)"default"!==i[o]&&n(e,t,i[o]);return r(e,t),e});Object.defineProperty(e,"__esModule",{value:!0}),e.SimpleBrowserView=void 0;const a=o(i(398)),c=i(612);class l extends c.Disposable{static getWebviewLocalResourceRoots(t){return[a.Uri.joinPath(t,"media")]}static getWebviewOptions(t){return{enableScripts:!0,enableForms:!0,localResourceRoots:l.getWebviewLocalResourceRoots(t)}}static create(t,e,i){const s=a.window.createWebviewPanel(l.viewType,l.title,{viewColumn:i?.viewColumn??a.ViewColumn.Active,preserveFocus:i?.preserveFocus},{retainContextWhenHidden:!0,...l.getWebviewOptions(t)});return new l(t,e,s)}static restore(t,e,i){return new l(t,e,i)}constructor(t,e,i){super(),this.extensionUri=t,this._onDidDispose=this._register(new a.EventEmitter),this.onDispose=this._onDidDispose.event,this._webviewPanel=this._register(i),this._webviewPanel.webview.options=l.getWebviewOptions(t),this._register(this._webviewPanel.webview.onDidReceiveMessage((t=>{if("openExternal"===t.type)try{const e=a.Uri.parse(t.url);a.env.openExternal(e)}catch{}}))),this._register(this._webviewPanel.onDidDispose((()=>{this.dispose()}))),this._register(a.workspace.onDidChangeConfiguration((t=>{if(t.affectsConfiguration("simpleBrowser.focusLockIndicator.enabled")){const t=a.workspace.getConfiguration("simpleBrowser");this._webviewPanel.webview.postMessage({type:"didChangeFocusLockIndicatorEnabled",focusLockEnabled:t.get("focusLockIndicator.enabled",!0)})}}))),this.show(e)}dispose(){this._onDidDispose.fire(),super.dispose()}show(t,e){this._webviewPanel.webview.html=this.getHtml(t),this._webviewPanel.reveal(e?.viewColumn,e?.preserveFocus)}getHtml(t){const e=a.workspace.getConfiguration("simpleBrowser"),i=function(){let t="";const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";for(let i=0;i<64;i++)t+=e.charAt(Math.floor(62*Math.random()));return t}(),s=this.extensionResourceUrl("media","index.js"),n=this.extensionResourceUrl("media","main.css"),r=this.extensionResourceUrl("media","codicon.css");return`<!DOCTYPE html>\n\t\t\t<html>\n\t\t\t<head>\n\t\t\t\t<meta http-equiv="Content-type" content="text/html;charset=UTF-8">\n\n\t\t\t\t<meta http-equiv="Content-Security-Policy" content="\n\t\t\t\t\tdefault-src 'none';\n\t\t\t\t\tfont-src data:;\n\t\t\t\t\tstyle-src ${this._webviewPanel.webview.cspSource};\n\t\t\t\t\tscript-src 'nonce-${i}';\n\t\t\t\t\tframe-src *;\n\t\t\t\t\t">\n\n\t\t\t\t<meta id="simple-browser-settings" data-settings="${o=JSON.stringify({url:t,focusLockEnabled:e.get("focusLockIndicator.enabled",!0)}),o.toString().replace(/"/g,"&quot;")}">\n\n\t\t\t\t<link rel="stylesheet" type="text/css" href="${n}">\n\t\t\t\t<link rel="stylesheet" type="text/css" href="${r}">\n\t\t\t</head>\n\t\t\t<body>\n\t\t\t\t<header class="header">\n\t\t\t\t\t<nav class="controls">\n\t\t\t\t\t\t<button\n\t\t\t\t\t\t\ttitle="${a.l10n.t("Back")}"\n\t\t\t\t\t\t\tclass="back-button icon"><i class="codicon codicon-arrow-left"></i></button>\n\n\t\t\t\t\t\t<button\n\t\t\t\t\t\t\ttitle="${a.l10n.t("Forward")}"\n\t\t\t\t\t\t\tclass="forward-button icon"><i class="codicon codicon-arrow-right"></i></button>\n\n\t\t\t\t\t\t<button\n\t\t\t\t\t\t\ttitle="${a.l10n.t("Reload")}"\n\t\t\t\t\t\t\tclass="reload-button icon"><i class="codicon codicon-refresh"></i></button>\n\t\t\t\t\t</nav>\n\n\t\t\t\t\t<input class="url-input" type="text">\n\n\t\t\t\t\t<nav class="controls">\n\t\t\t\t\t\t<button\n\t\t\t\t\t\t\ttitle="${a.l10n.t("Open in browser")}"\n\t\t\t\t\t\t\tclass="open-external-button icon"><i class="codicon codicon-link-external"></i></button>\n\t\t\t\t\t</nav>\n\t\t\t\t</header>\n\t\t\t\t<div class="content">\n\t\t\t\t\t<div class="iframe-focused-alert">${a.l10n.t("Focus Lock")}</div>\n\t\t\t\t\t<iframe sandbox="allow-scripts allow-forms allow-same-origin allow-downloads"></iframe>\n\t\t\t\t</div>\n\n\t\t\t\t<script src="${s}" nonce="${i}"><\/script>\n\t\t\t</body>\n\t\t\t</html>`;var o}extensionResourceUrl(...t){return this._webviewPanel.webview.asWebviewUri(a.Uri.joinPath(this.extensionUri,...t))}}e.SimpleBrowserView=l,l.viewType="simpleBrowser.view",l.title=a.l10n.t("Simple Browser")},398:t=>{t.exports=require("vscode")}},e={},i=function i(s){var n=e[s];if(void 0!==n)return n.exports;var r=e[s]={exports:{}};return t[s].call(r.exports,r,r.exports,i),r.exports}(256),s=exports;for(var n in i)s[n]=i[n];i.__esModule&&Object.defineProperty(s,"__esModule",{value:!0})})();
//# sourceMappingURL=https://main.vscode-cdn.net/sourcemaps/138f619c86f1199955d53b4166bef66ef252935c/extensions/simple-browser/dist/extension.js.map