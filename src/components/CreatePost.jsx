import React from "react";
import { Redirect } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import "../scss/CreatePost.scss";

function handleSubmit(event) {
  event.preventDefault();
  alert("Testing 1 2 3");
}

function CreatePost({ isLoggedIn }) {
  //eslint-disable-line
  //make sure they are loggedin before rendering the post

  // if (isLoggedIn) {
  return (
    <section className="createpost">
      <form onSubmit={handleSubmit}>
        <div className="centering-div">
          <h2>Create a Blog Post</h2>
          <div className="form-pair">
            <label htmlFor="title">Title<abbr title="required" aria-label="required">*</abbr>:</label>
            <input type="text" id="title" name="title" required />
          </div>
          <div className="form-pair">
            <label htmlFor="file">Poster Image<abbr title="required" aria-label="required">*</abbr>:</label>
            <input type="file" id="file" name="file" required />
          </div>
          <div className="form-pair">
            <label htmlFor="body">Body<abbr title="required" aria-label="required">*</abbr>:</label>
            <textarea id="body" name="body" required/>
          </div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </section>
  );
  /*} else {
    return <Redirect to={"/"} />;
  }*/
}

export default CreatePost;
