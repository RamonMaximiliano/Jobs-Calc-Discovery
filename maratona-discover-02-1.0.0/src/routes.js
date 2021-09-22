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


//criou um objeto, que sera enviado pro motor do ejs e então injetado no HTML
const profile = {
    name: "Ramon",
    avatar: "https://avatars.githubusercontent.com/u/55163563?v=4",
    "monthly-budget": 3000,
    "days-per-week": 5,
    "hours-per-day": 5,
    "vacation-per-year": 4
}

//variavel criada para captar o objeto job { name: 'Test', 'daily-hours': '10', 'total-hours': '100' }
const jobs = [] 

//rotas abaixo após renderizar adicionado o ejs
routes.get("/", (req, res) => res.render(views + "index"))
routes.get("/job", (req, res) => res.render(views + "job"))
routes.post("/job", (req, res) => {
    //variavel criada para captar o objeto job { name: 'Test', 'daily-hours': '10', 'total-hours': '100' }
    jobs.push(red.body)
    //após adicionar o job ele redirecionará para pagina principal, por conta do '/'
    return res.redirect('/')
})

routes.get("/job/edit", (req, res) => res.render(views + "job-edit"))
routes.get("/profile", (req, res) => res.render(views + "profile", {profile: profile}))


module.exports = routes;

//Este arquivo esta criando todas as rotas dos docs html da pasta views
//o routes sendo exportado acima esta sendo pego pelo require do arquivo server.js