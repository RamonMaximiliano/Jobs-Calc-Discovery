const JobController = require("../controllers/JobController");

//variavel criada para captar o objeto job { name: 'Test', 'daily-hours': '10', 'total-hours': '100' }
let data = [
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
];

module.exports = {
    get(){
        return data
    },
    update(newJob){
        data = newJob
    },
    delete(id){
        data = data.filter(job => Number(job.id) != Number(id))
    },
    create(newJob){
        data.push(newJob)
    }
}