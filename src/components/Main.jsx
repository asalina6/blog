import React from 'react';
import PropTypes from 'prop-types'

function Main(props) { //eslint-disable-line
    return (
        <main>
            <div className="grid-container">
                <div className="sub-grid">
                    <BlogCard title={"Title goes here"} />
                </div>
                <Aside />
            </div>
        </main>
    );
}

function BlogCard({title, description}) { //eslint-disable-line
    return (
            <div className="blogpost">
                <div className="image-container">
                    <img src="https://picsum.photos/200/300" alt="blog-image-1" />
                </div>
                <h2>{title}</h2>
                <p> {description.substring(0,30)} <a href="#">...see more</a> </p>
            </div>
    );
}

BlogCard.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
}
BlogCard.defaultProps = {
    title: 'Default Title',
    description: 'Default Description',
}

export default Main;

function Aside(props) { //eslint-disable-line
    return (
        <aside>
            {//inspiration: https://deviq.com/repository-pattern/
            }
            <form>
                <label htmlFor="searchbar">
                    <h3>Live Search</h3>
                </label>
                <input type="search" id="searchbar" name="searchbar" placeholder="Enter Search Term Here" />
                <button>Search</button>
            </form>
            <h3>Tags</h3>
            <h3>Popular Posts</h3>
            <ul>(picture of a post) post_title</ul>
            <h3>Recent Posts</h3>
            <a href="#">January</a>
        </aside>
    );
}
