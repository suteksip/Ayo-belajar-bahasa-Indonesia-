// DOM Elements
const loginScreen = document.getElementById('loginScreen');
const mainContent = document.getElementById('mainContent');
const userAvatar = document.getElementById('userAvatar');
const dictionaryInput = document.getElementById('dictionaryInput');
const dictionaryResult = document.getElementById('dictionaryResult');
const loginForm = document.getElementById('loginForm');

// User state
let userProfile = null;

// Show registration form
function showRegisterForm() {
    const currentForm = loginForm.innerHTML;
    loginForm.innerHTML = `
        <div>
            <label for="name" class="block text-sm font-medium text-gray-700">Nama Lengkap</label>
            <input type="text" id="name" name="name" required 
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black">
        </div>
        <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" id="email" name="email" required 
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black">
        </div>
        <div>
            <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
            <input type="password" id="password" name="password" required 
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black">
        </div>
        <div>
            <label for="confirmPassword" class="block text-sm font-medium text-gray-700">Konfirmasi Password</label>
            <input type="password" id="confirmPassword" name="confirmPassword" required 
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black">
        </div>
        <button type="submit" class="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black">
            Daftar
        </button>
    `;
    
    const registerText = document.querySelector('.mt-4.text-center p');
    registerText.innerHTML = `Sudah punya akun? <button onclick="showLoginForm()" class="font-medium text-black hover:text-gray-800">Masuk disini</button>`;
    
    loginForm.onsubmit = handleRegister;
}

// Show login form
function showLoginForm() {
    loginForm.innerHTML = `
        <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" id="email" name="email" required 
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black">
        </div>
        <div>
            <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
            <input type="password" id="password" name="password" required 
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black">
        </div>
        <button type="submit" class="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black">
            Masuk
        </button>
    `;
    
    const registerText = document.querySelector('.mt-4.text-center p');
    registerText.innerHTML = `Belum punya akun? <button onclick="showRegisterForm()" class="font-medium text-black hover:text-gray-800">Daftar disini</button>`;
    
    loginForm.onsubmit = handleLogin;
}

// Handle login
function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Get stored users
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        userProfile = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
        loginScreen.classList.add('hidden');
        mainContent.classList.remove('hidden');
        userAvatar.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(user.name);
    } else {
        alert('Email atau password salah');
    }
}

// Handle registration
function handleRegister(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (password !== confirmPassword) {
        alert('Password tidak cocok');
        return;
    }
    
    // Get stored users
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Check if email already exists
    if (users.some(u => u.email === email)) {
        alert('Email sudah terdaftar');
        return;
    }
    
    // Add new user
    const newUser = { name, email, password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    // Auto login after registration
    userProfile = newUser;
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    loginScreen.classList.add('hidden');
    mainContent.classList.remove('hidden');
    userAvatar.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(name);
}

// Handle sign out
function handleSignOut() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('learningProgress');
    userProfile = null;
    mainContent.classList.add('hidden');
    loginScreen.classList.remove('hidden');
    showLoginForm(); // Reset to login form
}

// Check for existing session
window.addEventListener('load', function() {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        userProfile = JSON.parse(savedUser);
        loginScreen.classList.add('hidden');
        mainContent.classList.remove('hidden');
        userAvatar.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(userProfile.name);
    }
    
    // Set up form submit handler
    loginForm.onsubmit = handleLogin;
});

// Dictionary search function
async function searchDictionary() {
    const word = dictionaryInput.value.trim();
    if (!word) return;

    try {
        // This is a mock API call - replace with actual KBBI API
        const response = await fetch(`https://api.example.com/kbbi/${word}`);
        const data = await response.json();
        
        dictionaryResult.innerHTML = `
            <div class="mt-4 p-4 bg-gray-50 rounded-lg">
                <h3 class="font-semibold">${word}</h3>
                <p class="text-gray-600 mt-2">${data.definition || 'Definisi tidak ditemukan'}</p>
            </div>
        `;
    } catch (error) {
        dictionaryResult.innerHTML = `
            <div class="mt-4 p-4 bg-red-50 text-red-600 rounded-lg">
                Maaf, terjadi kesalahan saat mencari kata
            </div>
        `;
    }
}

// Progress tracking
const progress = {
    completedLessons: 0,
    averageScore: 0,
    studyTime: 0
};

function updateProgress(lessonId, score, timeSpent) {
    progress.completedLessons++;
    progress.averageScore = ((progress.averageScore * (progress.completedLessons - 1)) + score) / progress.completedLessons;
    progress.studyTime += timeSpent;
    
    // Update progress display
    document.getElementById('completedLessons').textContent = `${progress.completedLessons}/10`;
    document.getElementById('averageScore').textContent = `${Math.round(progress.averageScore)}%`;
    document.getElementById('studyTime').textContent = `${Math.round(progress.studyTime)} jam`;
    
    // Store progress
    localStorage.setItem('learningProgress', JSON.stringify(progress));
}

// Load saved progress
const savedProgress = localStorage.getItem('learningProgress');
if (savedProgress) {
    Object.assign(progress, JSON.parse(savedProgress));
    updateProgress(null, 0, 0); // Update display without changing values
}
