import chalk  from "chalk"

function extraiObjetos(arrLinks){
return arrLinks.map((objetos) => Object.values(objetos).join())
}


function manejaErro(Erro){
   if (Erro.cause.code == `ENOTFOUND`){
    return `Link não encontrado`   
} else {
    return "Algo deu errado :("
   }
}

async function validaStatus(listaURLs){
const ArrStatus = await Promise.all(
    listaURLs.map(async (url) => {
    try {
        const res = await fetch(url)
        return res.status
    } catch(erro) {
     return manejaErro(erro)

    }
}))
return ArrStatus

}


export default async function validaLista(listaDeLinks){
const links = extraiObjetos(listaDeLinks)
const status = await validaStatus(links)

return listaDeLinks.map((objeto, indice) => ({
    ...objeto,
    status: status[indice]
}))
}