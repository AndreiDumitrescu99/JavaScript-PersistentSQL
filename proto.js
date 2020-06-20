'use strict';

const mysql = require('mysql2');

function Person(name = 'Person', id = '29', job = "undefined", sem = 0) {
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

Person.select = async function(id) {
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

Person.get = async function(id) {
    let data = await Person.select(id);
    return new Person(data[0].name, data[0].id, data[0].job, 1)
}

Person.prototype.get_name = function() {
    return this._name;
}

Person.prototype.get_job = function() {
    return this._job;
}

function Employee(name = 'Employee', id = '30', job = 'employee', sem = 0) {
    Person.call(this, name, id, job, sem);
    if(sem == 1) {
        this._name = name;
        this._id = id;
        this._job = job;
    }
}

Employee.prototype = Object.create(Person.prototype);
Employee.prototype.constructor = Employee;

Employee.get = async function(id) {


    let data = await Person.select(id);

    if(data[0].job != 'student' && data[0].job != 'undefined') {
        return new Employee(data[0].name, data[0].id, data[0].job, 1)
    }
    else {
        console.log("There is no employee with this id.");
        return undefined;
    }
}

function Teacher(name = 'Teacher', id = '31', job = 'teacher', sem = 0) {
    Employee.call(this, name, id, 'teacher', sem);
    if(sem == 1) {
        this._name = name;
        this._id = id;
        this._job = job;
    }
}

Teacher.prototype = Object.create(Employee.prototype);
Teacher.prototype.constructor = Teacher;

Teacher.get = async function(id) {
    let data = await Person.select(id);
    if(data[0].job == 'teacher' || data[0].job == 'DepartamentHead') {
        return new Teacher(data[0].name, data[0].id, data[0].job, 1);
    } else {
        console.log("There is no teacher with this id.");
        return undefined;
    }
}

Teacher.promote = async function(id) {
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

function DepartamentHead(name = 'DepartamentHead', id = '32', job = 'DepartamentHead', sem = 0) {
    Teacher.call(this, name, id, 'DepartamentHead', sem);
    if(sem == 1) {
        this._name = name;
        this._id = id;
        this._job = job;
    }
}

DepartamentHead.prototype = Object.create(Teacher.prototype);
DepartamentHead.prototype.constructor = DepartamentHead;

DepartamentHead.get = async function(id) {
    let data = await Person.select(id);
    if(data[0].job == 'DepartamentHead') {
        return new DepartamentHead(data[0].name, data[0].id, data[0].job, 1);
    } else {
        console.log("There is no DepartamentHead with this id.");
        return undefined;
    }
}

DepartamentHead.demote = async function(id) {
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

function Administrator(name = 'Administrator', id = '33', job = 'administrator', sem = 0) {
    Employee.call(this, name, id, 'administrator', sem);
    if(sem == 1) {
        this._name = name;
        this._id = id;
        this._job = job;
    }
}

Administrator.prototype = Object.create(Employee.prototype);
Administrator.prototype.constructor = Administrator;

Administrator.get = async function(id) {
    let data = await Person.select(id);
    if(data[0].job == 'administrator') {
        return new Administrator(data[0].name, data[0].id, data[0].job, 1);
    } else {
        console.log("There is no administrator with this id.");
        return undefined;
    }
}

function ProDean(name = 'ProDean', id = '34', job = 'ProDean', sem = 0) {
    Employee.call(this, name, id, job, sem);
    if(sem == 1) {
        this._name = name;
        this._id = id;
        this._job = job;
    }
}

ProDean.prototype = Object.create(Employee.prototype);
ProDean.prototype.constructor = ProDean;

ProDean.get = async function(id) {
    let data = await Person.select(id);
    if(data[0].job == 'ProDean' || data[0].job == 'Dean') {
        return new ProDean(data[0].name, data[0].id, data[0].job, 1);
    } else {
        console.log("There is no ProDean with this id.");
        return undefined;
    }
}

ProDean.promote = async function(id) {
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

function Dean(name = 'Dean', id = '35', job = 'Dean', sem = 0) {
    ProDean.call(this, name, id, 'Dean', sem);
    if(sem == 1) {
        this._name = name;
        this._id = id;
        this._job = job;
    }
}

Dean.prototype = Object.create(ProDean.prototype);
Dean.prototype.constructor = Dean;

Dean.get = async function(id) {
    let data = await Person.select(id);
    if(data[0].job == 'Dean') {
        return new Dean(data[0].name, data[0].id, data[0].job, 1);
    } else {
        console.log("There is no Dean with this id.");
        return undefined;
    }
}

Dean.demote = async function(id) {
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

function Student(name = 'Student', id = '36', job = 'student', grade = 0, sem = 0) {
    Person.call(this, name, id, 'student', sem);
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

Student.prototype = Object.create(Person.prototype);
Student.prototype.constructor = Student;

Student.select = async function(id) {
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

Student.get = async function(id) {
    let data = await Person.select(id);
    if(data[0].job == 'student') {
        let data2 = await Student.select(id);
        return new Student(data2[0].name, data2[0].id, 'student', data2[0].grade, 1)
    } else {
        console.log("There is no student with this id.");
        return undefined;
    }
}

Student.changeGrade = async function(id, newGrade) {
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

Student.prototype.get_grade = function(){
    return this._grade;
}

async function main() {
    const answer = await Employee.get(1);
    if(answer)
        console.log(answer.get_name() + " " + answer.get_job());
    const answer2 = await Student.get(2);
    if(answer2)
        console.log(answer2.get_name() + " " + answer2.get_job() + " " + answer2.get_grade());
    const answer3 = await Administrator.get(3);
    if(answer3)
        console.log(answer3.get_name() + " " + answer3.get_job());
    const answer4 = await ProDean.get(4);
    if(answer4)
        console.log(answer4.get_name() + " " + answer4.get_job());
    const answer5 = await Dean.get(5);
    if(answer5)
        console.log(answer5.get_name() + " " + answer5.get_job());
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
