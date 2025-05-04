function getErrorMsg(key, fallback) {
    const lang = window.currentLang || 'en';
    return (window.errorTranslations && window.errorTranslations[lang] && window.errorTranslations[lang][key]) || fallback || key;
}

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const checkResidentBtn = document.getElementById('checkResidentBtn');
    const passwordSection = document.getElementById('passwordSection');
    const registerError = document.getElementById('registerError');
    const loginError = document.getElementById('loginError');

    // Resident check logic for register page
    let residentSuccessMsg = document.getElementById('residentSuccessMsg');
    if (!residentSuccessMsg && checkResidentBtn) {
        residentSuccessMsg = document.createElement('div');
        residentSuccessMsg.id = 'residentSuccessMsg';
        residentSuccessMsg.style.color = 'green';
        residentSuccessMsg.style.margin = '10px 0';
        checkResidentBtn.parentNode.insertBefore(residentSuccessMsg, passwordSection);
    }

    if (checkResidentBtn) {
        checkResidentBtn.addEventListener('click', async () => {
            const regCitizenId = document.getElementById('regCitizenId').value;
            registerError.textContent = '';
            passwordSection.style.display = 'none';
            residentSuccessMsg.textContent = '';
            if (!regCitizenId) {
                registerError.textContent = getErrorMsg('error_enter_citizen_id');
                return;
            }
            try {
                const response = await fetch('/api/check-resident', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ citizenId: regCitizenId })
                });
                const data = await response.json();
                if (response.ok && data.success) {
                    passwordSection.style.display = 'block';
                    checkResidentBtn.style.display = 'none';
                    document.getElementById('regCitizenId').readOnly = true;
                    residentSuccessMsg.textContent = getErrorMsg('error_resident');
                } else {
                    registerError.textContent = getErrorMsg(data.errorKey, data.error || getErrorMsg('error_check_failed'));
                }
            } catch (error) {
                registerError.textContent = getErrorMsg('error_resident_check');
            }
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            if (loginError) loginError.textContent = '';
            const citizenId = document.getElementById('citizenId').value;
            const password = document.getElementById('password').value;

            try {
                const response = await fetch('/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ citizenId, password })
                });

                if (response.redirected) {
                    window.location.href = response.url;
                } else {
                    const data = await response.json();
                    if (response.ok) {
                        window.location.href = '/dashboard';
                    } else {
                        if (loginError) loginError.textContent = getErrorMsg(data.errorKey, data.error || getErrorMsg('error_login_failed'));
                    }
                }
            } catch (error) {
                if (loginError) loginError.textContent = getErrorMsg('error_login');
            }
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            if (passwordSection && passwordSection.style.display === 'none') {
                e.preventDefault();
                registerError.textContent = getErrorMsg('error_enter_citizen_id');
                return;
            }
            e.preventDefault();
            const citizenId = document.getElementById('regCitizenId').value;
            const password = document.getElementById('regPassword').value;

            try {
                const response = await fetch('/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ citizenId, password })
                });

                const data = await response.json();
                if (response.ok) {
                    localStorage.setItem('lastRegisteredCitizenId', citizenId);
                    alert('Registration successful! Please login.');
                    window.location.href = '/login';
                } else {
                    registerError.textContent = getErrorMsg(data.errorKey, data.error || getErrorMsg('error_registration_failed'));
                }
            } catch (error) {
                registerError.textContent = getErrorMsg('error_registration');
            }
        });
    }

    // Logout functionality
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', async () => {
            try {
                const response = await fetch('/logout', {
                    method: 'POST'
                });
                if (response.ok) {
                    window.location.href = '/login';
                }
            } catch (error) {
                console.error('Logout error:', error);
            }
        });
    }
}); 