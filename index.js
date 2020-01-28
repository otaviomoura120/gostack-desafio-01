const express = require("express");

const server = express();

server.listen(3000);

let numberOfCalls = 0;

const projects = [{
    id : '1',
    title: 'Novo projeto', 
    tasks: []
}];

server.use(express.json());

server.use((req, res, next) => {
    numberOfCalls++;
    console.log(`Call number: ${numberOfCalls}`);
    next();
});

function checkIfProjectIdExists(req, res, next){
    const project = projects.find( ({ id }) => id === req.params.id );;
    
    if(!project){
        return res.status(400).send("There is no project with this ID");
    }

    req.project = project;
    next();
}

function checkIfProjectExists(req, res, next){
    const project = projects.find( ({ id }) => id === req.body.id );;
    
    if(project){
        return res.status(400).send("This Project ID has already been taken, please, choose another")
    }

    next();
}

server.get("/projects", (req,res) => {
    return res.json(projects);
});

server.get("/projects/:id", checkIfProjectIdExists, (req,res) => {
    return res.json(req.project);
});

server.post("/projects", checkIfProjectExists, (req,res) => {
    
    const { id, title } = req.body;
    projects.push({
        id : id,
        title: title, 
        tasks: []
    });
    res.send(projects);
});

server.post("/projects/:id/tasks", checkIfProjectIdExists, (req,res) => {
    const {title} = req.body;
    req.project.tasks.push(title);
    res.json(req.project);
});

server.put("/projects/:id", checkIfProjectIdExists, (req,res) => {
    const {title} = req.body;
    req.project.title = title;
    res.json(req.project);
});

server.delete("/projects/:id", checkIfProjectIdExists, (req,res) => {
    const index = projects.findIndex(({id}) => id === req.project.id );
    projects.splice(index,1)
    //projects = projects.filter( (projectList) => projectList.id !== req.project.id);
    res.json();
});
