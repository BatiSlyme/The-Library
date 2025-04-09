import { useState } from "react";
import { auth, db } from "../../firebase";
import { createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await updateProfile(user, { displayName: name });

            await setDoc(doc(db, "users", user.uid), {
                name,
                email,
            });

            await signInWithEmailAndPassword(auth, email, password);

            setSuccess("Registration successful! You are now logged in.");
            setName("");
            setEmail("");
            setPassword("");

            navigate("/");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <section className="u-align-center u-clearfix u-container-align-center u-grey-5 u-valign-middle-xl u-section-11" id="sec-1453">
            <div className="data-layout-selected u-clearfix u-expanded-width u-gutter-0 u-layout-wrap u-layout-wrap-1">
                <div className="u-layout">
                    <div className="u-layout-row">
                    <div className="u-align-left u-black u-container-align-left u-container-style u-layout-cell u-right-cell u-size-30 u-layout-cell-1">
                    <div className="u-container-layout u-valign-middle-lg u-valign-middle-md u-valign-middle-sm u-valign-middle-xs u-container-layout-1">
                        <p className="u-text u-text-1">
                        “The secret of getting ahead is getting started.”
                        </p>
                        <div className="u-image u-image-circle u-preserve-proportions u-image-1" alt="" data-image-width="1000" data-image-height="1500"></div>
                        <h4 className="u-text u-text-2">Mark Twain</h4>
                        <h5 className="u-text u-text-3">Author & Humorist</h5>
                        <p className="u-text u-text-4">One of the most beloved American authors, known for "Adventures of Huckleberry Finn".</p>
                    </div>
                    </div>

                        <div className="u-align-left u-black u-container-align-left u-container-style u-layout-cell u-left-cell u-size-30 u-layout-cell-2">
                            <div className="u-container-layout u-valign-middle u-container-layout-2">
                                <h2 className="u-custom-font u-font-pt-sans u-text u-text-5">Register</h2>
                                <p className="u-large-text u-text u-text-grey-50 u-text-variant u-text-6">
                                    Create an account to explore books and connect with readers.
                                </p>

                                <div className="u-expanded-width u-form u-form-1">
                                    <form onSubmit={handleRegister} className="u-clearfix u-form-spacing-18 u-form-vertical u-inner-form" style={{ padding: 0 }}>
                                        <div className="u-form-group u-form-name">
                                            <label htmlFor="name" className="u-label u-label-1">Name</label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                className="u-border-2 u-border-no-left u-border-no-right u-border-no-top u-border-white u-input u-input-rectangle u-input-1"
                                                required
                                            />
                                        </div>

                                        <div className="u-form-email u-form-group">
                                            <label htmlFor="email" className="u-label u-label-3">Email</label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="u-border-2 u-border-no-left u-border-no-right u-border-no-top u-border-white u-input u-input-rectangle u-input-3"
                                                required
                                            />
                                        </div>

                                        <div className="u-form-group u-form-phone u-form-group-4">
                                            <label htmlFor="password" className="u-label u-label-4">Password</label>
                                            <input
                                                type="password"
                                                id="password"
                                                name="password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                className="u-border-2 u-border-no-left u-border-no-right u-border-no-top u-border-white u-input u-input-rectangle u-input-4"
                                                required
                                            />
                                        </div>

                                        {error && <p className="u-text u-text-danger" style={{ color: "red" }}>{error}</p>}
                                        {success && <p className="u-text u-text-success" style={{ color: "green" }}>{success}</p>}

                                        <div className="u-align-left u-form-group u-form-submit">
                                            <button type="submit" className="u-border-none u-btn u-btn-round u-btn-submit u-button-style u-palette-1-base u-radius-7 u-btn-1">
                                                REGISTER
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Register;