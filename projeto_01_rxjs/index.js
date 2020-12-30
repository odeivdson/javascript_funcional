const path = require('path');
const { defaultMaxListeners } = require('stream');
const _ = require('lodash');
const { toArray, map, groupBy, mergeMap, reduce } = require('rxjs/operators');

const fn = require('./funcoes');

const caminho = path.join(__dirname, '../', 'dados', 'legendas')

const simbolos = [
    '.', '?', '-', ',','"','♪',
    '_', '<i>', '</i>', '\r', '[',']',
    '(', ')', '!'
]

fn.lerDiretorio(caminho)
    .pipe(
        fn.elementosTerminadosCom('.srt'),
        fn.lerArquivo(),
        fn.separarTextoPor('\n'),
        fn.removerSeVazio(),
        fn.removerSeIniciarComNumero(),
        fn.removerSimbolos(simbolos),
        fn.separarTextoPor(' '),
        fn.removerSeVazio(),
        fn.removerSeIniciarComNumero(),
        groupBy(el => el.toLowerCase()),
        mergeMap(grupo => grupo.pipe(toArray())),
        map(palavras => ({elemento: palavras[0], qtde: palavras.length})),
        toArray(),
        map(array => _.sortBy(array, el => -el.qtde))

    )
    .subscribe(console.log)
