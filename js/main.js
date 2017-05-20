import React from 'react';
import ReactDOM from 'react-dom';


const styles = {
  fontFamily: 'fantasy',
  color: 'darkGray',
  textAlign: 'center',
  backgroundColor: 'lightGreen',
  borderRadius: '12px',
  opacity: '.9'
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
       [e.target.name]: e.target.value
     });

     this.showInputError(e.target.name);
   }

   handleSubmit(e) {
     e.preventDefault();
// console.log the information input for fields
     console.log('component state', JSON.stringify(this.state));

     if (!this.showFormErrors()) {
       window.alert('Your form was invalid and was not processed!! Please try again!');
     } else {
      // Show alert window for the client to see the form was valid and submitted
       window.alert('Your form is submitted!!');
     }
   }

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
// Need function for the error messages
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
        this.refs.passwordConfirm.setCustomValidity('Passwords match');
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
        <h2>Simple React Form</h2><br />
        <form onSubmit={ this.handleSubmit }>
          <label id="emailLabel">Email: </label>
            <input
            name="email"
            type="email"
            ref="email"
            value={ this.state.email }
            onChange={ this.handleChange }
            placeholder="Email Address"
            required
            />
          <div className="error" id="emailError" />
          <br />
          <label id="passwordLabel">Password: </label>
            <input
            name="password"
            type="password"
            ref="password"
            pattern=".{5,}"
            value={ this.state.password }
            onChange={ this.handleChange }
            placeholder="Password"
            required
            />
          <div className="error" id="passwordError" />
          <br />
          <label id="confirmPasswordLabel">Confirm Password: </label>
            <input
            name="passwordConfirm"
            type="password"
            ref="passwordConfirm"
            value={ this.state.passwordConfirm }
            onChange={this.handleChange}
            placeholder="Confirm password"
            required
            />
          <div className="error"
               id="passwordConfirmError" />
          <br />
          <label>Company: </label>
          <select name="company"
                  ref="company"
                  value={ this.state.company }
                  onChange={ this.handleChange }>
            <option value="SAAS">SAAS</option>
            <option value="Box-a-Month">Box-a-Month</option>
            <option value="Physical Goods">Physical Goods</option>
          </select>
          <input type="submit"
                 value="Submit"/>
        </form>
      </div>
    );
  }
}

ReactDOM.render(<ReactForm />, document.getElementById('root'));
