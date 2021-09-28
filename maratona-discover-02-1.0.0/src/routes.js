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
           const data= req.body
           const weeksPerYear = 52
           const weeksPerMonth = (weeksPerYear - data["vacation-per-year"]) / 12
           const weeksTotalHours = data["hours-per-day"] * data["days-per-week"]
           const monthlyTotalHours = weeksTotalHours * weeksPerMonth
           const valueHour = data["value-hour"] = data["monthly-budget"] /  monthlyTotalHours

           Profile.data = {
            ...Profile.data,
            ...req.body,
            "value-hour": valueHour

           }
           return res.redirect("/profile")
       }
    },
}



const Job = {
    //variavel criada para captar o objeto job { name: 'Test', 'daily-hours': '10', 'total-hours': '100' }
    data: [
            {
                id: 1,
                name: "Pizzaria Guloso",
                "daily-hours": 2,
                "total-hours": 1,
                created_at: Date.now(), // atribuindo data de hoje
            },
            {
                id: 2,
                name: "OneTwo Project",
                "daily-hours": 3,
                "total-hours": 47,
                created_at: Date.now(), // atribuindo data de hoje
            }
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
                        budget: Job.services.calculateBudget(job, Profile.data["value-hour"])
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
            const lastId = Job.data[Job.data.length - 1]?.id || 0;

            Job.data.push({
                id: lastId + 1,
                name: req.body.name,
                "daily-hours": req.body["daily-hours"],
                "total-hours": req.body["total-hours"],
                created_at: Date.now() // atribuindo data de hoje
            })

            //após adicionar o job ele redirecionará para pagina principal, por conta do '/'
            return res.redirect('/')


        },

        show(req, res){
            const jobId = req.params.id

            const job = Job.data.find(job => Number(job.id) === Number(jobId))

            if(!job) {
                return res.send("Job not found!")
            }

            job.budget = Job.services.calculateBudget(job, Profile.data["value-hour"])

            return res.render(views + "job-edit", {job})
        },

        update(req, res) {
            const jobId = req.params.id
            const job = Job.data.find(job => Number(job.id) === Number(jobId))
            if(!job) {
                return res.send("Job not found!")
            }

            const updatedJob = {
                ...job,
                name: req.body.name,
                "total-hours": req.body["total-hours"],
                "daily-hours": req.body["daily-hours"],
            }

            Job.data = Job.data.map(job => {

            if(Number(job.id) === Number(jobId)) {
                job = updatedJob
            }    
            return job
            })
            res.redirect("/job/" + jobId)
        },

        delete(req,res) {
            const jobId = req.params.id 
            Job.data = Job.data.filter(job => Number(job.id) !== Number(jobId))
            return res.redirect("/")
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
        },
        calculateBudget: (job, valueHour) => valueHour * job["total-hours"]
    }
}

//rotas abaixo após renderizar adicionado o ejs
routes.get("/", Job.controllers.index)
routes.get("/job", Job.controllers.create)
routes.post("/job", Job.controllers.save)
routes.get("/job/:id", Job.controllers.show)
routes.post("/job/:id", Job.controllers.update)
routes.post("/job/delete/:id", Job.controllers.delete)
routes.get("/profile", Profile.controllers.index)
routes.post("/profile", Profile.controllers.update)

module.exports = routes;

//Este arquivo esta criando todas as rotas dos docs html da pasta views
//o routes sendo exportado acima esta sendo pego pelo require do arquivo server.js