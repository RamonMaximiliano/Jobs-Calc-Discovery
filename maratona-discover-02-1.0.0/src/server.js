const express = require("express")
const server = express()

//habilitar arquivos statics, criando rotas automaticas er configurações no servidor com o método user abaixo:
//server.use(express.static('public'));
server.use(express.static("public"))
//request, response
server.get('/', (request, response) => {
    //return response.send('Oie!') Método send envia o que estiver 
    //método sendFile, envia um arquivo, neste caso HTML
    //return response.sendFile("/Users/ramon/Documents/GitHub/Jobs-Calc-Discovery/maratona-discover-02-1.0.0/index.html")
    //método dirname abaixo coleta o diretório do servidor e então fica mais facil adicionar o resto do caminho do arquivo html, pois o diretório vai mudar de maquina para maquina, mas assim ele sempre puxa correto idependente da maquina que esta a aplicação alocada. Para verificar: console.log(__dirname + "/views/index.html")
    return response.sendFile(__dirname + "/views/index.html")
})

server.listen(3000, () => console.log('rodando'))