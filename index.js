const VUEX_MUTATION = 'VUEX_MUTATION';

function registerVuexHub() {
	const { BrowserWindow, ipcMain } = require('electron');

	ipcMain.on(VUEX_MUTATION, (event, mutation) => {
		const originWindow = event.sender.getOwnerBrowserWindow();
		const windows = BrowserWindow.getAllWindows();

		for (let win of windows)
			// Loose equals is intended, idk why Electron does this uh.
			if (win.id != originWindow.id)
				win.webContents.send(VUEX_MUTATION, mutation);
	});
}

function registerVuexNode(store) {
	const { ipcRenderer } = require('electron');

	store.subscribe((mutation) => {
		if (!mutation.payload || !mutation.payload.__IPC_MUTATION)
			ipcRenderer.send(VUEX_MUTATION, mutation);
	});

	ipcRenderer.on(VUEX_MUTATION, (event, mutation) => {
		store.commit(mutation.type, {
			...mutation.payload || [],
			__IPC_MUTATION: true,
		});
	});
}

module.exports = {
	registerVuexHub,
	registerVuexNode,
};
