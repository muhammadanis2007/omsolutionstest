import React from 'react';
import axios from 'axios';

class ContactForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      message: '',
      submitting: false,
      success: false,
      error: null
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { name, email, message } = this.state;
    this.setState({ submitting: true });
    axios.post('/api/send-email', { name, email, message })
      .then(() => {
        this.setState({ success: true, submitting: false });
      })
      .catch((error) => {
        this.setState({ error: error.message, submitting: false });
      });
  }

  render() {
    const { name, email, message, submitting, success, error } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="name">Name</label>
        <input id="name" type="text" name="name" value={name} onChange={this.handleChange} required />

        <label htmlFor="email">Email</label>
        <input id="email" type="email" name="email" value={email} onChange={this.handleChange} required />

        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" value={message} onChange={this.handleChange} required />

        {error && <div className="error">{error}</div>}
        {success && <div className="success">Email sent successfully</div>}
        <button type="submit" disabled={submitting}>Send</button>
      </form>
    );
  }
}

export default ContactForm;
