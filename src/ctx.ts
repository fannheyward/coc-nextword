import { ChildProcess, spawn } from 'child_process';
import { CompleteResult, VimCompleteItem, workspace, WorkspaceConfiguration } from 'coc.nvim';
import { existsSync } from 'fs';
import which from 'which';

class Config {
  private cfg: WorkspaceConfiguration;

  constructor() {
    this.cfg = workspace.getConfiguration('nextword');
  }

  get filetypes() {
    return this.cfg.get('filetypes') as string[];
  }

  get dataPath() {
    const dataPath = this.cfg.get('dataPath', '');
    return dataPath ? dataPath : process.env.NEXTWORD_DATA_PATH;
  }

  get count() {
    return this.cfg.get('count') as string;
  }
}

export class Ctx {
  public readonly config: Config;
  private proc: ChildProcess | null = null;
  private menu: string;

  constructor() {
    this.config = new Config();

    const shortcut = workspace.getConfiguration('coc.source.nextword').get('shortcut') as string;
    this.menu = shortcut ? `[${shortcut}]` : '';
  }

  get bin(): string | undefined {
    const bin = which.sync('nextword', { nothrow: true });
    if (!bin) return;

    if (!existsSync(bin)) return;

    return bin;
  }

  async enabled(): Promise<boolean> {
    if (!workspace.getConfiguration('coc.source.nextword').get('enable') as boolean) return false;

    const doc = await workspace.document;
    if (!doc) return false;
    if (this.config.filetypes.length === 0) return false;
    if (this.config.filetypes.includes('*')) return true;

    return this.config.filetypes.includes(doc.filetype);
  }

  async nextwords(): Promise<CompleteResult | undefined> {
    if (!this.enabled()) return;

    if (!this.proc) {
      let args: string[] = ['-c', this.config.count];
      if (this.config.dataPath) {
        args = args.concat(['-d', this.config.dataPath]);
      }
      this.proc = spawn(this.bin!, args);
    }

    if (!this.proc) return;

    const line = await workspace.nvim.line;
    const parts = line.split(/[.,?!]/);
    const last = parts[parts.length - 1];
    if (!last) return;

    this.proc.stdin?.write(last + ' \n');

    return new Promise<CompleteResult>(resolve => {
      const items: VimCompleteItem[] = [];
      this.proc?.stdout?.on('data', chunk => {
        for (const word of (chunk.toString() as string).split(' ')) {
          items.push({ word: word.trimRight(), menu: this.menu });
        }

        resolve({ items });
      });

      this.proc?.on('error', () => {
        resolve();
      });
    });
  }
}
