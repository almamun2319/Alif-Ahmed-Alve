# 🚀 দ্রুত শুরু করুন

আপনার গ্যালারি মাত্র 3 ধাপে লাইভ করুন!

---

## ধাপ 0️⃣: অ্যাডমিন প্যানেল ব্যবহার করুন (সবচেয়ে সহজ!)

### লাইভ গ্যালারিতে ছবি যোগ করুন বিনা কোডিং-এ:

1. **গ্যালারিতে যান:** http://localhost:8000
2. **শীর্ষ ডানে 🔐 লিঙ্কে ক্লিক করুন**
3. **পাসওয়ার্ড দিন:** `12345678`
4. **নতুন ছবি/ভিডিও যোগ করুন** সহজ ফর্ম দিয়ে
5. **সাইটে ফিরে যান** - নতুন আইটেম দেখা যাবে!

### অ্যাডমিন প্যানেলে করতে পারবেন:
✅ নতুন ছবি যোগ করুন  
✅ YouTube ভিডিও যোগ করুন  
✅ ছবির ক্যাপশন সম্পাদনা করুন  
✅ যেকোনো আইটেম মুছে দিন  
✅ ছবি এবং ভিডিও ফিল্টার করুন  

---

## ধাপ 1️⃣: স্থানীয়ভাবে পরীক্ষা করুন

```bash
python -m http.server 8000
```

ব্রাউজারে খুলুন: **http://localhost:8000**

---

## ধাপ 2️⃣: ছবি এবং ভিডিও যোগ করুন

**স্ক্রিপ্ট এডিটর ব্যবহার না করে** - সরাসরি অ্যাডমিন প্যানেল ব্যবহার করুন!

অথবা **ম্যানুয়ালি** script.js এডিট করতে চান:

### ছবি:
```javascript
{
    id: 1,
    type: 'photo',
    src: 'ছবির_লিঙ্ক.jpg',
    caption: 'ছবির নাম'
}
```

### YouTube ভিডিও:
```javascript
{
    id: 2,
    type: 'video',
    src: 'https://www.youtube.com/embed/VIDEO_ID',
    caption: 'ভিডিওর নাম',
    thumbnail: 'https://img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg'
}
```

---

## ধাপ 3️⃣: GitHub এ আপলোড এবং লাইভ করুন

### A. Repository তৈরি করুন:

1. **github.com** এ যান (সাইন আপ করুন)
2. **+ → New repository** ক্লিক করুন
3. নাম দিন: `alif-ahmed-alvee`
4. **Public** নির্বাচন করুন
5. **Create repository** ক্লিক করুন

### B. ফাইল আপলোড করুন:

1. **Add file → Upload files**
2. সব ফাইল নির্বাচন করুন
3. **Commit changes** ক্লিক করুন

### C. GitHub Pages সক্ষম করুন:

1. **Settings → Pages**
2. **Branch:** `main` নির্বাচন করুন
3. **Folder:** `/`(root) নির্বাচন করুন
4. **Save** ক্লিক করুন

✅ **হয়ে গেছে!** আপনার সাইট লাইভ আছে:
```
https://yourusername.github.io/alif-ahmed-alvee
```

---

## ছবির উৎস (বিনামূল্যে):

| সেবা | লিঙ্ক |
|------|------|
| Imgur | https://imgur.com |
| Pexels | https://pexels.com |
| Unsplash | https://unsplash.com |

---

## এক নজরে কমান্ড

```bash
# স্থানীয় সার্ভার চালান
python -m http.server 8000

# GitHub থেকে ক্লোন করুন
git clone https://github.com/yourusername/alif-ahmed-alvee

# পরিবর্তন সংরক্ষণ করুন
git add .
git commit -m "আপডেট"
git push
```

---

**সম্পূর্ণ গাইডের জন্য SETUP_GUIDE.md পড়ুন**

🎉 **আপনার গ্যালারি এখন লাইভ!**