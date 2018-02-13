import React from 'react'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Search from './Search'
import Book from './Book'

class BooksApp extends React.Component {
  state = {
    currentlyReading: '',
    wantToRead: '',
    read: '',
    query: '',
    searchResult: ''
  }

  fetchMyBooks() {
    BooksAPI.getAll().then(result => this.setState({
      currentlyReading: result.filter((book) => {
        return book.shelf === 'currentlyReading'
      }),
      wantToRead: result.filter((book) => {
        return book.shelf === 'wantToRead'
      }),
      read: result.filter((book) => {
        return book.shelf === 'read'
      })
    }))
  }

  componentDidMount() {
    this.fetchMyBooks();
  }

  updateQuery(query){
    this.setState({ query: query })
    console.log(query)
    BooksAPI.search(query).then(result => this.setState({
      searchResult: result
    }))
  }

  getBookShelf(bookId){
    let shelf = "none"
    this.state.currentlyReading.map((book) => {
      book.bookId === bookId ? shelf = "currentlyReading" : "none"
    })
    this.state.wantToRead.map((book) => {
      book.bookId === bookId ? shelf = "wantToRead" : "none"
    })
    this.state.read.map((book) => {
      book.bookId === bookId ? shelf = "read" : "none"
    })
    return shelf
  }

  render() {
    return (
      <div className="app">
        <Route path="/search" render={() => (
          <Search query={this.state.query} searchResult={this.state.searchResult} updateQuery={(query) => this.updateQuery(query)} getBookShelf={(bookId) => this.getBookShelf(bookId)}/>
        )}
        />
        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {this.state.currentlyReading !== '' ? this.state.currentlyReading.map((book) => (
                        <Book key={book.id} book={book} updateBooks={() => this.fetchMyBooks()} getBookShelf={(bookId) => this.getBookShelf(bookId)}/>
                      )) : ""}
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {this.state.wantToRead !== '' ? this.state.wantToRead.map((book) => (
                        <Book key={book.id} book={book} updateBooks={() => this.fetchMyBooks()} getBookShelf={(bookId) => this.getBookShelf(bookId)}/>
                      )) : ""}
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {this.state.read !== '' ? this.state.read.map((book) => (
                        <Book key={book.id} book={book} updateBooks={() => this.fetchMyBooks()} getBookShelf={(bookId) => this.getBookShelf(bookId)}/>
                      )) : ""}
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <Link className="open-search" to="/search">Add a book</Link>
          </div>
        )} />
      </div>
    )
  }
}

export default BooksApp
