const express = require("express");
const routes = express.Router()
const views = __dirname + "/views/"

/*
//req, res
routes.get("/", (req, res) => {
    return res.sendFile(__dirname + "/views/index.html")
})*/

//Substitui o acima por este abaixo:
//const basePath = __dirname + "/views", após adicionar o ejs, foi retirado pois o ejs já le esta pasta por padrão
// variavel basePath para encurtar os routes abaixo 
//rotas abaixo antes de renderizar
/*routes.get("/", (req, res) => res.sendFile(basePath + "/index.html"))
routes.get("/job", (req, res) => res.sendFile(basePath + "/job.html"))
routes.get("/job/edit", (req, res) => res.sendFile(basePath + "/job-edit.html"))
routes.get("/profile", (req, res) => res.sendFile(basePath + "/profile.html"))*/

//rotas abaixo após renderizar adicionado o ejs
routes.get("/", (req, res) => res.render(views + "index"))
routes.get("/job", (req, res) => res.render(views + "job"))
routes.get("/job/edit", (req, res) => res.render(views + "job-edit"))
routes.get("/profile", (req, res) => res.render(views + "profile"))


module.exports = routes;

//Este arquivo esta criando todas as rotas dos docs html da pasta views
//o routes sendo exportado acima esta sendo pego pelo require do arquivo server.js