import fs from 'fs';

import chalk from 'chalk';
import { error } from 'console';

function capturaLinks(texto){
const regEx = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
const capturados = [...texto.matchAll(regEx)]
const resultados = capturados.map(capturados => ({[capturados[1]]: capturados[2]}))
return resultados.length !== 0 ? resultados : `Não foram encontrados nenhum link.`
}

function trataErro(erro){
throw new Error(chalk.red(`${erro.code} Não há arquivo no diretório!`));
}

async function leitorArquivo(caminhoDoArquivo){
try {
const encoding = `utf-8`
const texto = await fs.promises.readFile(caminhoDoArquivo, 
encoding)
return capturaLinks(texto);
} catch (erro) {
    trataErro(erro)
}

}

export default leitorArquivo;