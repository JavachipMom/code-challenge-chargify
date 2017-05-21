import React from 'react';
import ReactDOM from 'react-dom';

// Something is not going right and would need clarity. I looked up certain documentation on what I need to do but it is still a little unclear what happened.

// A couple of styles done to dress up the form a little bit with Chargify
// colors
const styles = {
  fontFamily: 'fantasy',
  color: 'darkGray',
  textAlign: 'center',
  backgroundColor: 'lightGreen',
  borderRadius: '12px',
  opacity: '.9',
  width: '125%',
};

class ReactForm extends React.Component {

  // My thought process is to first identify the state of each value for Email, Password, Confirm Password, and Company Type.
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      passwordConfirm: '',
      company: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    e.target.classList.add('active');

    this.setState({
      [e.target.name]: e.target.value,
    });

    this.showInputError(e.target.name);
  }

  handleSubmit(e) {
    e.preventDefault();
    // console.log the information input for fields
    console.log('component state', JSON.stringify(this.state));

    if (!this.showFormErrors()) {
      console.log('form is invalid: do not submit');
    } else {
      console.log('form is valid: submit');
      window.alert('Form was submitted successfully!');
    }
  }

  company(e) {
    this.setState({ company: e.target.value });
  }
  // Need function for the error messages
  showFormErrors() {
    const inputs = document.querySelectorAll('input');
    let isFormValid = true;

    inputs.forEach(input => {
      input.classList.add('active');

      const isInputValid = this.showInputError(input.name);

      if (!isInputValid) {
        isFormValid = false;
      }
    });

    return isFormValid;
  }

  showInputError(refName) {
    const validity = this.refs[refName].validity;
    const label = document.getElementById(`${refName}Label`).textContent;
    const error = document.getElementById(`${refName}Error`);
    const isPassword = refName.indexOf('password') !== -1;
    const isPasswordConfirm = refName === 'passwordConfirm';

    // Need if statement to compare the password fields to make sure they match

    if (isPasswordConfirm) {
      if (this.refs.password.value !== this.refs.passwordConfirm.value) {
        this.refs.passwordConfirm.setCustomValidity('Passwords do not match');
      } else {
        this.refs.passwordConfirm.setCustomValidity('');
      }
    }

    // Need if statements to make sure the fields are valid

    if (!validity.valid) {
      if (validity.valueMissing) {
        error.textContent = `${label} is a required field`;
      } else if (validity.typeMismatch) {
        error.textContent = `${label} should be a valid email address`;
      } else if (isPassword && validity.patternMismatch) {
        error.textContent = `${label} should be longer than 4 chars`;
      } else if (isPasswordConfirm && validity.customError) {
        error.textContent = 'Passwords do not match';
      }
      return false;
    }

    error.textContent = '';
    return true;
  }

  render() {
    return (
      <div style={styles}>
        <h1>Simple React Form</h1>
        <form noValidate>
          <div className="form-group">
            <label id="emailLabel">Email: </label>
            <input
              className="form-control"
              type="email"
              name="email"
              ref="email"
              value={this.state.email}
              onChange={this.handleChange}
              required
            />
            <div className="error" id="emailError" />
          </div>
          <div className="form-group">
            <label id="passwordLabel">Password: </label>
            <input
              className="form-control"
              type="password"
              name="password"
              ref="password"
              value={this.state.password}
              onChange={this.handleChange}
              pattern=".{5,}"
              required
            />
            <div className="error" id="passwordError" />
          </div>
          <div className="form-group">
            <label id="passwordConfirmLabel">Confirm Password: </label>
            <input
              className="form-control"
              type="password"
              name="passwordConfirm"
              ref="passwordConfirm"
              value={this.state.passwordConfirm}
              onChange={this.handleChange}
              required
            />
            <div className="error" id="passwordConfirmError" />
          </div>
          <label> Company: </label><br />
          <select
            name="company"
            ref="company"
            value={this.state.company}
            onChange={this.handleChange}
          >
            <option value="SAAS">SAAS</option>
            <option value="Box-a-Month">Box-a-Month</option>
            <option value="Physical Goods">Physical Goods</option>
          </select><br />
          <button className="btn btn-primary" onClick={this.handleSubmit}>
            submit
          </button>
        </form>
      </div>
    );
  }
}

ReactDOM.render(<ReactForm />, document.getElementById('root'));
