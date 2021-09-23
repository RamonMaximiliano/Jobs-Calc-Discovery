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
const jobs = [
    {
        id: 1,
        name: "Pizzaria Guloso",
        "daily-hours": 2,
        "total-hours": 60,
        created_at: Date.now() // atribuindo data de hoje
    },
    {
        id: 2,
        name: "OneTwo Project",
        "daily-hours": 3,
        "total-hours": 47,
        created_at: Date.now() // atribuindo data de hoje
    }
] 

//rotas abaixo após renderizar adicionado o ejs
routes.get("/", (req, res) => res.render(views + "index", { jobs }))
routes.get("/job", (req, res) => res.render(views + "job"))
routes.post("/job", (req, res) => {
    //variavel criada para captar o objeto job { name: 'Test', 'daily-hours': '10', 'total-hours': '100' }
    //ela busca no array jobs acima, o item de last id, caso não tenha nenhum dai coloca o 1 
    //const lastId = jobs[jobs.length - 1]?.id || 1; com o ponto de interrogação ali não esta funcionando,verificar o porque
   const lastId = jobs[jobs.length - 1].id || 1;

    jobs.push({
        id: lastId + 1,
        name: req.body.name,
        "daily-hours": req.body["daily-hours"],
        "total-hours": req.body["total-hours"],
        created_at: Date.now() // atribuindo data de hoje
    })

    //após adicionar o job ele redirecionará para pagina principal, por conta do '/'
    return res.redirect('/')
})

routes.get("/job/edit", (req, res) => res.render(views + "job-edit"))
routes.get("/profile", (req, res) => res.render(views + "profile", {profile: profile}))

module.exports = routes;

//Este arquivo esta criando todas as rotas dos docs html da pasta views
//o routes sendo exportado acima esta sendo pego pelo require do arquivo server.js