

// Theme management
(function() {
    const moonSvg = `<svg width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5"></circle><path d="M7.63262 3.06689C8.98567 3.35733 9.99999 4.56025 9.99999 6.00007C9.99999 7.65693 8.65685 9.00007 6.99999 9.00007C5.4512 9.00007 4.17653 7.82641 4.01685 6.31997" stroke="currentColor" stroke-width="1.5"></path><path d="M22 13.0505C21.3647 12.4022 20.4793 12 19.5 12C17.567 12 16 13.567 16 15.5C16 17.2632 17.3039 18.7219 19 18.9646" stroke="currentColor" stroke-width="1.5"></path><path d="M14.5 8.51L14.51 8.49889" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M10 17C11.1046 17 12 16.1046 12 15C12 13.8954 11.1046 13 10 13C8.89543 13 8 13.8954 8 15C8 16.1046 8.89543 17 10 17Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>`;
    const sunSvg = `<svg width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor"><path d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M22 12L23 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 2V1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 23V22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M20 20L19 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M20 4L19 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4 20L5 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4 4L5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M1 12L2 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>`;

    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const html = document.documentElement;

    // Get saved theme preference or null if using system preference
    function getSavedTheme() {
        const saved = localStorage.getItem('theme');
        return (saved === 'light' || saved === 'dark') ? saved : null;
    }

    // Get current effective theme
    function getCurrentTheme() {
        const saved = getSavedTheme();
        if (saved) {
            return saved;
        }
        // Use system preference
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    // Apply theme
    function setTheme(theme, save = true) {
        html.setAttribute('data-theme', theme);
        if (save) {
            localStorage.setItem('theme', theme);
        }
        updateThemeIcon(theme);
    }

    // Update theme icon based on current theme
    function updateThemeIcon(theme) {
        if (themeIcon) {
            themeIcon.innerHTML = theme === 'dark' ? sunSvg : moonSvg;
        }
    }

    // Initialize theme on page load
    function initTheme() {
        const savedTheme = getSavedTheme();
        if (savedTheme) {
            // User has manually set a preference
            setTheme(savedTheme, false);
        } else {
            // Use system preference
            const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            setTheme(systemTheme, false);
        }

        // Listen for system theme changes (only if user hasn't set a preference)
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!getSavedTheme()) {
                setTheme(e.matches ? 'dark' : 'light', false);
            }
        });
    }

    // Toggle theme
    function toggleTheme() {
        const currentTheme = getCurrentTheme();
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme, true); // Save user preference
    }

    // Set up event listener
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTheme);
    } else {
        initTheme();
    }
})();


function showHide(id)
{
    document.getElementById(id).style.display = (document.getElementById(id).style.display == 'grid' ? 'none' : 'grid');
}

function markInvalid(id, condition)
{
    if(!condition)
        document.getElementById(id).style.backgroundColor = "#D77777";
    else
        document.getElementById(id).style.backgroundColor = "";
}

function generatePassword()
{
    var name = document.getElementById('name').value;
    var tid = parseInt(document.getElementById('tid').value);
    var money = parseInt(document.getElementById('money').value);
    var korean = (document.getElementById('kor').checked ? true : false);

    var validName = isValidName(name, korean);
    var validTid = isValidTid(tid);
    var validAmountOfMoney = isValidAmountOfMoney(money);

    markInvalid("name", validName);
    markInvalid("tid", validTid);
    markInvalid("money", validAmountOfMoney);

    if(validName && validTid && validAmountOfMoney)
        document.getElementById('password').innerHTML = getPassword(name, tid, money, korean);
    else
        document.getElementById('password').innerHTML = "Invalid";
}
