const express = require("express");
const routes = express.Router()
const ProfileController = require('./controllers/ProfileController')
const JobController = require('./controllers/JobController')
const DashboardController = require('./controllers/DashboardController')

/*
//req, res
routes.get("/", (req, res) => {
    return res.sendFile(__dirname + "/views/index.html")
})
*/

//Substitui o acima por este abaixo:
//const basePath = __dirname + "/views", após adicionar o ejs, foi retirado pois o ejs já le esta pasta por padrão
// variavel basePath para encurtar os routes abaixo 
//rotas abaixo antes de renderizar
/*routes.get("/", (req, res) => res.sendFile(basePath + "/index.html"))
routes.get("/job", (req, res) => res.sendFile(basePath + "/job.html"))
routes.get("/job/edit", (req, res) => res.sendFile(basePath + "/job-edit.html"))
routes.get("/profile", (req, res) => res.sendFile(basePath + "/profile.html"))*/

//rotas abaixo após renderizar adicionado o ejs
routes.get("/", DashboardController.index)
routes.get("/job", JobController.create)
routes.post("/job", JobController.save)
routes.get("/job/:id", JobController.show)
routes.post("/job/:id", JobController.update)
routes.post("/job/delete/:id", JobController.delete)
routes.get("/profile", ProfileController.index)
routes.post("/profile", ProfileController.update)

module.exports = routes;

//Este arquivo esta criando todas as rotas dos docs html da pasta views
//o routes sendo exportado acima esta sendo pego pelo require do arquivo server.js
