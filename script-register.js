/* style-register.css */

:root {
  --bg-light: #f0f0f0;
  --bg-dark: #121212;
  --text-light: #000;
  --text-dark: #fff;
  --input-bg: #ccc;
  --input-bg-focus: #fff;
  --accent: #818cf8;
}

body {
  margin: 0;
  padding: 0;
  font-family: 'Segoe UI', sans-serif;
  background-color: var(--bg-light);
  color: var(--text-light);
  transition: background-color 0.3s, color 0.3s;
}

body.dark {
  background-color: var(--bg-dark);
  color: var(--text-dark);
}

.container {
  max-width: 500px;
  margin: 50px auto;
  background: rgba(255, 255, 255, 0.1);
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(8px);
}

h2 {
  text-align: center;
  margin-bottom: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.styled-input {
  border: none;
  outline: none;
  border-radius: 15px;
  padding: 1em;
  width: 100%;
  background-color: var(--input-bg);
  box-shadow: inset 2px 5px 10px rgba(0,0,0,0.3);
  transition: 300ms ease-in-out;
  font-size: 1rem;
  color: #0d0c22;
}

.styled-input:focus {
  background-color: var(--input-bg-focus);
  transform: scale(1.02);
  box-shadow: 13px 13px 100px #969696, -13px -13px 100px #ffffff;
}

.url-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.checkbox {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
}

button[type="submit"] {
  width: 100%;
  padding: 1rem;
  font-size: 1rem;
  background-color: var(--accent);
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s ease;
}

button[type="submit"]:hover {
  background-color: #4f46e5;
}

#errorMessages {
  color: red;
  font-size: 0.9rem;
  margin-top: 1rem;
}

#passwordStrength {
  font-size: 0.85rem;
  margin-top: 0.3rem;
}

.toggle-theme {
  position: fixed;
  top: 10px;
  right: 10px;
}

#themeToggle {
  padding: 0.5rem 1rem;
  border-radius: 8px;
  background-color: #eee;
  border: none;
  cursor: pointer;
  font-size: 0.9rem;
}

#themeToggle:hover {
  background-color: #ddd;
}
