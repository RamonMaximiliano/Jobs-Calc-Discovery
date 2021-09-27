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
const Profile = {
    data: {
        name: "Ramon",
        avatar: "https://avatars.githubusercontent.com/u/55163563?v=4",
        "monthly-budget": 3000,
        "days-per-week": 5,
        "hours-per-day": 5,
        "vacation-per-year": 4,
        "value-hour": 75
    },
    controllers: {
       index(req, res){
        return res.render(views + "profile", {profile: Profile.data})
       },

       update(req, res) {

       }
    },

}



const Job = {
    //variavel criada para captar o objeto job { name: 'Test', 'daily-hours': '10', 'total-hours': '100' }
    data: [
        [
            {
                id: 1,
                name: "Pizzaria Guloso",
                "daily-hours": 2,
                "total-hours": 1,
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
    ],
    controllers: {
        index(req, res) {
               const updatedJobs = Job.data.map((job) => {
            
                    const remaining = Job.services.remainingDays(job)
                    const status = remaining <= 0 ? 'done' : 'progress'
                    return {
                        ...job,
                        remaining,
                        status,
                        budget: Profile.data["value-hour"] * job["total-hours"]
                    }
                })
            
                return res.render(views + "index", { jobs: updatedJobs })
        },

        create(req, res){
        return res.render(views + "job")
        },
        save(req, res){
            //variavel criada para captar o objeto job { name: 'Test', 'daily-hours': '10', 'total-hours': '100' }
            //ela busca no array jobs acima, o item de last id, caso não tenha nenhum dai coloca o 1 
            //const lastId = jobs[jobs.length - 1]?.id || 1; com o ponto de interrogação ali não esta funcionando,verificar o porque
            const lastId = Job.data[Job.data.length - 1].id || 1;

            Job.data.push({
                id: lastId + 1,
                name: req.body.name,
                "daily-hours": req.body["daily-hours"],
                "total-hours": req.body["total-hours"],
                created_at: Date.now() // atribuindo data de hoje
            })

            //após adicionar o job ele redirecionará para pagina principal, por conta do '/'
            return res.redirect('/')


        }
    },
    services: {
         remainingDays(job){
            //calculo de tempo restante para finalização do job
            const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed()
        
            const createDate = new Date(job.created_at)
            const dueDay = createDate.getDate() + Number(remainingDays)
            const dueDateInMs = createDate.setDate(dueDay)
        
            const timeDiffInMs = dueDateInMs - Date.now()
            // transformar milli em dias
            const dayInMs = 1000 * 60 * 60 *24
            const dayDiff = Math.floor(timeDiffInMs / dayInMs)
            
            //restam x dias 
            return dayDiff
        }
    }
}

//rotas abaixo após renderizar adicionado o ejs
routes.get("/", Job.controllers.index)
routes.get("/job", Job.controllers.create)
routes.post("/job", Job.controllers.save)

routes.get("/job/edit", (req, res) => res.render(views + "job-edit"))
routes.get("/profile", Profile.controllers.update)

module.exports = routes;

//Este arquivo esta criando todas as rotas dos docs html da pasta views
//o routes sendo exportado acima esta sendo pego pelo require do arquivo server.js