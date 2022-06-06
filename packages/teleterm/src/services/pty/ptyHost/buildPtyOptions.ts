import { RuntimeSettings } from 'teleterm/mainProcess/types';
import { PtyProcessOptions } from 'teleterm/sharedProcess/ptyHost';
import {
  resolveShellEnvCached,
  ResolveShellEnvTimeoutError,
} from './resolveShellEnv';
import { PtyCommand, PtyProcessCreationStatus } from '../types';

export async function buildPtyOptions(
  settings: RuntimeSettings,
  cmd: PtyCommand
): Promise<{
  processOptions: PtyProcessOptions;
  creationStatus: PtyProcessCreationStatus;
}> {
  const { shellEnv, creationStatus } = await resolveShellEnvCached(
    settings.defaultShell
  )
    .then(resolvedEnv => ({
      shellEnv: resolvedEnv,
      creationStatus: PtyProcessCreationStatus.Ok,
    }))
    .catch(error => {
      if (error instanceof ResolveShellEnvTimeoutError) {
        return {
          shellEnv: undefined,
          creationStatus: PtyProcessCreationStatus.ResolveShellEnvTimeout,
        };
      }
      throw error;
    });

  const env = {
    ...process.env,
    ...shellEnv,
    TELEPORT_HOME: settings.tshd.homeDir,
    TELEPORT_CLUSTER: cmd.actualClusterName,
    TELEPORT_PROXY: cmd.proxyHost,
  };

  return {
    processOptions: getPtyProcessOptions(settings, cmd, env),
    creationStatus,
  };
}

function getPtyProcessOptions(
  settings: RuntimeSettings,
  cmd: PtyCommand,
  env: typeof process.env
): PtyProcessOptions {
  switch (cmd.kind) {
    case 'pty.shell':
      // Teleport Connect bundles a tsh binary, but the user might have one already on their system.
      // Since we use our own TELEPORT_HOME which might differ in format with the version that the
      // user has installed, let's prepend our bin directory to PATH.
      //
      // At the moment, this won't ensure that our bin dir is at the front of the path. When the
      // shell session starts, the shell will read the rc files. This means that if the user
      // prepends the path there, they can possibly have different version of tsh there.
      //
      // settings.binDir is present only in the packaged version of the app.
      if (settings.binDir) {
        prependBinDirToPath(env, settings);
      }

      return {
        path: settings.defaultShell,
        args: [],
        cwd: cmd.cwd,
        env,
        initCommand: cmd.initCommand,
      };

    case 'pty.tsh-kube-login':
      return {
        //path: settings.tshd.binaryPath,
        path: settings.defaultShell,
        args: [
          `-c`,
          `${settings.tshd.binaryPath}`,
          `--proxy=${cmd.rootClusterId}`,
          `kube`,
          `login`,
          `${cmd.kubeId}`,
        ],
        env,
      };

    case 'pty.tsh-login':
      const loginHost = cmd.login
        ? `${cmd.login}@${cmd.serverId}`
        : cmd.serverId;

      return {
        path: settings.tshd.binaryPath,
        args: [`--proxy=${cmd.rootClusterId}`, 'ssh', loginHost],
        env,
      };
    default:
      throw Error(`Unknown pty command: ${cmd}`);
  }
}

function prependBinDirToPath(
  env: typeof process.env,
  settings: RuntimeSettings
): void {
  let path: string = env['PATH'] || '';

  if (!path.trim()) {
    path = settings.binDir;
  } else {
    path = settings.binDir + ':' + path;
  }

  env['PATH'] = path;
}
