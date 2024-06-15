const validator = require('validator')
const yargs = require('yargs')
const chalk = require('chalk')
const getNotes = require('./notes')

// Customize yargs yarn version
yargs.version('1.1.0')

// $ node app.js --help
// $ node app.js add --title="My Title" --body="My Body"
// $ node app.js remove

// Create add command
yargs.command({
  command: 'add',
  describe: 'Add a new note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string'
    },
    body: {
      describe: 'Node Body',
      demandOption: true,
      type: 'string'
    }
  },
  handler: function (argv) {
    // console.log('Adding a new note!', argv.title)
    console.log('Title :', argv.title)
    console.log('Body :', argv.body)
  }
})

// Create remove command
yargs.command({
  command: 'remove',
  describe: 'Remove a new note',
  handler: function () {
    console.log('Removing a new note!')
  }
})

// Create list command
yargs.command({
  command: 'list',
  describe: 'List out notes',
  handler: function () {
    console.log('Listing out all notes!')
  }
})

// Create list command
yargs.command({
  command: 'read',
  describe: 'Read new note',
  handler: function () {
    console.log('Reading a new note!')
  }
})

yargs.parse()

// add, remove, read, list
// console.log(yargs.argv)