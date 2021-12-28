import { ipcRenderer } from 'electron';
import { openClusterContextMenu } from './clusterContextMenu';
import { openTerminalContextMenu } from './terminalContextMenu';
import { MainProcessClient } from './types';

export default function createMainProcessClient(): MainProcessClient {
  return {
    getRuntimeSettings() {
      return ipcRenderer.sendSync('main-process-get-runtime-settings');
    },
    openTerminalContextMenu,
    openClusterContextMenu,
  };
}