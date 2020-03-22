# coc-nextword

[nextword][] extension for coc.nvim

## Install

1. install [nextword][]: `go get -u github.com/high-moctane/nextword`
1. download [nextword dataset](https://github.com/high-moctane/nextword-data)
1. set `$NEXTWORD_DATA_PATH`: `export NEXTWORD_DATA_PATH=/path/to/nextword-data`
1. `:CocInstall coc-nextword`

## Configurations

- `nextword.filetypes`: filetypes that enable nextword, defaults `["markdown", "gitcommit"]`
- `nextword.dataPath`: custom path of nextword dataset, will override `$NEXTWORD_DATA_PATH`
- `nextword.count`: max candidates word number, defaults `100`
- `nextword.greedy`: show as many results as possible, defaults `true`

## License

MIT

---

> This extension is created by [create-coc-extension](https://github.com/fannheyward/create-coc-extension)

[nextword]: https://github.com/high-moctane/nextword
