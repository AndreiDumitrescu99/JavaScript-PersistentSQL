'use strict';

const mysql = require('mysql2');


class Person {
    constructor(name = 'Person', id = '29', job = "undefined", sem = 0) {
        if(sem == 0) {
            try {
                var connection = mysql.createConnection({
                    host: '127.0.0.1',
                    user: 'root',
                    password: '1234',
                    database: 'test'
                });
                this._id = id;
                var sql = "INSERT INTO persons (name, id, job) values ('" + name + "', " + id + ", '" + job +"')";
                connection.query(sql);
            } finally {
                connection.end();
            }
        } else {
            this._name = name;
            this._id = id;
            this._job = job;
        }
    }

    static async select(id) {
        try {
            var connection = mysql.createConnection({
                host: '127.0.0.1',
                user: 'root',
                password: '1234',
                database: 'test'
            });
            return new Promise((resolve, reject) => {
                var sql = "SELECT * from persons where id = " + id
                connection.query(sql, (err, data) => {
                    if (err) {
                        reject(err)
                        return
                    }
                    resolve(data)
                })
            }).catch(err => {
                console.log('caught', err.message);
            });
        } finally {
            connection.end();
        }
    }

    static async get(id) {
        let data = await Person.select(id);
        return new Person(data[0].name, data[0].id, data[0].job, 1)
    }

    get name() {
        return this._name;
    }

    get job() {
        return this._job;
    }
}

class Employee extends Person {
    constructor(name = 'Employee', id = '30', job = 'employee', sem = 0) {
        super(name, id, job, sem);
        if(sem == 1) {
            this._name = name;
            this._id = id;
            this._job = job;
        }
    }

    static async get(id) {
        let data = await Person.select(id);
        if(data[0].job != 'student' && data[0].job != 'undefined') {
            return new Employee(data[0].name, data[0].id, data[0].job, 1)
        }
        else {
            console.log("There is no employee with this id.");
            return undefined;
        }
    }
}

class Teacher extends Employee {
    constructor(name = 'Teacher', id = '31', job = 'teacher', sem = 0) {
        super(name, id, 'teacher', sem);
        if(sem == 1) {
            this._name = name;
            this._id = id;
            this._job = job;
        }
    }

    static async get(id) {
        let data = await Person.select(id);
        if(data[0].job == 'teacher' || data[0].job == 'DepartamentHead') {
            return new Teacher(data[0].name, data[0].id, data[0].job, 1);
        } else {
            console.log("There is no teacher with this id.");
            return undefined;
        }
    }

    static async promote(id) {

        let data = await Teacher.get(id);

        if(data) {
            try {
                var connection = mysql.createConnection({
                    host: '127.0.0.1',
                    user: 'root',
                    password: '1234',
                    database: 'test'
                });
                var sql = "UPDATE persons SET job = 'DepartamentHead' WHERE id = " + data._id
                connection.query(sql, (err, res) => {
                    if(err) {
                        throw err;
                    }
                });
            } finally {
                connection.end();
            }
        }
    }

}

class DepartamentHead extends Teacher {
    constructor(name = 'DepartamentHead', id = '32', job = 'DepartamentHead', sem = 0) {
        super(name, id, 'DepartamentHead', sem);
        if(sem == 1) {
            this._name = name;
            this._id = id;
            this._job = job;
        }
    }

    static async get(id) {
        let data = await Person.select(id);
        if(data[0].job == 'DepartamentHead') {
            return new DepartamentHead(data[0].name, data[0].id, data[0].job, 1);
        } else {
            console.log("There is no DepartamentHead with this id.");
            return undefined;
        }
    }

    static async demote(id) {

        let data = await DepartamentHead.get(id);
        if(data) {
            try {
                var connection = mysql.createConnection({
                    host: '127.0.0.1',
                    user: 'root',
                    password: '1234',
                    database: 'test'
                });
                var sql = "UPDATE persons SET job = 'teacher' WHERE id = " + data._id
                connection.query(sql, (err, res) => {
                    if(err) {
                        throw err;
                    }
                });
            } finally {
                connection.end();
            }
        }
    }
}

class Administrator extends Employee {
    constructor(name = 'Administrator', id = '33', job = 'administrator', sem = 0) {
        super(name, id, 'administrator', sem);
        if(sem == 1) {
            this._name = name;
            this._id = id;
            this._job = job;
        }
    }

    static async get(id) {
        let data = await Person.select(id);
        if(data[0].job == 'administrator') {
            return new Administrator(data[0].name, data[0].id, data[0].job, 1);
        } else {
            console.log("There is no administrator with this id.");
            return undefined;
        }
    }
}

class ProDean extends Employee {
    constructor(name = 'ProDean', id = '34', job = 'ProDean', sem = 0) {
        super(name, id, job, sem);
        if(sem == 1) {
            this._name = name;
            this._id = id;
            this._job = job;
        }
    }

    static async get(id) {
        let data = await Person.select(id);
        if(data[0].job == 'ProDean' || data[0].job == 'Dean') {
            return new ProDean(data[0].name, data[0].id, data[0].job, 1);
        } else {
            console.log("There is no ProDean with this id.");
            return undefined;
        }
    }

    static async promote(id) {

        let data = await ProDean.get(id);

        if(data) {
            try {
                var connection = mysql.createConnection({
                    host: '127.0.0.1',
                    user: 'root',
                    password: '1234',
                    database: 'test'
                });
                var sql = "UPDATE persons SET job = 'Dean' WHERE id = " + data._id
                connection.query(sql, (err, res) => {
                    if(err) {
                        throw err;
                    }
                });
            } finally {
                connection.end();
            }
        }
    }

}

class Dean extends ProDean {
    constructor(name = 'Dean', id = '35', job = 'Dean', sem = 0) {
        super(name, id, 'Dean', sem);
        if(sem == 1) {
            this._name = name;
            this._id = id;
            this._job = job;
        }
    }

    static async get(id) {
        let data = await Person.select(id);
        if(data[0].job == 'Dean') {
            return new Dean(data[0].name, data[0].id, data[0].job, 1);
        } else {
            console.log("There is no Dean with this id.");
            return undefined;
        }
    }

    static async demote(id) {

        let data = await Dean.get(id);
        if(data) {
            try {
                var connection = mysql.createConnection({
                    host: '127.0.0.1',
                    user: 'root',
                    password: '1234',
                    database: 'test'
                });
                var sql = "UPDATE persons SET job = 'ProDean' WHERE id = " + data._id
                connection.query(sql, (err, res) => {
                    if(err) {
                        throw err;
                    }
                });
            } finally {
                connection.end();
            }
        }
    }
}

class Student extends Person {
    constructor(name = 'Student', id = '36', job = 'student', grade = 0, sem = 0) {
        super(name, id, 'student', sem);
        if(sem == 1) {
            this._name = name;
            this._id = id;
            this._job = job;
            this._grade = grade;
        } else {
            try {
                var connection = mysql.createConnection({
                    host: '127.0.0.1',
                    user: 'root',
                    password: '1234',
                    database: 'test'
                });
                this._id = id;
                var sql = "INSERT INTO students (name, id, grade) values ('" + name + "', " + id + ", " + grade +")";
                connection.query(sql);
            } finally {
                connection.end();
            }
        }
    }

    static async select(id) {
        try {
            var connection = mysql.createConnection({
                host: '127.0.0.1',
                user: 'root',
                password: '1234',
                database: 'test'
            });
            return new Promise((resolve, reject) => {
                var sql = "SELECT * from students where id = " + id
                connection.query(sql, (err, data) => {
                    if (err) {
                        reject(err)
                        return
                    }
                    resolve(data)
                })
            }).catch(err => {
                console.log('caught', err.message);
            });
        } finally {
            connection.end();
        }
    }

    static async get(id) {
        let data = await Person.select(id);
        if(data[0].job == 'student') {
            let data2 = await Student.select(id);
            return new Student(data2[0].name, data2[0].id, 'student', data2[0].grade, 1)
        } else {
            console.log("There is no student with this id.");
            return undefined;
        }
    }

    static async changeGrade(id, newGrade) {
        let data = await Person.select(id);
        if(data[0].job == 'student') {
            let data2 = await Student.select(id);
            try {
                var connection = mysql.createConnection({
                    host: '127.0.0.1',
                    user: 'root',
                    password: '1234',
                    database: 'test'
                });
                var sql = "UPDATE students SET grade = " + newGrade + " WHERE id = " + id
                connection.query(sql, (err, res) => {
                    if(err) {
                        throw err;
                    }
                });
            } finally {
                connection.end();
            }
        }
    }

    get grade() {
        return this._grade;
    }
}


async function main() {
    //await Teacher.promote(1);
    //await DepartamentHead.demote(1);
    const answer = await Employee.get(1);
    if(answer)
        console.log(answer.name + " " + answer.job);
    const answer2 = await Student.get(2);
    if(answer2)
        console.log(answer2.name + " " + answer2.job + " " + answer2.grade);
    const answer3 = await Administrator.get(3);
    if(answer3)
        console.log(answer3.name + " " + answer3.job);
    const answer4 = await ProDean.get(4);
    if(answer4)
        console.log(answer4.name + " " + answer4.job);
    const answer5 = await Dean.get(5);
    if(answer5)
        console.log(answer5.name + " " + answer5.job);
}

async function change() {
    Dean.demote(5);
    Dean.demote(3);
    ProDean.promote(4);
    Teacher.promote(1);
    Student.changeGrade(2, 10);
}

async function init() {
    let t1 = new Teacher("Dumi", 1);
    let t2 = new Student("Dica", 2, 'student', 9);
    let t3 = new Administrator("Who", 3);
    let t4 = new ProDean("Doctor", 4);
    let t5 = new Dean("Strange", 5);

}

//init();
//change();
main();
