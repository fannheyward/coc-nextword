import { ExtensionContext, languages, window } from 'coc.nvim';
import { Nextword } from './ctx';

export async function activate(context: ExtensionContext): Promise<void> {
  const ctx = new Nextword(context);
  if (!ctx.enable) return;
  if (!ctx.bin) {
    window.showMessage(`nextword is not found, you need to install first: https://github.com/high-moctane/nextword`, 'warning');
    return;
  }

  if (!ctx.dataPath) {
    window.showMessage(`No nextword dataset found, you can set with nextword.dataPath or $NEXTWORD_DATA_PATH in env`, 'warning');
    return;
  }

  const letters = 'abcdefghijklmnopqrstuvwxyz';
  const characters = (letters + letters.toUpperCase() + ' ').split('');
  const provider = new Nextword(context);
  context.subscriptions.push(languages.registerCompletionItemProvider('nextword', 'Next', ctx.filetypes, provider, characters));
}
