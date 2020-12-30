const path = require('path');
const { defaultMaxListeners } = require('stream');
const fn = require('./funcoes');

const caminho = path.join(__dirname, '../', 'dados', 'legendas')

const simbolos = [
    '.', '?', '-', ',','"','♪',
    '_', '<i>', '</i>', '\r', '[',']',
    '(', ')', '!'
]

fn.lerDiretorio(caminho)
    .then(fn.elementosTerminadosCom('.srt'))
    .then(fn.lerArquivos)
    .then(fn.mesclarElementos)
    .then(fn.separarTextoPor('\n'))
    .then(fn.removerSeVazio)
    .then(fn.removerSeIncluir('-->'))
    .then(fn.removerSeApenasNumero)
    .then(fn.removerSimbolos(simbolos))
    .then(fn.mesclarElementos)
    .then(fn.separarTextoPor(' '))
    .then(fn.removerSeVazio)
    .then(fn.removerSeApenasNumero)
    .then(fn.agruparPalavras)
    .then(fn.ordernarPorAtributoNumerico('qtde', 'desc'))
    .then(console.log);
