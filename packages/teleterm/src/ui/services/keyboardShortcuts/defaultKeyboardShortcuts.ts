import { KeyboardShortcutType } from './types';

/**
 * Modifier keys must be defined in the following order:
 * Command-Control-Option-Shift for macOS
 * Ctrl-Alt-Shift for other platforms
 */

export const defaultMacShortcuts: Record<KeyboardShortcutType, string> = {
  'tab-1': 'Command-1',
  'tab-2': 'Command-2',
  'tab-3': 'Command-3',
  'tab-4': 'Command-4',
  'tab-5': 'Command-5',
  'tab-6': 'Command-6',
  'tab-7': 'Command-7',
  'tab-8': 'Command-8',
  'tab-9': 'Command-9',
  'tab-close': 'Command-W',
  'tab-new': 'Command-T',
  'tab-previous': 'Control-Shift-Tab',
  'tab-next': 'Control-Tab',
  'focus-global-search': 'F1',
};

export const defaultLinuxShortcuts: Record<KeyboardShortcutType, string> = {
  'tab-1': 'Alt-1',
  'tab-2': 'Alt-2',
  'tab-3': 'Alt-3',
  'tab-4': 'Alt-4',
  'tab-5': 'Alt-5',
  'tab-6': 'Alt-6',
  'tab-7': 'Alt-7',
  'tab-8': 'Alt-8',
  'tab-9': 'Alt-9',
  'tab-close': 'Ctrl-Shift-W',
  'tab-new': 'Ctrl-Shift-T',
  'tab-previous': 'Ctrl-PageUp',
  'tab-next': 'Ctrl-PageDown',
  'focus-global-search': 'F1',
};
