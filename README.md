vuex-electron-ipc
=================

This library allows you to synchronize Vuex state across multiple `BrowserWindow`s.

### Usage

```JavaScript
// ./index.js
const { registerVuexHub } = require('vuex-electron-ipc');

registerVuexHub();

// createWindow() etc.
```

```JavaScript
// ./app/js/app.js
import { registerVuexNode } from 'vuex-electron-ipc';

// ...

export default new Vuex.Store({
	// ...
	plugins: [registerVuexNode]
});

```