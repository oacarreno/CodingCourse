class Book {
  constructor(title, author, year) {
    this.title = title;
    this.author = author;
    this.year = year;
  }

  get summary() {
    return `${this.title} by ${this.author}, published in ${this.year}`;
  }

  set updateYear(newYear) {
    this.year = newYear;
  }
}

class Library {
  constructor() {
    this.books = [];
  }

  get bookCount() {
    return this.books.length;
  }

  addBook(book) {
    this.books.push(book);
  }

  removeBook(title) {
    this.books = this.books.filter((book) => book.title !== title);
  }

  findBook(title) {
    return this.books.find((book) => book.title === title);
  }

  listBooks() {
    return this.books.map((book) => book.summary).join("\n");
  }
}

const book1 = new Book("To Kill a Mockingbird", "Harper Lee", 1960);
const book2 = new Book("1984", "George Orwell", 1949);
const book3 = new Book("Moby Dick", "Herman Melville", 1851);
