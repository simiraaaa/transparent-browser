const {
  app,
  BrowserWindow,
  globalShortcut,
  Menu,
} = require('electron');

let template = [
  {
    label: app.getName(), submenu: [
      {
        label: 'Reload', accelerator: 'CommandOrControl+R', click() {
          mainWindow.webContents.executeJavaScript('reload()');
        }
      },
      { type: 'separator' },
      { role: 'quit' }
    ]
  }
];

const menu = Menu.buildFromTemplate(template)

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
    var color = disableMouse ? 'black' : 'blue';
    mainWindow.webContents.executeJavaScript(`setBodyBorderColor("${color}")`);
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
  mainWindow.loadURL(`file://${__dirname}/frame.html?{}`);
  // デフォルトのメニューを上書き
  Menu.setApplicationMenu(menu);
  
  mainWindow.on('closed', function() {
    mainWindow = null;
    app.quit();
  });
});