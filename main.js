const {
  app,
  BrowserWindow,
  globalShortcut,
} = require('electron');

let mainWindow = null;

app.on('window-all-closed', function() {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', function() {

  var disableMouse = false;
  // PCのグローバルショートカットキーを上書き
  // マウス無効最前面トグル
  globalShortcut.register('CommandOrControl+M', () => {
    disableMouse = !disableMouse;
    // マウスの無効有効設定
    mainWindow.setIgnoreMouseEvents(disableMouse);
    // 最前面のトグル
    mainWindow.setAlwaysOnTop(disableMouse);
    mainWindow.focus();
    mainWindow.webContents.executeJavaScript(`setDisableMouse(${disableMouse})`);
    if (!disableMouse) {
      setTimeout(() => {
        mainWindow.moveTop();
      }, 32);
    }
  });
  mainWindow = new BrowserWindow({
    webPreferences: {
      // webSecurity: false,
      // allowRunningInsecureContent: true,
      // webview タグを使うには必要
      webviewTag: true,
    },
    width: 800,
    height: 800,
    // ウィンドウ透過
    transparent: true,
    // 影なし
    hasShadow: false,

    // frame: false,
  });
  mainWindow.setAlwaysOnTop(true);
  mainWindow.loadURL(`file://${__dirname}/frame.html?{}`);

  mainWindow.on('closed', function() {
    mainWindow = null;
    app.quit();
  });
});