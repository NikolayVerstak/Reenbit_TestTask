/* ----------- 
GOOGLE AUTHENTICATION BUTTONS AND DROPDOWNS
----------- */

// Dependencies
import React from "react";
// Other components and files
import google from "../images/google-icon.svg";
import signout from "../images/sign-out-icon.png";

export default class GoogleAuth extends React.Component {
    constructor(props) {
        super(props);
        // data from Google Auth
        this.state = { isSignedIn: false, fullName: "", gmail: "" };
        // reference to buttons div
        this.googleAuthRef = React.createRef();
        // reference to dropdown with sign out button
        this.dropdownRef = React.createRef();
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentDidMount() {
        // add event listerner to close dropdown with sign out button, if a user clicks outside
        document.addEventListener("mousedown", this.handleClickOutside);

        // loading of internal Google Library
        window.gapi.load("client:auth2", () => {
            // and initialize that library with clientID
            window.gapi.auth2
                .init({
                    clientId: process.env.REACT_APP_CLIENT_ID,
                    // scope shows what parts of the user account we want to get access
                    scope: "email",
                    // plugin name is just additional parametr for Google API work
                    plugin_name: "rick-and-morty",
                })
                .then(() => {
                    // after successful initialization of the library,
                    // return GoogleAuth object
                    this.auth = window.gapi.auth2.getAuthInstance();
                    // update state
                    this.onAuthChange(this.auth.isSignedIn.get());
                    // call lister to rerender the component every time
                    // when user's authentication status is changing
                    this.auth.isSignedIn.listen(this.onAuthChange);
                });
        });
    }

    // remove listerner for clicks outside of dropdown with sign out button
    componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClickOutside);
    }

    // callback to close dropdown with sign out button, if a user clicks outside
    handleClickOutside(event) {
        // check if a user was signed in and dropdown was rendered
        if (
            this.state.isSignedIn &&
            this.dropdownRef &&
            this.dropdownRef.current.classList.contains("show")
        ) {
            !this.googleAuthRef.current.contains(event.target) && this.handleDropdown();
        }
    }

    // callback to update the state object when user's authentication status is changing
    onAuthChange = (isSignedIn) => {
        // user's data object
        this.userData = this.auth.currentUser.get().getBasicProfile();
        if (isSignedIn) {
            // if a user was signed in, update the state object
            this.setState({
                isSignedIn,
                fullName: this.userData.getName(),
                gmail: this.userData.getEmail(),
            });
        } else {
            // otherwise, make the state object default
            this.setState({ isSignedIn: false, fullName: "", gmail: "" });
        }
    };

    // callback to close dropdown with sign out button
    handleDropdown() {
        document.querySelector(".sign-out-dropdown").classList.toggle("show");
    }

    // method to show SignIn/SignOut Buttons
    renderAuthButton() {
        if (this.state.isSignedIn === null) {
            return null;
        } else if (this.state.isSignedIn) {
            // user's initials
            this.firstNameLetters = this.state.fullName.split(" ").map((word) => word.charAt(0));
            // section to see user's name and surname, email and sign out button
            return (
                <>
                    {/* button (with user's initials) that open/close dropdown  */}
                    <button className="user" onClick={this.handleDropdown}>
                        <span>{this.firstNameLetters.join("")}</span>
                    </button>
                    {/* sign out dropdown */}
                    <div className="dropdown-wrapper">
                        <div className="sign-out-dropdown" ref={this.dropdownRef}>
                            <p>{this.state.fullName}</p>
                            <p>{this.state.gmail}</p>
                            <button className="sign-out-btn" onClick={this.onSignOutClick}>
                                <img src={signout} alt="sign out icon" />
                                <span>Sign Out</span>
                            </button>
                        </div>
                    </div>
                </>
            );
        } else {
            // button to sign in with Google
            return (
                <button className="sign-in-btn" onClick={this.onSignInClick}>
                    <img src={google} alt="google-icon" />
                    <span>Sign In</span>
                </button>
            );
        }
    }

    // callbacks for sign in/sign out buttons that make connections with Google
    onSignInClick = () => {
        this.auth.signIn();
    };
    onSignOutClick = () => {
        this.auth.signOut();
    };

    render() {
        return (
            <div className="google-auth">
                <span className="google-button" ref={this.googleAuthRef}>
                    {this.renderAuthButton()}
                </span>
            </div>
        );
    }
}
