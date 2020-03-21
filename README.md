# coc-nextword

[nextword][] extension for coc.nvim

## Install

1. install [nextword][]: `go get -u github.com/high-moctane/nextword`
1. download [nextword dataset](https://github.com/high-moctane/nextword-data)
1. set `$NEXTWORD_DATA_PATH`: `export NEXTWORD_DATA_PATH=/path/to/nextword-data`
1. `:CocInstall coc-nextword`

## Configurations

- `nextword.filetypes`: Filetypes that enable nextword
- `nextword.dataPath`: Custom path of nextword dataset
- `nextword.count`: Max candidates word number

## License

MIT

---

> This extension is created by [create-coc-extension](https://github.com/fannheyward/create-coc-extension)

[nextword]: https://github.com/high-moctane/nextword
