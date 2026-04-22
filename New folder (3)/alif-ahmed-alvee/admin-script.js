// Constants
const DEFAULT_ADMIN_PASSWORD = '12345678';
const PASSWORD_KEY = 'admin_password';
const STORAGE_KEY = 'gallery_items';
const PROFILE_KEY = 'gallery_profile';

// DOM Elements
const loginScreen = document.getElementById('loginScreen');
const adminPanel = document.getElementById('adminPanel');
const loginForm = document.getElementById('loginForm');
const passwordInput = document.getElementById('password');
const loginError = document.getElementById('loginError');
const logoutBtn = document.getElementById('logoutBtn');
const addItemForm = document.getElementById('addItemForm');
const itemTypeSelect = document.getElementById('itemType');
const videoThumbnailGroup = document.getElementById('videoThumbnailGroup');
const itemsList = document.getElementById('itemsList');
const addItemSuccess = document.getElementById('addItemSuccess');
const addItemError = document.getElementById('addItemError');
const itemsFilterBtns = document.querySelectorAll('.items-filter .filter-btn');
const profileForm = document.getElementById('profileForm');
const profileImageUrl = document.getElementById('profileImageUrl');
const profileNameInput = document.getElementById('profileNameInput');
const profileProfessionInput = document.getElementById('profileProfessionInput');
const profileEmailInput = document.getElementById('profileEmailInput');
const profileLocationInput = document.getElementById('profileLocationInput');
const profileDescriptionInput = document.getElementById('profileDescriptionInput');
const profileSaveSuccess = document.getElementById('profileSaveSuccess');
const profileSaveError = document.getElementById('profileSaveError');
const passwordForm = document.getElementById('passwordForm');
const currentPasswordInput = document.getElementById('currentPassword');
const newPasswordInput = document.getElementById('newPassword');
const confirmPasswordInput = document.getElementById('confirmPassword');
const passwordSuccess = document.getElementById('passwordSuccess');
const passwordError = document.getElementById('passwordError');
const editModal = document.getElementById('editModal');
const modalClose = document.querySelector('.modal-close');
const editItemForm = document.getElementById('editItemForm');
const cancelEditBtn = document.getElementById('cancelEditBtn');

// State
let isLoggedIn = false;
let currentFilter = 'all';
let editingItemId = null;

// Initialize
document.addEventListener('DOMContentLoaded', init);

function init() {
    checkLogin();
    setupEventListeners();
}

function getAdminPassword() {
    const storedPassword = localStorage.getItem(PASSWORD_KEY);
    if (storedPassword) {
        return storedPassword;
    }
    localStorage.setItem(PASSWORD_KEY, DEFAULT_ADMIN_PASSWORD);
    return DEFAULT_ADMIN_PASSWORD;
}

function checkLogin() {
    const sessionPassword = sessionStorage.getItem('admin_logged_in');
    if (sessionPassword === getAdminPassword()) {
        isLoggedIn = true;
        showAdminPanel();
    } else {
        showLoginScreen();
    }
}

function setupEventListeners() {
    // Login
    loginForm.addEventListener('submit', handleLogin);
    logoutBtn.addEventListener('click', handleLogout);

    // Add Item
    addItemForm.addEventListener('submit', handleAddItem);
    itemTypeSelect.addEventListener('change', toggleThumbnailField);
    profileForm.addEventListener('submit', handleProfileSubmit);
    passwordForm.addEventListener('submit', handlePasswordSubmit);

    // Filter Items
    itemsFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            itemsFilterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.getAttribute('data-filter');
            renderItemsList();
        });
    });

    // Edit Modal
    modalClose.addEventListener('click', closeEditModal);
    cancelEditBtn.addEventListener('click', closeEditModal);
    editItemForm.addEventListener('submit', handleEditItem);
    editModal.addEventListener('click', (e) => {
        if (e.target === editModal) {
            closeEditModal();
        }
    });
}

// Login Handler
function handleLogin(e) {
    e.preventDefault();
    const password = passwordInput.value;

    if (password === getAdminPassword()) {
        sessionStorage.setItem('admin_logged_in', password);
        isLoggedIn = true;
        loginError.style.display = 'none';
        passwordInput.value = '';
        showAdminPanel();
    } else {
        loginError.textContent = '❌ পাসওয়ার্ড ভুল! আবার চেষ্টা করুন।';
        loginError.style.display = 'block';
        passwordInput.value = '';
        passwordInput.focus();
    }
}

// Logout Handler
function handleLogout() {
    if (confirm('আপনি কি সত্যিই লগআউট করতে চান?')) {
        sessionStorage.removeItem('admin_logged_in');
        isLoggedIn = false;
        showLoginScreen();
        passwordInput.value = '';
    }
}

// Show/Hide Screens
function showLoginScreen() {
    loginScreen.style.display = 'flex';
    adminPanel.style.display = 'none';
    passwordInput.focus();
}

function showAdminPanel() {
    loginScreen.style.display = 'none';
    adminPanel.style.display = 'block';
    renderItemsList();
    renderProfileForm();
}

// Toggle Thumbnail Field
function toggleThumbnailField() {
    if (itemTypeSelect.value === 'video') {
        videoThumbnailGroup.style.display = 'block';
        document.getElementById('itemThumbnail').required = true;
    } else {
        videoThumbnailGroup.style.display = 'none';
        document.getElementById('itemThumbnail').required = false;
    }
}

function getProfile() {
    const savedProfile = localStorage.getItem(PROFILE_KEY);
    if (savedProfile) {
        return JSON.parse(savedProfile);
    }
    const defaultProfile = {
        image: 'https://via.placeholder.com/260?text=Profile+Picture',
        name: 'আলিফ আহমেদ আল্ভী',
        profession: 'ওয়েব ডেভেলপার / ডিজাইনার',
        email: 'example@email.com',
        location: 'বাংলাদেশ',
        description: 'এই সাইটটি আমার ব্যক্তিগত ছবি, ভিডিও এবং সংক্ষিপ্ত পরিচিতি দেখানোর জন্য তৈরি করা হয়েছে। এখানে আমি আমার কাজ, আগ্রহ এবং যোগাযোগের তথ্য শেয়ার করব।'
    };
    localStorage.setItem(PROFILE_KEY, JSON.stringify(defaultProfile));
    return defaultProfile;
}

function saveProfile(profile) {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

function renderProfileForm() {
    const profile = getProfile();
    profileImageUrl.value = profile.image;
    profileNameInput.value = profile.name;
    profileProfessionInput.value = profile.profession;
    profileEmailInput.value = profile.email;
    profileLocationInput.value = profile.location;
    profileDescriptionInput.value = profile.description;
}

function handleProfileSubmit(e) {
    e.preventDefault();
    const profile = {
        image: profileImageUrl.value.trim(),
        name: profileNameInput.value.trim(),
        profession: profileProfessionInput.value.trim(),
        email: profileEmailInput.value.trim(),
        location: profileLocationInput.value.trim(),
        description: profileDescriptionInput.value.trim()
    };

    if (!profile.image || !profile.name || !profile.profession || !profile.email || !profile.location || !profile.description) {
        profileSaveError.textContent = '❌ সব ফিল্ড পূরণ করুন!';
        profileSaveError.style.display = 'block';
        profileSaveSuccess.style.display = 'none';
        return;
    }

    saveProfile(profile);
    profileSaveSuccess.textContent = '✅ প্রোফাইল সফলভাবে আপডেট হয়েছে!';
    profileSaveSuccess.style.display = 'block';
    profileSaveError.style.display = 'none';
    setTimeout(() => {
        profileSaveSuccess.style.display = 'none';
    }, 3000);
}

function handlePasswordSubmit(e) {
    e.preventDefault();
    const currentPassword = currentPasswordInput.value;
    const newPassword = newPasswordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    if (currentPassword !== getAdminPassword()) {
        passwordError.textContent = '❌ বর্তমান পাসওয়ার্ড ভুল।';
        passwordError.style.display = 'block';
        passwordSuccess.style.display = 'none';
        return;
    }

    if (!newPassword.trim() || newPassword !== confirmPassword) {
        passwordError.textContent = '❌ নতুন পাসওয়ার্ড নিশ্চিত করুন এবং একইটি লিখুন।';
        passwordError.style.display = 'block';
        passwordSuccess.style.display = 'none';
        return;
    }

    localStorage.setItem(PASSWORD_KEY, newPassword);
    sessionStorage.setItem('admin_logged_in', newPassword);
    passwordSuccess.textContent = '✅ পাসওয়ার্ড সফলভাবে পরিবর্তন হয়েছে!';
    passwordSuccess.style.display = 'block';
    passwordError.style.display = 'none';
    currentPasswordInput.value = '';
    newPasswordInput.value = '';
    confirmPasswordInput.value = '';
    setTimeout(() => {
        passwordSuccess.style.display = 'none';
    }, 3000);
}

// Add Item Handler
function handleAddItem(e) {
    e.preventDefault();

    const type = itemTypeSelect.value;
    const caption = document.getElementById('itemCaption').value;
    const src = document.getElementById('itemSrc').value;
    const thumbnail = document.getElementById('itemThumbnail').value || '';

    // Validate
    if (!caption.trim() || !src.trim()) {
        addItemError.textContent = '❌ সব ফিল্ড পূরণ করুন!';
        addItemError.style.display = 'block';
        return;
    }

    if (type === 'video' && !thumbnail.trim()) {
        addItemError.textContent = '❌ ভিডিওর জন্য থাম্বনেইল URL প্রয়োজন!';
        addItemError.style.display = 'block';
        return;
    }

    // Get existing items
    let items = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

    // Generate ID
    const newId = items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1;

    // Create new item
    const newItem = {
        id: newId,
        type: type,
        src: src,
        caption: caption,
        ...(type === 'video' && { thumbnail: thumbnail })
    };

    // Add to array
    items.push(newItem);

    // Save to localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));

    // Show success message
    addItemSuccess.textContent = '✅ সফলভাবে যোগ হয়েছে!';
    addItemSuccess.style.display = 'block';

    // Clear form
    addItemForm.reset();
    videoThumbnailGroup.style.display = 'none';

    // Refresh list
    renderItemsList();

    // Hide success message after 3 seconds
    setTimeout(() => {
        addItemSuccess.style.display = 'none';
    }, 3000);
}

// Render Items List
function renderItemsList() {
    let items = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

    // Filter items
    if (currentFilter !== 'all') {
        items = items.filter(item => item.type === currentFilter);
    }

    // Clear list
    itemsList.innerHTML = '';

    if (items.length === 0) {
        itemsList.innerHTML = `
            <div class="empty-state" style="grid-column: 1 / -1;">
                <div class="empty-state-icon">📭</div>
                <p class="empty-state-text">কোন ${currentFilter === 'photo' ? 'ছবি' : currentFilter === 'video' ? 'ভিডিও' : 'আইটেম'} নেই</p>
            </div>
        `;
        return;
    }

    // Render items
    items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'item-card';
        card.setAttribute('data-id', item.id);
        card.setAttribute('data-type', item.type);

        let imageUrl = item.src;
        if (item.type === 'video' && item.thumbnail) {
            imageUrl = item.thumbnail;
        }

        card.innerHTML = `
            <img src="${imageUrl}" alt="${item.caption}" class="item-card-image" onerror="this.src='https://via.placeholder.com/250x150?text=No+Image'">
            <div class="item-card-content">
                <span class="item-card-type">${item.type === 'photo' ? '🖼️ ছবি' : '🎥 ভিডিও'}</span>
                <p class="item-card-caption">${item.caption}</p>
                <p class="item-card-url">${item.src}</p>
                <div class="item-card-actions">
                    <button class="btn btn-edit" onclick="openEditModal(${item.id})">✏️ সম্পাদনা</button>
                    <button class="btn btn-delete" onclick="deleteItem(${item.id})">🗑️ মুছুন</button>
                </div>
            </div>
        `;

        itemsList.appendChild(card);
    });
}

// Edit Item Functions
function openEditModal(itemId) {
    let items = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    const item = items.find(i => i.id === itemId);

    if (!item) return;

    editingItemId = itemId;
    document.getElementById('editCaption').value = item.caption;
    document.getElementById('editSrc').value = item.src;

    const editThumbnailGroup = document.getElementById('editThumbnailGroup');
    if (item.type === 'video') {
        editThumbnailGroup.style.display = 'block';
        document.getElementById('editThumbnail').value = item.thumbnail || '';
        document.getElementById('editThumbnail').required = true;
    } else {
        editThumbnailGroup.style.display = 'none';
        document.getElementById('editThumbnail').required = false;
    }

    editModal.style.display = 'flex';
}

function closeEditModal() {
    editModal.style.display = 'none';
    editingItemId = null;
    editItemForm.reset();
}

function handleEditItem(e) {
    e.preventDefault();

    if (!editingItemId) return;

    let items = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    const itemIndex = items.findIndex(i => i.id === editingItemId);

    if (itemIndex === -1) return;

    const caption = document.getElementById('editCaption').value;
    const src = document.getElementById('editSrc').value;
    const thumbnail = document.getElementById('editThumbnail').value;

    // Update item
    items[itemIndex].caption = caption;
    items[itemIndex].src = src;

    if (items[itemIndex].type === 'video') {
        items[itemIndex].thumbnail = thumbnail;
    }

    // Save to localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));

    // Close modal and refresh
    closeEditModal();
    renderItemsList();

    // Show success
    addItemSuccess.textContent = '✅ সফলভাবে আপডেট হয়েছে!';
    addItemSuccess.style.display = 'block';
    setTimeout(() => {
        addItemSuccess.style.display = 'none';
    }, 3000);
}

// Delete Item
function deleteItem(itemId) {
    if (!confirm('এই আইটেম মুছে দিতে চান? এটি পূর্বাবস্থায় আনা যাবে না।')) {
        return;
    }

    let items = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    items = items.filter(item => item.id !== itemId);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    renderItemsList();

    addItemSuccess.textContent = '✅ আইটেম মুছে দেওয়া হয়েছে!';
    addItemSuccess.style.display = 'block';
    setTimeout(() => {
        addItemSuccess.style.display = 'none';
    }, 3000);
}