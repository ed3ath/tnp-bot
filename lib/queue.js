const fs = require('fs')
const path = require('path')

class Queue {
  constructor () {
    this.file = path.join(__dirname, 'list.db')
    this.list = []
  }

  add (song) {
    this.list = this.get()
    this.list.push(song)
    fs.writeFileSync(this.file, JSON.stringify(this.list))
  }

  get () {
    return JSON.parse(fs.readFileSync(this.file, 'utf8'))
  }

  del (index) {
    this.list = this.get()
    this.list.splice(index - 1, 1)
    fs.writeFileSync(this.file, JSON.stringify(this.list))
  }

  getFirst () {
    this.list = this.get()
    return this.list[0]
  }

  empty () {
    fs.writeFileSync(this.file, JSON.stringify([]))
  }
}

module.exports = Queue
