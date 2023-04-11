const notes = require('express').Router();
const {v4: uuidv4} = require('uuid');

const {readFromFile, readAndAppend, writeToFile} = require('../helpers/fsutil');


// GET Route for retrieving all the previous notes
notes.get('/', (req, res) => {
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

//Get route to post specific note in viewing area
notes.get('/:id', (req, res) => {
  const note_id = req.params.id;
  readFromFile('./db/db.json')
    .then((data) =>JSON.parse(data))
    .then((json) => {
      const newList = json.filter((note) =>
      note.id === note_id);
      return newList.length > 0
      ? res.json(result)
      :res.json('no task found')
    })
} )

// POST Route for a new task
notes.post('/', (req, res) => {
  console.log(req.body);

  const { title, text } = req.body;

  if (req.body) {
    const newTask = {
      title,
      text,
      id:uuidv4()
    };
console.log(newTask)
    readAndAppend(newTask, './db/db.json');
    res.json(`Task added successfully`);
  } else {
    res.error('Error in adding task');
  }
});

//Deletes note when button is clicked.
notes.delete('/:id', (req, res) =>{
  const note_id = req.params.id;
  readFromFile('./db/db.json')
    .then((data)=>JSON.parse(data))
    .then((json => {
      const newList = json.filter((task) => task.id !== note_id);
      writeToFile('./db/db.json', newList);
      res.json(`Item ${note_id} has been deleted`);
    }))
})


module.exports = notes;
