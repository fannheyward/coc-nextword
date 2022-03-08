**NEW PREDICTION ENGINE [MOCWORD](https://github.com/high-moctane/mocword) IS AVAILABLE, TRY [coc-mocword](https://github.com/fannheyward/coc-mocword)**.

# coc-nextword

[nextword][] extension for coc.nvim

![](https://user-images.githubusercontent.com/345274/109935135-38bc3180-7d08-11eb-8d04-3e46b8df1fa4.mov)

## Install

1. Install [nextword][]. **Note**: you can use bundled `nextword.wasm` instead, see `nextword.wasm`.
1. Download [nextword dataset](https://github.com/high-moctane/nextword-data)
1. Set `$NEXTWORD_DATA_PATH`: `export NEXTWORD_DATA_PATH=/path/to/nextword-data`
1. `:CocInstall coc-nextword`

## Configurations

- `nextword.filetypes`: filetypes that enable nextword, defaults `["text", "help", "markdown", "gitcommit"]`
- `nextword.dataPath`: custom path of nextword dataset, will override `$NEXTWORD_DATA_PATH`
- `nextword.count`: max candidates word number, defaults `10`
- `nextword.greedy`: show as many results as possible, defaults `true`
- `nextword.wasm`: use bundled WebAssembly version `nextword`, this means you don't need to install `nextword` by Go, defaults `false`. In my tests, `nextword.go` takes 20-30ms to do suggesting, `nextword.wasm` takes 80-100ms.

## License

MIT

---

> This extension is created by [create-coc-extension](https://github.com/fannheyward/create-coc-extension)

[nextword]: https://github.com/high-moctane/nextword
