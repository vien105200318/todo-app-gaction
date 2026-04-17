# ✨ Todo App - Ứng dụng quản lý công việc chuyên nghiệp

<div align="center">

**🎯 Modern • 🚀 Fast • 🎨 Beautiful**

Ứng dụng Todo với giao diện đẹp mắt, animations mượt mà và trải nghiệm người dùng đỉnh cao

</div>

---

## 📱 Screenshots

```
┌─────────────────────────────────┐
│  Xin chào! 👋        02 Th4    │
│  Công việc hôm nay              │
│                                 │
│  ┌───────────────────────────┐ │
│  │  75%  │  12  8   4        │ │
│  │  Hoàn │  Tổng Đang Xong   │ │
│  │  thành│  ▓▓▓▓▓▓▓▓░░░░     │ │
│  └───────────────────────────┘ │
│                                 │
│  📋 Tất cả  ⏳ Đang làm  ✅ Xong│
│                                 │
│  💼 CÔNG VIỆC                   │
│  ○ Họp team lúc 2PM            │
│  📅 02/04, 14:00               │
│                                 │
│  🛒 MUA SẮM                     │
│  ✓ Mua rau củ cho tuần này     │
│  📅 02/04, 09:30               │
│                                 │
│                          ┌───┐ │
│                          │ + │ │
│                          └───┘ │
└─────────────────────────────────┘
```

## ✨ Tính năng

### 🎨 Giao diện
- **Modern Design** - Gradient đẹp mắt, card design hiện đại
- **Smooth Animations** - 60fps với React Native Reanimated
- **Haptic Feedback** - Rung nhẹ khi tương tác
- **Responsive** - Tối ưu cho mọi kích thước màn hình

### 🎯 Chức năng chính
- ✅ **Thêm/Xóa/Hoàn thành** công việc
- 📂 **Phân loại** - 5 categories (Công việc, Cá nhân, Mua sắm, Sức khỏe, Khác)
- 🎯 **Độ ưu tiên** - 3 levels (Thấp, Trung bình, Cao)
- 📊 **Thống kê** - Theo dõi tiến độ hoàn thành
- 🔍 **Lọc** - Xem theo trạng thái (Tất cả, Đang làm, Hoàn thành)

### 🎭 Tương tác
- 👆 **Tap** - Đánh dấu hoàn thành
- 👈 **Swipe left** - Xóa công việc
- ⏱️ **Long press** - Chỉnh sửa (coming soon)

## 🛠️ Tech Stack

- **React Native 0.85** - Framework
- **TypeScript** - Type safety
- **React Native Reanimated 3** - Animations
- **React Native Gesture Handler** - Gestures
- **React Native Haptic Feedback** - Haptics
- **React Native Linear Gradient** - Gradients

## 🚀 Cài đặt

### Prerequisites
- Node.js >= 22.11.0
- Xcode (cho iOS)
- CocoaPods

### Bước 1: Clone & Install
\`\`\`bash
git clone https://github.com/vien105200318/todo-app-gaction.git
cd todo-app-gaction/TodoApp
npm install
\`\`\`

### Bước 2: iOS Setup
\`\`\`bash
cd ios
pod install
cd ..
\`\`\`

### Bước 3: Run
\`\`\`bash
# iOS
npm run ios

# Android
npm run android
\`\`\`

## 📦 Build IPA

### Tự động với GitHub Actions

1. Push code lên GitHub
2. Vào tab **Actions**
3. Chọn workflow **"iOS Build Release"**
4. Click **"Run workflow"**
5. Đợi build xong (~5-10 phút)
6. Tải IPA từ **Artifacts**

### Sign với ESign

1. Tải IPA từ GitHub Artifacts
2. Mở ESign trên máy tính
3. Import IPA
4. Sign với FREE certificate
5. Cài lên iPhone
6. Trust certificate trong Settings

Chi tiết: Xem [ESIGN_GUIDE.md](ESIGN_GUIDE.md)

## 📁 Cấu trúc Project

\`\`\`
TodoApp/
├── src/
│   ├── components/          # Reusable components
│   │   ├── TodoItem.tsx     # Todo item với animations
│   │   ├── AddTodoModal.tsx # Modal thêm todo
│   │   ├── StatsCard.tsx    # Card thống kê
│   │   └── FilterTabs.tsx   # Filter tabs
│   ├── screens/
│   │   └── TodoScreen.tsx   # Main screen
│   ├── constants/
│   │   ├── theme.ts         # Theme config
│   │   └── categories.ts    # Categories config
│   ├── types/
│   │   └── index.ts         # TypeScript types
│   └── utils/
│       └── haptics.ts       # Haptic helpers
├── ios/                     # iOS native code
├── android/                 # Android native code
└── .github/workflows/       # CI/CD workflows
\`\`\`

## 🎨 Theme System

### Colors
\`\`\`typescript
COLORS = {
  primary: '#6C5CE7',      // Purple
  success: '#00B894',      // Green
  warning: '#FDCB6E',      // Yellow
  danger: '#FF7675',       // Red
  // ... more colors
}
\`\`\`

### Categories
- 💼 **Công việc** - Purple
- 👤 **Cá nhân** - Green
- 🛒 **Mua sắm** - Yellow
- 💪 **Sức khỏe** - Red
- 📌 **Khác** - Blue

## 🔥 Highlights

### Code Quality
- ✅ TypeScript strict mode
- ✅ ESLint configured
- ✅ Prettier configured
- ✅ Clean architecture
- ✅ Reusable components
- ✅ Performance optimized

### UX Best Practices
- ✅ Smooth 60fps animations
- ✅ Haptic feedback
- ✅ Intuitive gestures
- ✅ Visual feedback
- ✅ Empty states
- ✅ Loading states ready

## 📝 Roadmap

- [ ] Edit todo
- [ ] Due dates
- [ ] Reminders
- [ ] Dark mode
- [ ] Cloud sync
- [ ] Share todos
- [ ] Recurring tasks
- [ ] Subtasks

## 🤝 Contributing

Contributions are welcome! Feel free to:
- 🐛 Report bugs
- 💡 Suggest features
- 🔧 Submit PRs

## 📄 License

MIT License - feel free to use this project for learning or production!

## 👨‍💻 Author

Built with ❤️ by a senior mobile developer

---

<div align="center">

**⭐ Star this repo if you like it!**

Made with React Native • TypeScript • Reanimated

</div>
