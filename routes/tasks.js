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

router.get('/', (req, res) => {
    res.json(tasks);
})

router.get("/:id", (req,res) => {
    const task = tasks.find( i => i.id === parseInt(req.params.id));
    if (!task) return res.status(404).json({ "error": `Task ${req.params.id} not found`});
    res.json(task);
});

module.exports = router;