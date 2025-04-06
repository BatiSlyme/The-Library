import { useState } from "react";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState(""); 
    const [password, setPassword] = useState(""); 
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            navigate('/');
            console.log("User logged in:", user);
        } catch (error) {
            console.error("Login error:", error);
            setError("Invalid email or password.");
        }
    };

    return (
        <section className="u-align-center u-black u-clearfix u-container-align-center u-section-10" id="sec-559a">
            <div className="u-clearfix u-sheet u-valign-middle u-sheet-1">
                <div className="data-layout-selected u-clearfix u-layout-wrap u-layout-wrap-1">
                    <div className="u-gutter-0 u-layout">
                        <div className="u-layout-row">
                            <div className="u-container-style u-image u-layout-cell u-size-23 u-image-1" data-image-width="1000" data-image-height="1500">
                                <div className="u-container-layout u-container-layout-1"></div>
                            </div>
                            <div className="u-align-center u-container-align-center u-container-style u-grey-10 u-layout-cell u-radius-50 u-shape-round u-size-37 u-layout-cell-2">
                                <div className="u-container-layout u-valign-middle u-container-layout-2">
                                    <div className="u-form u-form-1">
                                        <form onSubmit={handleLogin} className="u-clearfix u-form-spacing-50 u-form-vertical u-inner-form" style={{ padding: 0 }}>
                                            <div className="u-form-group u-form-name u-form-group-1">
                                                <label htmlFor="name-30a4" className="u-form-control-hidden u-label"></label>
                                                <input
                                                    type="text"
                                                    placeholder="Email"
                                                    id="name-30a4"
                                                    name="name"
                                                    className="u-border-2 u-border-white u-input u-input-rectangle u-radius-50 u-input-1"
                                                    required
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                />
                                            </div>
                                            <div className="u-form-email u-form-group u-form-group-2">
                                                <label htmlFor="email-cd2c" className="u-form-control-hidden u-label"></label>
                                                <input
                                                    type="password"
                                                    id="email-cd2c"
                                                    name="email"
                                                    className="u-border-2 u-border-white u-input u-input-rectangle u-radius-50 u-input-2"
                                                    required
                                                    placeholder="Password"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                />
                                            </div>
                                            <div className="u-align-left u-form-group u-form-submit u-form-group-3">
                                                <button
                                                    type="submit"
                                                    className="u-active-white u-black u-border-none u-btn u-btn-round u-btn-submit u-button-style u-hover-white u-radius-50 u-text-active-black u-text-hover-black u-btn-1"
                                                >
                                                    LOGIN
                                                </button>
                                            </div>
                                            <input type="submit" value="submit" className="u-form-control-hidden" />
                                            <div className="u-form-send-message u-form-send-success">
                                                Thank you! Your message has been sent.
                                            </div>
                                            <div className="u-form-send-error u-form-send-message">
                                                Unable to send your message. Please fix errors then try again.
                                            </div>
                                            <input type="hidden" value="" name="recaptchaResponse" />
                                            <input type="hidden" name="formServices" value="2dbdd793-4186-c402-d481-27ed2a72ed2a" />
                                        </form>
                                        {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Login;