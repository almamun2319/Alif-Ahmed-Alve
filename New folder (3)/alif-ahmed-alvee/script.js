// Gallery Data Storage
const STORAGE_KEY = 'gallery_items';
const PROFILE_KEY = 'gallery_profile';

const defaultProfile = {
    image: 'https://via.placeholder.com/260?text=Profile+Picture',
    title: 'আমার সম্পর্কে',
    description: 'এই সাইটটি আমার ব্যক্তিগত ছবি, ভিডিও এবং সংক্ষিপ্ত পরিচিতি দেখানোর জন্য তৈরি করা হয়েছে। এখানে আমি আমার কাজ, আগ্রহ এবং যোগাযোগের তথ্য শেয়ার করব।',
    name: 'আলিফ আহমেদ আল্ভী',
    profession: 'ওয়েব ডেভেলপার / ডিজাইনার',
    email: 'example@email.com',
    location: 'বাংলাদেশ'
};

// Default items if no items are saved
const defaultItems = [
    {
        id: 1,
        type: 'photo',
        src: 'https://via.placeholder.com/300?text=Photo+1',
        caption: 'সুন্দর ছবি ১'
    },
    {
        id: 2,
        type: 'photo',
        src: 'https://via.placeholder.com/300?text=Photo+2',
        caption: 'সুন্দর ছবি ২'
    },
    {
        id: 3,
        type: 'photo',
        src: 'https://via.placeholder.com/300?text=Photo+3',
        caption: 'সুন্দর ছবি ৩'
    },
    {
        id: 4,
        type: 'photo',
        src: 'https://via.placeholder.com/300?text=Photo+4',
        caption: 'সুন্দর ছবি ৪'
    },
    {
        id: 5,
        type: 'video',
        src: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        caption: 'পছন্দের ভিডিও ১',
        thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg'
    },
    {
        id: 6,
        type: 'video',
        src: 'https://www.youtube.com/embed/9bZkp7q19f0',
        caption: 'পছন্দের ভিডিও ২',
        thumbnail: 'https://img.youtube.com/vi/9bZkp7q19f0/maxresdefault.jpg'
    }
];

// Get gallery items from localStorage or use defaults
function getGalleryItems() {
    const savedItems = localStorage.getItem(STORAGE_KEY);
    if (savedItems) {
        return JSON.parse(savedItems);
    }
    // Save default items to localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultItems));
    return defaultItems;
}

function getProfile() {
    const savedProfile = localStorage.getItem(PROFILE_KEY);
    if (savedProfile) {
        return JSON.parse(savedProfile);
    }
    localStorage.setItem(PROFILE_KEY, JSON.stringify(defaultProfile));
    return defaultProfile;
}

let galleryItems = getGalleryItems();
let profileData = getProfile();

// DOM Elements
const gallery = document.getElementById('gallery');
const filterBtns = document.querySelectorAll('.filter-btn');
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modalImg');
const modalVideo = document.getElementById('modalVideo');
const modalCaption = document.getElementById('modalCaption');
const closeBtn = document.querySelector('.close');
const themeToggle = document.getElementById('themeToggle');

let currentFilter = 'all';

// Initialize Gallery
function initGallery() {
    renderProfile();
    renderGallery();
    setupFilterButtons();
    setupModal();
    setupThemeToggle();
}

function renderProfile() {
    const profile = getProfile();
    document.getElementById('profileImage').src = profile.image;
    document.getElementById('profileTitle').textContent = profile.title;
    document.getElementById('profileDescription').textContent = profile.description;
    document.getElementById('profileName').textContent = profile.name;
    document.getElementById('profileProfession').textContent = profile.profession;
    document.getElementById('profileEmail').textContent = profile.email;
    document.getElementById('profileLocation').textContent = profile.location;
}

// Render Gallery
function renderGallery() {
    // Load fresh items from localStorage
    const items = JSON.parse(localStorage.getItem(STORAGE_KEY)) || defaultItems;
    gallery.innerHTML = '';

    const filteredItems = currentFilter === 'all' 
        ? items
        : items.filter(item => item.type === currentFilter);

    if (filteredItems.length === 0) {
        gallery.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">📸</div>
                <p class="empty-state-text">কোন ${currentFilter === 'photo' ? 'ছবি' : currentFilter === 'video' ? 'ভিডিও' : 'কন্টেন্ট'} নেই</p>
            </div>
        `;
        return;
    }

    filteredItems.forEach(item => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.setAttribute('data-type', item.type);

        if (item.type === 'photo') {
            galleryItem.innerHTML = `
                <img src="${item.src}" alt="${item.caption}" loading="lazy">
                <div class="gallery-item-overlay">
                    <div class="play-icon">🔍</div>
                </div>
                <div class="gallery-item-caption">
                    <span class="gallery-item-type">ছবি</span>
                    <p>${item.caption}</p>
                </div>
            `;
        } else if (item.type === 'video') {
            galleryItem.innerHTML = `
                <img src="${item.thumbnail}" alt="${item.caption}" loading="lazy" style="width: 100%; height: 100%; object-fit: cover;">
                <div class="gallery-item-overlay">
                    <div class="play-icon">▶</div>
                </div>
                <div class="gallery-item-caption">
                    <span class="gallery-item-type">ভিডিও</span>
                    <p>${item.caption}</p>
                </div>
            `;
        }

        galleryItem.addEventListener('click', () => openModal(item));
        gallery.appendChild(galleryItem);
    });
}

// Setup Filter Buttons
function setupFilterButtons() {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.getAttribute('data-filter');
            renderGallery();
        });
    });
}

// Open Modal
function openModal(item) {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';

    if (item.type === 'photo') {
        modalImg.style.display = 'block';
        modalVideo.style.display = 'none';
        modalImg.src = item.src;
    } else if (item.type === 'video') {
        modalImg.style.display = 'none';
        modalVideo.style.display = 'block';
        modalVideo.src = item.src;
    }

    modalCaption.textContent = item.caption;
}

// Close Modal
function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    modalImg.src = '';
    modalVideo.src = '';
}

// Setup Theme Toggle
function setupThemeToggle() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
}

function updateThemeIcon(theme) {
    themeToggle.textContent = theme === 'light' ? '🌙' : '☀️';
    themeToggle.title = theme === 'light' ? 'ডার্ক মোডে যান' : 'লাইট মোডে যান';
}

// Initialize on Load
document.addEventListener('DOMContentLoaded', initGallery);