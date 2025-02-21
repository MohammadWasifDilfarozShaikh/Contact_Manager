import React from "react";

class AddContact extends React.Component {
  state = {
    name: "",
    email: ""
  };

  add = (e) => {
    e.preventDefault();
    if (this.state.name === "" || this.state.email === "") {
      alert("All fields are mandatory");
      return;
    }
    this.props.addContactHandler(this.state);
    this.setState({ name: "", email: "" });

    // Navigate to home page
    this.props.navigate("/");
  };

  render() {
    return (
      <div className="container d-flex flex-column justify-content-center align-items-center vh-100 tt">
        <div className="card shadow-lg p-4 w-50">
          <h2 className="text-center text-primary mb-4">Add Contact</h2>
          <form onSubmit={this.add}>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your name"
                value={this.state.name}
                onChange={(e) => this.setState({ name: e.target.value })}
              />
            </div>
    
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
                value={this.state.email}
                onChange={(e) => this.setState({ email: e.target.value })}
              />
            </div>
    
            <button className="btn btn-primary w-100">Add Contact</button>
          </form>
        </div>
      </div>
    );
    
  }
}

export default AddContact;
