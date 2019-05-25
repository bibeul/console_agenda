const inquirer = require('inquirer')

class Contact {
    constructor(lastname, firstname, num){
        this.lastname = lastname
        this.firstname = firstname
        this.num = num
    }

    display(i){
        console.log(`${i} /-/ ${this.lastname} /-/ ${this.firstname} /-/ ${this.num}\n`)
    }

    toString(i){
        return `${i} /-/ ${this.lastname} /-/ ${this.firstname} /-/ ${this.num}`
    }
}

class agenda {
    constructor(){
        this.contacts = []
    }

    display(){
        for(let i = 0; i < this.contacts.length; i++){
            this.contacts[i].display(i)
        }
    }

    add(contact){
        console.log(this.contacts)
        console.log(contact)
        this.contacts.push(new Contact(contact.lastname, contact.firstname, contact.number))
    }

    delete(toDelete){
        this.contacts.splice(toDelete, 1)
    }

    toString(){
        const res = []
        for(let i = 0; i < this.contacts.length; i++){
            res.push(this.contacts[i].toString(i))
        }
        return res
    }
}

const contactList = new agenda()

const menu = [{
    type: 'list',
    name: 'answer',
    message: 'Welcome to your own agenda',
    choices: ['Add contact', 'Show contacts', 'Delete contact', 'Quit']
}]

const add = [{
    type: 'input',
    name: 'lastname',
    message: 'Enter contact lastname.'
    }, {
    type: 'input',
    name: 'firstname',
    message: 'Enter contact firstname.'
    }, {
    type: 'input',
    name: 'number',
    message: 'Enter contact number.'
    }]

const back = [{
    type: 'list',
    name: 'answer',
    message: '',
    choices: ['Back']
}]

const del = [{
    type: 'list',
    name: 'answer',
    message: 'Select contact to delete',
    choices: ['oui', 'non']
}]



const displayMenu = function(){
    process.stdout.write('\x1B[2J\x1B[0f');
    inquirer
        .prompt(menu).then(answer => {
        switch (answer.answer) {
            case 'Add contact':
                inquirer.prompt(add).then(person => {
                    contactList.add(person)
                    displayMenu()})
                break;
            case 'Show contacts':
                contactList.display()
                inquirer.prompt(back).then(answer => displayMenu())
                break;
            case 'Delete contact':
                console.log(contactList.toString())
                deletetab = contactList.toString()
                inquirer.prompt(del).then(res => {
                    console.log(res)
                    displayMenu()
                })
                break;
            case 'Quit':
                process.exit();
        }
    });
}

displayMenu()
