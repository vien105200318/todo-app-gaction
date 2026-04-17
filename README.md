# Todo App - React Native

Ứng dụng Todo đơn giản được xây dựng bằng React Native với tính năng:
- ✅ Thêm công việc mới
- ✅ Đánh dấu hoàn thành
- ✅ Xóa công việc
- ✅ Đếm số công việc chưa hoàn thành

## Yêu cầu

- Node.js 18+
- React Native CLI
- Xcode (cho iOS)
- CocoaPods

## Cài đặt

```bash
cd TodoApp
npm install
cd ios && pod install && cd ..
```

## Chạy ứng dụng

### iOS
```bash
npm run ios
```

### Android
```bash
npm run android
```

## Build IPA với GitHub Actions

### 📚 Hướng dẫn chi tiết

Chọn hướng dẫn phù hợp với bạn:

1. **[QUICK_START.md](QUICK_START.md)** - Hướng dẫn nhanh với hình minh họa
2. **[GITHUB_SECRETS_GUIDE.md](GITHUB_SECRETS_GUIDE.md)** - Chi tiết cách thêm secrets
3. **[SETUP_GUIDE.md](SETUP_GUIDE.md)** - Hướng dẫn đầy đủ từ A-Z

### ⚡ Tóm tắt nhanh

**Bước 1:** Chuẩn bị certificate và provisioning profile từ Apple Developer

**Bước 2:** Encode sang base64
```bash
base64 -i certificate.p12 | pbcopy
base64 -i profile.mobileprovision | pbcopy
```

**Bước 3:** Thêm vào GitHub Secrets
- Vào: `Settings → Secrets and variables → Actions → New repository secret`
- Thêm 4 secrets:
  - `APPLE_CERTIFICATE_BASE64`
  - `APPLE_CERTIFICATE_PASSWORD`
  - `PROVISIONING_PROFILE_BASE64`
  - `KEYCHAIN_PASSWORD`

**Bước 4:** Push code và đợi build
```bash
git push origin main
```

**Bước 5:** Tải IPA từ tab Actions → Artifacts

## Cấu trúc thư mục

```
TodoApp/
├── src/
│   ├── components/
│   │   └── TodoItem.tsx
│   └── screens/
│       └── TodoScreen.tsx
├── ios/
│   ├── Fastfile
│   └── Gemfile
├── .github/
│   └── workflows/
│       └── ios-build.yml
└── App.tsx
```

## Fastlane Commands

```bash
cd ios

# Build development
fastlane build_app

# Build for App Store
fastlane release
```

## Lưu ý

- Cần có Apple Developer Account để tạo certificate và provisioning profile
- Build IPA yêu cầu macOS runner (GitHub Actions free tier có giới hạn)
- File IPA được lưu trong Artifacts trong 30 ngày
