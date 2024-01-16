import leitorArquivo from "./index.js";
import fs from "fs";
import chalk from "chalk";
import validaLista from "./https-validacao.js";

const caminho = process.argv;

async function imprimeConsole(valida, resultados, identificador = ``){

    if (valida){
    console.log(
      chalk.yellow(`Lista de links:`),
      chalk.green.bgBlue(identificador),
     await validaLista(resultados));
    } else 
    console.log(
        chalk.yellow(`Lista de links:`),
        chalk.green.bgBlue(identificador),
        resultados)

}


async function processaTexto(argumentos){
    const Caminho = argumentos[2];
    const Valida = argumentos[3] === `--valida`;
    try {
        fs.lstatSync(Caminho)

    } catch (erro) {
        if (erro.code === `ENOENT`){
            console.log(chalk.red("Arquivo não existe."))
            return
        }
    }


    if (fs.lstatSync(Caminho).isFile()){
        const resultados = await leitorArquivo(Caminho);
        imprimeConsole(Valida, resultados);
        } else if (fs.lstatSync(Caminho).isDirectory){
            const arquivos = await fs.promises.readdir(Caminho)
            arquivos.forEach(async (nomeDeArquivo) => {
            const lista = await leitorArquivo(`${Caminho}/${nomeDeArquivo}`)
            imprimeConsole(Valida, lista, nomeDeArquivo)
            })
            }

        }
    



processaTexto(caminho)
