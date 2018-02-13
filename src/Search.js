import React from 'react'
import { Link } from 'react-router-dom'
import './App.css'
import Book from './Book'

class Search extends React.Component {

    handleChange(event) {
        this.props.updateQuery(event.target.value);
    }

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text"
                            placeholder="Search by title or author"
                            value={this.props.query}
                            onChange={this.handleChange.bind(this)}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {this.props.searchResult ? this.props.searchResult.map((result) => (
                            <Book key={result.id} book={result} getBookShelf={(bookId) => this.props.getBookShelf(bookId)} />
                        )) : ""}
                    </ol>
                </div>
            </div>
        )
    }
}

export default Search
