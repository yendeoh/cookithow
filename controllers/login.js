// Form switching functionality
document.getElementById("show-signup-form").addEventListener("click", function(){
    document.getElementsByClassName("form")[0].classList.add("active");
    // All characters react to signup
    const characters = [
        document.getElementById("character"),
        document.getElementById("character2"),
        document.getElementById("character3"),
        document.getElementById("character4")
    ];
    
    characters.forEach((character, index) => {
        setTimeout(() => {
            character.className = character.className.replace(/\s(happy|peek|surprised)/g, '') + " happy";
            setTimeout(() => {
                character.className = character.className.replace(/\s(happy|peek|surprised)/g, '');
            }, 2000);
        }, index * 200);
    });
});

document.getElementById("show-signin-form").addEventListener("click", function(){
    document.getElementsByClassName("form")[0].classList.remove("active");
    // Characters react to signin
    const characters = [
        document.getElementById("character"),
        document.getElementById("character2"),
        document.getElementById("character3"),
        document.getElementById("character4")
    ];
    
    characters.forEach((character, index) => {
        setTimeout(() => {
            character.className = character.className.replace(/\s(happy|peek|surprised)/g, '') + " peek";
            setTimeout(() => {
                character.className = character.className.replace(/\s(happy|peek|surprised)/g, '');
            }, 2000);
        }, index * 150);
    });
});

document.getElementById("login-btn").addEventListener("click", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email-input").value;
    const password = document.getElementById("password-input").value;

    if (!email.includes("@")) {
        alert("Please enter a valid email address.");
        return;
    }

    try {
        const response = await fetch("http://localhost:5000/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (data.success) {
            alert("Login successful!");
            window.location.href = "user.html";
        } else {
            alert("Invalid email or password.");
        }

    } catch (error) {
        console.error("Login error:", error);
        alert("Server error, please try again later.");
    }
});

document.getElementById("signup-btn").addEventListener("click", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const fullName = document.getElementById("fullName").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("signup-password-input").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
        alert("Passwords don't match!");
        return;
    }

    try {
        const response = await fetch("http://localhost:5000/api/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, fullName, email, password })
        });

        const data = await response.json();

        if (data.success) {
            alert("Registration successful! Redirecting...");
            window.location.href = "user.html";
        } else {
            alert("Signup failed: " + data.message);
        }

    } catch (error) {
        console.error("Signup error:", error);
        alert("Server error, please try again later.");
    }
});

// Password visibility toggle functionality
function setupPasswordToggle(inputId, toggleId) {
    const passwordInput = document.getElementById(inputId);
    const passwordToggle = document.getElementById(toggleId);
    
    if (passwordInput && passwordToggle) {
        passwordToggle.addEventListener("click", function() {
            if (passwordInput.type === "password") {
                passwordInput.type = "text";
                passwordToggle.classList.remove("fa-eye");
                passwordToggle.classList.add("fa-eye-slash");
            } else {
                passwordInput.type = "password";
                passwordToggle.classList.remove("fa-eye-slash");
                passwordToggle.classList.add("fa-eye");
            }
        });
    }
}

// Setup password toggles for both forms
setupPasswordToggle("password-input", "password-toggle");
setupPasswordToggle("signup-password-input", "signup-password-toggle");

// Character interactions
const characters = [
    document.getElementById("character"),
    document.getElementById("character2"),
    document.getElementById("character3"),
    document.getElementById("character4")
];

const emailInput = document.getElementById("email-input");
const passwordInput = document.getElementById("password-input");
const loginBtn = document.getElementById("login-btn");
const signupBtn = document.getElementById("signup-btn");

// Character watches when typing in email
if (emailInput) {
    emailInput.addEventListener("focus", () => {
        characters.forEach((character, index) => {
            setTimeout(() => {
                if (character) {
                    character.className = character.className.replace(/\s(happy|peek|surprised)/g, '') + " peek";
                }
            }, index * 100);
        });
    });
    
    emailInput.addEventListener("blur", () => {
        setTimeout(() => {
            characters.forEach(character => {
                if (character) {
                    character.className = character.className.replace(/\s(happy|peek|surprised)/g, '');
                }
            });
        }, 500);
    });
    
    emailInput.addEventListener("input", () => {
        if (emailInput.value.length > 0) {
            const randomCharacter = characters[Math.floor(Math.random() * characters.length)];
            if (randomCharacter) {
                randomCharacter.className = randomCharacter.className.replace(/\s(happy|peek|surprised)/g, '') + " peek";
            }
        }
    });
}

// Characters react when typing password
if (passwordInput) {
    passwordInput.addEventListener("focus", () => {
        characters.forEach((character, index) => {
            setTimeout(() => {
                if (character) {
                    character.className = character.className.replace(/\s(happy|peek|surprised)/g, '') + " surprised";
                }
            }, index * 100);
        });
    });
    
    passwordInput.addEventListener("blur", () => {
        setTimeout(() => {
            characters.forEach(character => {
                if (character) {
                    character.className = character.className.replace(/\s(happy|peek|surprised)/g, '');
                }
            });
        }, 500);
    });
    
    passwordInput.addEventListener("input", () => {
        if (passwordInput.value.length > 0) {
            characters.forEach((character, index) => {
                setTimeout(() => {
                    if (character) {
                        character.className = character.className.replace(/\s(happy|peek|surprised)/g, '') + " surprised";
                    }
                }, index * 50);
            });
        }
    });
}

// Characters celebrate on button clicks - LOGIN BUTTON WITH REDIRECT
document.addEventListener("DOMContentLoaded", () => {
    const loginBtn = document.getElementById("login-btn");
    const signupBtn = document.getElementById("signup-btn");

    if (loginBtn) {
        loginBtn.addEventListener("click", async (e) => {
            e.preventDefault();

            const emailElement = document.getElementById("email-input");
            const passwordElement = document.getElementById("password-input");

            if (!emailElement || !passwordElement) {
                console.error("Login elements missing!");
                return;
            }

            const email = emailElement.value;
            const password = passwordElement.value;

            if (!email.includes("@")) {
                alert("Please enter a valid email address.");
                return;
            }

            try {
                const response = await fetch("http://localhost:5000/api/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, password })
                });

                const data = await response.json();

                if (data.success) {
                    alert("Login successful!");
                    window.location.href = "user.html";
                } else {
                    alert("Invalid email or password.");
                }

            } catch (error) {
                console.error("Login error:", error);
                alert("Server error, please try again later.");
            }
        });
    }

    if (signupBtn) {
        signupBtn.addEventListener("click", async (e) => {
            e.preventDefault();

            const username = document.getElementById("username");
            const fullName = document.getElementById("fullName");
            const email = document.getElementById("email");
            const password = document.getElementById("signup-password-input");
            const confirmPassword = document.getElementById("confirmPassword");

            if (!username || !fullName || !email || !password || !confirmPassword) {
                console.error("Signup elements missing!");
                return;
            }

            if (password.value !== confirmPassword.value) {
                alert("Passwords don't match!");
                return;
            }

            console.log("Sending signup request:", { username: username.value, fullName: fullName.value, email: email.value, password: password.value });

            try {
                const response = await fetch("http://localhost:5000/api/signup", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ username: username.value, fullName: fullName.value, email: email.value, password: password.value })
                });

                const data = await response.json();
                console.log("Response from server:", data);

                if (data.success) {
                    alert("Registration successful! Redirecting...");
                    window.location.href = "user.html";
                } else {
                    alert("Signup failed: " + data.message);
                }

            } catch (error) {
                console.error("Signup error:", error);
                alert("Server error, please try again later.");
            }
        });
    }
});

window.addEventListener('DOMContentLoaded', () => {
    // Place characters just above the visible bottom of the viewport
    // and make them walk back and forth horizontally, end to end

    // Create a container for the characters at the bottom
    let bottomContainer = document.getElementById('bottom-characters-container');
    if (!bottomContainer) {
        bottomContainer = document.createElement('div');
        bottomContainer.id = 'bottom-characters-container';
        bottomContainer.style.position = 'fixed';
        bottomContainer.style.left = '0';
        bottomContainer.style.width = '100vw';
        bottomContainer.style.height = '140px';
        bottomContainer.style.pointerEvents = 'none';
        bottomContainer.style.zIndex = '1000';
        bottomContainer.style.bottom = '30px';
        document.body.appendChild(bottomContainer);
    }

    // Set up character heights and initial positions
    const characterHeights = ['80px', '100px', '120px', '90px'];
    characters.forEach((character, idx) => {
        if (character) {
            character.style.position = 'absolute';
            character.style.top = '0';
            character.style.left = (idx * 120) + 'px';
            character.style.height = characterHeights[idx];
            character.style.width = 'auto';
            character.style.transform = 'translateY(0)';
            character.style.transition = 'none';
            if (character.parentElement !== bottomContainer) {
                bottomContainer.appendChild(character);
            }
        }
    });

    // Animation state
    const animStates = characters.map(() => ({
        running: true,
        speed: 120,
        direction: 1,
        x: 0,
        peek: false,
        jumping: false,
        excited: false,
        gigglePhase: 0
    }));

    // Animate characters walking back and forth, end to end of the screen
    function walkBackAndForth(character, idx) {
        if (!character || !bottomContainer) return;

        function getBounds() {
            const charWidth = character.offsetWidth || 60;
            const minX = 0;
            const maxX = window.innerWidth - charWidth;
            return { minX, maxX, charWidth };
        }

        let { minX, maxX } = getBounds();
        let state = animStates[idx];
        state.direction = idx % 2 === 0 ? 1 : -1;
        state.x = state.direction === 1 ? minX : maxX;

        let jumpStart = null;
        let jumpDuration = 600;
        let jumpHeight = 60 + idx * 10;

        function animate(now) {
            ({ minX, maxX } = getBounds());

            if (state.peek) {
                if (state.speed > 0) {
                    state.speed -= 6;
                    if (state.speed < 0) state.speed = 0;
                }
            } else {
                if (state.speed < 120 + idx * 20) {
                    state.speed += 6;
                    if (state.speed > 120 + idx * 20) state.speed = 120 + idx * 20;
                }
            }

            if (state.speed > 0) {
                state.x += state.direction * (state.speed / 60);
                if (state.x > maxX) {
                    state.x = maxX;
                    state.direction = -1;
                    character.style.transform = 'scaleX(-1)';
                } else if (state.x < minX) {
                    state.x = minX;
                    state.direction = 1;
                    character.style.transform = 'scaleX(1)';
                }
                character.style.left = state.x + 'px';
            }

            if (state.jumping) {
                if (!jumpStart) jumpStart = now;
                let t = (now - jumpStart) / jumpDuration;
                if (t > 1) {
                    t = 1;
                    state.jumping = false;
                    jumpStart = null;
                }
                let y = -jumpHeight * 4 * t * (1 - t);
                character.style.transform = (state.direction === 1 ? 'scaleX(1)' : 'scaleX(-1)') + ` translateY(${y}px)`;
            } else {
                character.style.transform = state.direction === 1 ? 'scaleX(1)' : 'scaleX(-1)';
                jumpStart = null;
            }

            if (state.excited) {
                character.classList.add('excited');
                state.gigglePhase += 0.25 + 0.05 * idx;
                const wiggle = Math.sin(state.gigglePhase) * 1.5;
                character.style.left = (state.x + wiggle) + 'px';
            } else {
                character.classList.remove('excited');
                state.gigglePhase = 0;
            }

            requestAnimationFrame(animate);
        }
        character.style.transform = state.direction === 1 ? 'scaleX(1)' : 'scaleX(-1)';
        requestAnimationFrame(animate);
    }

    // Start walking animation for each character
    characters.forEach((character, idx) => {
        walkBackAndForth(character, idx);
    });

    // Helper functions
    function setCharactersPeek(peek) {
        characters.forEach((character, idx) => {
            animStates[idx].peek = peek;
            if (peek) {
                character.className = character.className.replace(/\s(happy|peek|surprised)/g, '') + " peek";
            } else {
                character.className = character.className.replace(/\s(happy|peek|surprised)/g, '');
            }
        });
    }

    function setCharactersExcited(excited) {
        characters.forEach((character, idx) => {
            animStates[idx].excited = excited;
        });
    }

    // Find the login form
    const loginForm = document.querySelector('.form');

    // Listen for mouseenter/focus on the login form or its children
    if (loginForm) {
        loginForm.addEventListener('mouseenter', () => {
            setCharactersPeek(true);
            setCharactersExcited(true);
        });
        loginForm.addEventListener('mouseleave', () => {
            setCharactersPeek(false);
            setCharactersExcited(false);
        });
        loginForm.addEventListener('focusin', () => {
            setCharactersPeek(true);
            setCharactersExcited(true);
        });
        loginForm.addEventListener('focusout', () => {
            setCharactersPeek(false);
            setCharactersExcited(false);
        });
    }

    const formInputs = loginForm ? loginForm.querySelectorAll('input, button, label') : [];
    formInputs.forEach(input => {
        input.addEventListener('mouseenter', () => {
            setCharactersPeek(true);
            setCharactersExcited(true);
        });
        input.addEventListener('mouseleave', () => {
            setCharactersPeek(false);
            setCharactersExcited(false);
        });
        input.addEventListener('focus', () => {
            setCharactersPeek(true);
            setCharactersExcited(true);
        });
        input.addEventListener('blur', () => {
            setCharactersPeek(false);
            setCharactersExcited(false);
        });
    });

    // Celebrate (jump) when login button is clicked
    const loginBtn = document.getElementById("login-btn");
    if (loginBtn) {
        loginBtn.addEventListener("click", () => {
            characters.forEach((character, idx) => {
                animStates[idx].jumping = true;
                character.className = character.className.replace(/\s(happy|peek|surprised)/g, '') + " happy";
                setTimeout(() => {
                    character.className = character.className.replace(/\s(happy|peek|surprised)/g, '');
                }, 1200);
            });
        });
    }
});