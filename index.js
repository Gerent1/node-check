const express = require('express'); //import express module from node_modules
const app = express(); //express instance
const port = 8080; //port number

//add a middleware to parse the request body
app.use(express.json());

//mock database
const todoList = [
    {
      id: 1,
      title: "Finish homework",
      description: "Complete all assignments for math, science, and history classes.",
      completed: false
    },
    {
      id: 2,
      title: "Call John",
      description: "Discuss plans for the upcoming weekend trip to the mountains.",
      completed: false
    },
    {
      id: 3,
      title: "Buy birthday gift",
      description: "Purchase a gift for Sarah's birthday party next week.",
      completed: false
    },
    {
      id: 4,
      title: "Renew gym membership",
      description: "Extend gym membership for another three months to continue fitness routine.",
      completed: false
    },
    {
      id: 5,
      title: "Schedule dentist appointment",
      description: "Book a check-up appointment with the dentist for next month.",
      completed: false
    },
    {
      id: 6,
      title: "Write report",
      description: "Complete the quarterly report for the finance department.",
      completed: false
    },
    {
      id: 7,
      title: "Plan vacation",
      description: "Research destinations and book accommodations for the summer vacation.",
      completed: false
    },
    {
      id: 8,
      title: "Organize garage",
      description: "Declutter and organize items in the garage for better storage.",
      completed: false
    },
    {
      id: 9,
      title: "Attend yoga class",
      description: "Attend the 6 PM yoga class at the local gym for relaxation and exercise.",
      completed: false
    },
];

app.get('/todos', (req, res) => {
    //send status code
    res.status(200);
    res.send(todoList);
    });

app.get('/todos/:id', (req, res) => {
    //get the id from the request
    const id = req.params.id;
    //find todo item
    const todoItem = todoList.find((item) => item.id === parseInt(id));

    //if the todo item is not found
    if (!todoItem)  {
        //send status code
        res.status(404);
        res.send("Todo item not found");
        return;
    }
    //send status code
    res.status(200);
    res.send(todoItem);
    });
    //create new todo
    app.post('/todos', (req, res) => {
        const {title, description, completed} = req.body;
        //create a new todo item
        const newTodo = {
            id: todoList.length + 1,
            title,
            description,
            completed: false
        };


        //add the new todo item to the list
        todoList.push(newTodo);
        //send status code
        res.status(201);
        res.send(newTodo);
        });

        //update single todo item
        app.put('/todos/:id', (req, res) => {
            const id = req.params.id;
            const {title, description, completed} = req.body;
            //find the todo item
            const todoItem = todoList.find((item) => item.id === parseInt(id));
            //if the todo item is not found
            if (!todoItem) {
                //send status code
                res.status(404);
                res.send("Todo item not found");
                return;
            }
            //update the todo item
            todoItem.title = title;
            todoItem.description = description;
            todoItem.completed = completed;
            //send status code
            res.status(200);
            res.send(todoItem);
            });

            //delete single todo item
            app.delete('/todos/:id', (req, res) => {
                const id = req.params.id;
                //find the index of the todo item
                const index = todoList.findIndex((item) => item.id === parseInt(id));
                //if the todo item is not found
                if (index < 0 ) {
                    //send status code
                    res.status(404);
                    res.send("Todo item not found");
                    return;
                }
                //remove the todo item from the list
                todoList.splice(index, 1);
                //send status code
                res.status(204);
                res.send();
                });

app.listen(port, () => {
    console.log(`🤣 listening at http://localhost:${port}`);
    });