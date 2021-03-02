import { commands, ExtensionContext, sources, window } from 'coc.nvim';
import { Ctx } from './ctx';

export async function activate(context: ExtensionContext): Promise<void> {
  const ctx = new Ctx(context);
  const enabled = await ctx.enabled();
  if (!enabled) return;

  if (!ctx.bin) {
    window.showMessage(`nextword is not found, you need to install first: https://github.com/high-moctane/nextword`, 'warning');
    return;
  }

  if (!ctx.config.dataPath) {
    window.showMessage(`No nextword dataset found, you can set with nextword.dataPath or $NEXTWORD_DATA_PATH in env`, 'warning');
    return;
  }

  context.subscriptions.push(
    commands.registerCommand('nextword.Command', async () => {
      window.showMessage(`coc-nextword Commands works!`);
    }),

    sources.createSource({
      name: 'nextword',
      doComplete: async () => {
        return ctx.nextwords();
      },
    })
  );
}
