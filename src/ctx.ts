import { ChildProcess, spawn } from 'child_process';
import { CompletionItem, CompletionItemProvider, ExtensionContext, workspace, WorkspaceConfiguration } from 'coc.nvim';
import path from 'path';
import which from 'which';

export class Nextword implements CompletionItemProvider {
  private cfg: WorkspaceConfiguration;
  private proc: ChildProcess | null = null;

  constructor(private readonly context: ExtensionContext) {
    this.cfg = workspace.getConfiguration('nextword');
  }

  get enable() {
    return this.cfg.get('enable') as boolean;
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

  get greedy() {
    return this.cfg.get('greedy') as boolean;
  }

  get wasm() {
    return this.cfg.get('wasm') as boolean;
  }

  get bin(): string | null {
    if (this.wasm) return process.platform === 'win32' ? 'node.exe' : 'node';

    const cmd = process.platform === 'win32' ? 'nextword.exe' : 'nextword';
    return which.sync(cmd, { nothrow: true });
  }

  async provideCompletionItems(): Promise<CompletionItem[]> {
    if (!this.proc) {
      let args: string[] = [];
      if (this.wasm) {
        args.push(path.join(this.context.extensionPath, 'bin', 'wasm_exec.js'));
        args.push(path.join(this.context.extensionPath, 'bin', 'nextword.wasm'));
      }
      if (this.greedy) args.push('-g');
      args = args.concat(['-c', this.count]);
      if (this.dataPath) args = args.concat(['-d', this.dataPath]);
      this.proc = spawn(this.bin!, args);
    }

    if (!this.proc) return [];

    const line = await workspace.nvim.line;
    const parts = line.split(/[.?!]/);
    const last = parts[parts.length - 1];
    if (!last) return [];
    this.proc.stdin?.write(last + '\n');

    return new Promise<CompletionItem[]>((resolve) => {
      const items: CompletionItem[] = [];
      this.proc?.stdout?.on('data', (chunk) => {
        for (const word of (chunk.toString() as string).split(' ')) {
          const label = word.trimRight();
          if (!label) continue;
          items.push({ label })
        }

        resolve(items);
      });

      this.proc?.on('error', () => resolve(items));
    });
  }
}
