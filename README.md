# Startpage Current Tab

A Firefox add-on that makes links on startpage.com open in the current tab
instead of a new tab.

## Testing locally

1. Open `about:debugging#/runtime/this-firefox`
2. Click **Load Temporary Add-on...**
3. Select `manifest.json` from this directory

## Building for AMO

With Node.js installed:

```sh
npx web-ext lint
npx web-ext build
```
