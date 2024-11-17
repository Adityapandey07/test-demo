const express = require('express');
const app = express();


app.use(express.json());

var users = [
    {
        name: "John",
        kidneys: [
            {
                healthy:  false
            },
            {
                healthy: true
            }
        ]
    }
]

function healthcheck(){

    let healthyCount = 0;
    let totalKidneys = users[0].kidneys.length;
    
    for (let i = 0; i < totalKidneys; i++) {
        if (users[0].kidneys[i].healthy) {
            healthyCount = healthyCount + 1
        }
    }   
    //you can return obj also in JS
        return {
            healthyKidneys: healthyCount,
            totalKidneys: totalKidneys
        }
}

//kidney ka status
app.get("/", function(req, res){
    let num_healthy = healthcheck();
    let unhealthykidney = num_healthy.totalKidneys - num_healthy.healthyKidneys
    res.send("You have "+num_healthy.totalKidneys+" Kidneys & Healthy Kidney count: "+num_healthy.healthyKidneys+" & Unhealthy Kidney count "+unhealthykidney);

})

//kidney daalo
app.post("/", function(req, res){

    const isHealthy = req.body.isHealthy;
    users[0].kidneys.push({
        healthy: isHealthy
    })
    //you dont need to result back the users just simple reponse as done w.r.t post, put, delete
    res.json({
        msg: "Done!!"
    })

})

//add new healthy kidney
app.put("/", function(req, res){

    for(let i = 0; i<users[0].kidneys.length; i++){
        users[0].kidneys[i] = {
            healthy : true
        }
    }//you dont need to result back the users just simple reponse as done w.r.t post, put, delete
    res.json({
        msg: "Done!"
    })

})

//remove unhealthy kidney
app.delete("/", function(req, res){

    const newKidney = [];
    for(let i = 0; i<users[0].kidneys.length; i++){
        if(users[0].kidneys[i].healthy){
            newKidney.push({
                healthy : true
            })
        }
        
    }
    users[0].kidneys = newKidney

    res.json({
        msg: "Deleted Successfully!"
    })
})

app.listen(3000);