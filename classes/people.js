class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet() {
    return `Hello, my name is ${this.name} and I am ${this.age} years old.`;
  }

  get info() {
    return `${this.name} is ${this.age} years old.`;
  }

  set changeName(newName) {
    this.name = newName;
  }
}

class Employee extends Person {
  constructor(name, age, jobTitle, salary) {
    super(name, age); // Call the constructor of the Person class
    this.jobTitle = jobTitle;
    this.salary = salary;
  }

  // Additional method specific to Employee
  work() {
    return `${this.name} is working as a ${this.jobTitle}.`;
  }

  // Override the greet method
  greet() {
    return `Hello, my name is ${this.name}, I am ${this.age} years old, and I work as a ${this.jobTitle}.`;
  }
}
