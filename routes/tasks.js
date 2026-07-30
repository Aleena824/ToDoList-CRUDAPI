const express = require('express');
const router = express.Router();

let tasks = [{"id": 1, "title": "Solve one leetcode question", "done": true }, {"id": 2, "title": "Go for a walk", "done": false}, {id: 3, "title": "buy groceries", "done":true}];

// router.get("/", (req, res) => {
//     res.json({"name": "Task API", 
//         "version": "1.0", 
//         "endpoints": ["/tasks"]});
// });

// //to check if the server is alive
// router.get("/health", (req,res) => {
//     res.json({"status":"ok"});
// });

//To get all tasks
router.get('/', (req, res) => {
    res.json(tasks);
})

//To find the task by id
router.get("/:id", (req,res) => {
    const task = tasks.find( i => i.id === parseInt(req.params.id));
    if (!task) return res.status(404).json({ "error": `Task ${req.params.id} not found`});
    res.json(task);
});

//To create a new task
router.post("/", (req,res) => {
    try{
        const {title} = req.body;

        if (title == "" || !title) return res.status(400).json({message: "task title is required"})
        
        //If there are tasks in the array, find the largest ID number. If the array is empty, just start at 0
        //... is a spread operator to separate the elements of an array like [1,2,3] becomes 1, 2, 3
        //Math.max function will take the maximum value of the id in the list "tasks" so Math.max gives three here
        let idCounter = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) : 0;// ? is a ternary operator (if/else similar)
        
        const newTask = {
            "id": idCounter+1,
            "title": req.body.title,
            "done": false
        }

        tasks.push(newTask);
        res.status(201).json({message: "Task Created", newTask});
    }catch(err){
        res.status(400).json(err);
    };
})

//To delete a task by id
router.delete('/:id', (req,res) => {
    const taskIdx = tasks.findIndex( t => t.id === parseInt(req.params.id));

    if (taskIdx === -1) return res.status(404).json({error: "No task found"});

    const deletedTask = tasks.splice(taskIdx, 1);

    res.status(204).json();
});

//To update task by id
router.put('/:id', (req,res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));

    if (!task) {
        return res.status(404).json({ error: `Task ${req.params.id} not found` });
    }

    const { title, done } = req.body;
    if (title == undefined || title == "") {
        return res.status(400).json({message: "title required."});
    }else{
        task.title = req.body.title;
    }
    if (typeof done === "boolean") {
        task.done = done;
    }

    res.json(task);
})

module.exports = router;