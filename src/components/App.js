import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import Dashboard from "./Dashboard";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";
import UpdateProfilePage from "./UpdateProfilePage";
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "./ForgotPassword";
import PrivatePage from "./PrivatePage";
import PublicPage from "./PublicPage";
import HomePage from "./HomePage";
import { AuthContextConsumer } from "../contexts/AuthContext";
import UserInfoPage from "./UserInfoPage";

function App(props) {
    return (
        <AuthProvider>
            <AuthContextConsumer>
                {(authContextChad) => {
                    //

                    return (
                        <div>
                            <Router>
                                <Navbar bg="light" className="mb-3">
                                    {/* 1st Nav item with className mr-auto pushes the 2nd Nav item to the right */}
                                    <Nav className="mr-auto">
                                        <Nav.Link as={Link} to="/home">
                                            Home
                                        </Nav.Link>
                                        <Nav.Link as={Link} to="/publicpage">
                                            PublicPage
                                        </Nav.Link>
                                        <Nav.Link as={Link} to="/privatepage01">
                                            PrivatePage01
                                        </Nav.Link>
                                        <Nav.Link as={Link} to="/privatepage02">
                                            PrivatePage02
                                        </Nav.Link>
                                        <Nav.Link as={Link} to="/userinfo">
                                            UserInfo
                                        </Nav.Link>
                                    </Nav>
                                    {/* 2nd Nav item, gets pushed to right because of mr-auto on first item */}
                                    <Nav>
                                        {/* To match links, seems you have to add a bit of padding */}
                                        <Nav style={{ padding: "8px" }}>Status: {!!authContextChad.currentUser ? "Logged In" : "Logged Out"}</Nav>
                                        <Nav className="ml-3">
                                            {!!authContextChad.currentUser ? (
                                                // <button onClick={() => authContextChad.logout()}>Log out</button>
                                                <Link to="/home" onClick={() => authContextChad.logout()} className="btn btn-primary">
                                                    Log Out
                                                </Link>
                                            ) : (
                                                // <button onClick={handleLoginClick}>Log in</button>
                                                <Link to="/login" className="btn btn-primary">
                                                    Log In
                                                </Link>
                                            )}
                                        </Nav>
                                    </Nav>
                                </Navbar>

                                <Switch>
                                    <Route default path="/home" render={() => <HomePage />} />
                                    <PrivateRoute exact path="/" component={Dashboard} />
                                    <PrivateRoute path="/update-profile" component={UpdateProfilePage} />
                                    <Route path="/publicpage" render={() => <PublicPage />} />
                                    <PrivateRoute path="/privatepage01" render={() => <PrivatePage custom_message="PrivatePage01" />} />
                                    <PrivateRoute path="/privatepage02" render={() => <PrivatePage custom_message="PrivatePage02" />} />
                                    <Route path="/signup" component={SignupPage} />
                                    <Route path="/login" component={LoginPage} />
                                    <Route path="/forgot-password" component={ForgotPassword} />
                                    <PrivateRoute path="/userinfo" render={() => <UserInfoPage />}></PrivateRoute>
                                    {/* Define the DEFAULT route when no path to a dashboard is given */}
                                    <Route path="/" render={() => <Redirect to="/home" />} />
                                </Switch>
                            </Router>
                        </div>
                    );
                }}
            </AuthContextConsumer>
        </AuthProvider>
    );
}

export default App;
