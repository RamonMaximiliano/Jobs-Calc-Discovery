module.exports = {
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