import React from 'react';

function Main(props) {
    return (
        <main>
            <div class="grid-container">
                <div class="sub-grid">
                    <div class="blogpost">
                        <div class="image-container">
                            <img src="https://picsum.photos/200/300" alt="blog-image-1" />
                        </div>
                        <h2>Title goes here</h2>
                        <p>A paragraph of about 30 words should go here before <a href="#">...see more</a> </p>
                    </div>
                </div>
            </div>
            <Aside/>
        </main>
    );
}

export default Main;

function Aside(props) {
    return (
        <aside>
            {//inspiration: https://deviq.com/repository-pattern/
            }
            <label for="searchbar">
                <h3>Live Search</h3>
            </label>
            <input type="search" id="searchbar" name="searchbar" placeholder="Type your inquiry here!" />
            <h3>Tags</h3>
            <h3>Popular Posts</h3>
            <ul>(picture of a post) post_title</ul>
            <h3>Recent Posts</h3>
            <a href="#">January</a>
        </aside>
    );
}
