import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Form() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [budget, setBudget] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    // send email using emailjs

    emailjs
      .sendForm(
        'service_tzsahno',
        'template_tvhofhf',
        event.target,
        'YqWnw9wraZTYzhFul'
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );

    toast.success('Message sent successfully!', {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000, // 3 seconds
      hideProgressBar: true,
    });

    setFirstName('');
    setLastName('');
    setEmail('');
    setBudget('');
    setMessage('');
  };

  return (
    <>
      <ToastContainer />
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
          placeholder="Enter your first name"
          required
        />
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
          placeholder="Enter your last name"
          required
        />
        <label htmlFor="email">Email: </label><input
      type="email"
      id="email"
      name="email"
      value={email}
      
      onChange={(event) => setEmail(event.target.value)}
      placeholder="Enter your email"
      required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
    />
    <label htmlFor="budget">Budget:</label>
    <input
      type="text"
      id="budget"
      name="budget"
      value={budget}
      onChange={(event) => setBudget(event.target.value)}
      placeholder="Enter your budget"
      required
    />
    <label htmlFor="message">Message:</label>
    <textarea
      id="message"
      name="message"
      value={message}
      onChange={(event) => setMessage(event.target.value)}
      placeholder="Enter your message"
      required
    ></textarea>
    <button type="submit">Send</button>
  </form>
</>

);
}

export default Form;