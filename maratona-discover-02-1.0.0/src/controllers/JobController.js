const Job = require('../model/Job')
const JobUtils = require('../utils/JobUtils')
const Profile = require('../model/Profile')

module.exports =  {
    create(req, res){
    return res.render("job")
    },

    save(req, res){
        //variavel criada para captar o objeto job { name: 'Test', 'daily-hours': '10', 'total-hours': '100' }
        //ela busca no array jobs acima, o item de last id, caso não tenha nenhum dai coloca o 1 
        //const lastId = jobs[jobs.length - 1]?.id || 1; com o ponto de interrogação ali não esta funcionando,verificar o porque
        const jobs = Job.get()
        const lastId = jobs[jobs.length - 1]?.id || 0;

        Job.create({
            id: lastId + 1,
            name: req.body.name,
            "daily-hours": req.body["daily-hours"],
            "total-hours": req.body["total-hours"],
            created_at: Date.now() // atribuindo data de hoje
        });

        //após adicionar o job ele redirecionará para pagina principal, por conta do '/' 
        return res.redirect('/')
    },

    show(req, res){
        const jobId = req.params.id
        const jobs = Job.get()
        const job = jobs.find(job => Number(job.id) === Number(jobId))

        if(!job) {
            return res.send("Job not found!")
        }

        const profile = Profile.get()

        job.budget = JobUtils.calculateBudget(job, profile["value-hour"])

        return res.render("job-edit", {job})
    },

    update(req, res) {
        const jobId = req.params.id
        const jobs = Job.get()

        const job = jobs.find(job => Number(job.id) === Number(jobId))

        if(!job) {
            return res.send("Job not found!")
        }

        const updatedJob = {
            ...job,
            name: req.body.name,
            "total-hours": req.body["total-hours"],
            "daily-hours": req.body["daily-hours"],
        }

        const newJobs = jobs.map(job => {
        if(Number(job.id) === Number(jobId)) {
            job = updatedJob
        }    
        return job
        })

        Job.update(newJobs)
        res.redirect("/job/" + jobId)
    },

    delete(req,res) {
        const jobId = req.params.id 
        Job.delete(jobId)
        return res.redirect("/")
    }
}