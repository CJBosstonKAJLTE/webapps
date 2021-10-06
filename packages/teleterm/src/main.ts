const path = require('path');
const { app, BrowserWindow, ipcMain } = require('electron');
import { TerminalServiceClient } from './services/tshd/js/teleport/terminal/v1/terminal_service_grpc_pb';
import { ListClustersRequest } from './services/tshd/js/teleport/terminal/v1/terminal_service_pb';
const grpc = require('@grpc/grpc-js');

app.commandLine.appendSwitch('ignore-certificate-errors', 'true');

ipcMain.on('ipc-example', async (event, arg) => {
  const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
  console.log(msgTemplate(arg));
  event.reply('ipc-example', msgTemplate('pong'));
});

const isDevelopment =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDevelopment) {
  require('electron-debug')();
}

const RESOURCES_PATH = app.isPackaged
  ? path.join(process.resourcesPath, 'assets')
  : path.join(__dirname, '../../../../assets');

const getAssetPath = (...paths: string[]): string => {
  return path.join(RESOURCES_PATH, ...paths);
};

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    title: 'Teleport Terminal',
    icon: getAssetPath('icon.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  if (process.env.NODE_ENV === 'development') {
    win.loadURL('https://localhost:8080');
  } else {
    win.loadFile('./../renderer/index.html');
  }
}
//
app.whenReady().then(() => {
  createWindow();
});

const client = new TerminalServiceClient(
  //'unix://terminal.sock',
  'unix:///home/alexey/go/src/github.com/gravitational/teleport/terminal.sock',
  grpc.credentials.createInsecure()
);

client.listClusters(new ListClustersRequest(), (err, data) => {
  /*eslint no-debugger: off*/
  debugger;
  console.log('BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB', err);
  console.log('AAAAAAAAAAAAA', data);
});