import React, { Component } from "react";
import configs from '../config'

// Forget password component
export default class ForgetPassword extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            error: ''
        }
        this.send_link = this.send_link.bind(this);
    }

    // Handle input changes and store in state
    handleChange = ({ target: { name, value } }) => {
        this.setState({[name]: value });
      };

    // Handling send link button
    send_link = async(e) => {
        e.preventDefault();

        if (this.state.email.length > 0 ) {

            // Call the API to send password reset link
            const response = await fetch(configs.api_url + "/user/send_reset_link", {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: this.state.email
                })
            })

            const data = await response.json();

            // Redirect to the password reset form
            if (data.success === true) {
                alert("Password reset link is sent to email")
                window.location = "/"
            }
            else{
                this.setState({
                    email: "",
                    error : data.data
                });
            }
        } else {
            this.setState({error : "Email cannot be empty"});
        }
    }

    render() {
        return (
            <div className = "auth-wrapper background">
                <div className = "auth-inner" >
                    <form onSubmit = { this.send_link } >
                        {
                            <div>
                                <h3 > Forget Password </h3>
                                <div className = "form-group my-1" >
                                    <label className = "my-2" > User name </label>
                                    <input type = "email" name="email" className = "form-control" placeholder = "Enter email ID"
                                        value = { this.state.email } onChange = { evt => this.handleChange(evt) }
                                    />
                                </div>
                                <span className="alert-danger">{this.state.error}</span>
                                <button type="submit" className = "btn btn-primary btn-block w-100 my-3" > Get password reset link </button>
                            </div>
                        }
                        <p>Already have an account? <a href="/">login</a></p>
                    </form >
                </div>
            </div >
        );
    }
}
