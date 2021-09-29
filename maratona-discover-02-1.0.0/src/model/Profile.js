//criou um objeto, que sera enviado pro motor do ejs e então injetado no HTML
let data = {
    name: "Ramon",
    avatar: "https://avatars.githubusercontent.com/u/55163563?v=4",
    "monthly-budget": 3000,
    "days-per-week": 5,
    "hours-per-day": 5,
    "vacation-per-year": 4,
    "value-hour": 75
}

module.exports = {
    get(){
        return data;
    },
    update(newData){
        data = newData;
    } 
}

