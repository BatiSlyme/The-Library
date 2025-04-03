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
        <section className="u-align-center u-black u-clearfix u-container-align-center u-section-7" id="sec-559a">
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
                                                <label htmlFor="email-cd2c" className="u-form-control-hidden u-label"></label>
                                                <input
                                                    type="email"
                                                    id="email-cd2c"
                                                    name="email"
                                                    className="u-border-2 u-border-white u-input u-input-rectangle u-radius-50 u-input-2"
                                                    required
                                                    placeholder="Email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                />
                                            </div>

                                            <div className="u-form-group u-form-phone u-form-group-4">
                                                <label htmlFor="password" className="u-label u-label-4"></label>
                                                <input
                                                    type="password"
                                                    id="password"
                                                    name="password"
                                                    className="u-border-2 u-border-white u-input u-input-rectangle u-radius-50 u-input-4"
                                                    required
                                                    placeholder="Password"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                />
                                            </div>

                                            <div className="u-align-left u-form-group u-form-submit u-form-group-3">
                                                <button type="submit" className="u-active-white u-black u-border-none u-btn u-btn-round u-btn-submit u-button-style u-hover-white u-radius-50 u-text-active-black u-text-hover-black u-btn-1">
                                                    LOGIN
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {error && <p>{error}</p>}
        </section>
    );
}

export default Login;