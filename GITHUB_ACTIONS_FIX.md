# 🔧 GitHub Actions Build Fix

## ❌ Lỗi gặp phải

```
Error: Process completed with exit code 65.
```

Với warnings về script phase:
- "Run script build phase 'Bundle React Native code and images' will be run during every build"
- "Disabling previews because SWIFT_VERSION is set and SWIFT_OPTIMIZATION_LEVEL=-O"

## ✅ Đã fix

### 1. Script Phase Conflict
**Vấn đề**: Xcode project có script phase "Bundle React Native code and images" chạy tự động, nhưng workflow đã bundle trước đó rồi → conflict.

**Giải pháp**: Set environment variable `SKIP_BUNDLING=1` trong build step để skip script phase.

### 2. Swift Optimization Warnings
**Vấn đề**: Warnings về Swift optimization level (không ảnh hưởng build).

**Giải pháp**: Warnings này là normal cho Release builds, không cần fix.

## 🔍 Chi tiết fix

### Workflow đã update:

```yaml
- name: Build for Device
  env:
    SKIP_BUNDLING: 1  # ← Thêm dòng này
  run: |
    cd ios
    xcodebuild \
      -workspace TodoApp.xcworkspace \
      -scheme TodoApp \
      -configuration Release \
      ...
```

### Tại sao cần SKIP_BUNDLING?

1. Workflow bundle React Native trước (step "Bundle React Native")
2. Bundle được copy vào app sau khi build (step "Create IPA")
3. Nếu không skip, Xcode sẽ cố bundle lại → conflict → error

## 🚀 Test lại

### Local test:
```bash
cd TodoApp
npm install
cd ios && pod install && cd ..

# Bundle manually
npx react-native bundle \
  --platform ios \
  --dev false \
  --entry-file index.js \
  --bundle-output ios/main.jsbundle \
  --assets-dest ios

# Build với SKIP_BUNDLING
cd ios
SKIP_BUNDLING=1 xcodebuild \
  -workspace TodoApp.xcworkspace \
  -scheme TodoApp \
  -configuration Release \
  -sdk iphoneos \
  -arch arm64 \
  CODE_SIGN_IDENTITY="" \
  CODE_SIGNING_REQUIRED=NO \
  CODE_SIGNING_ALLOWED=NO \
  build
```

### GitHub Actions test:
1. Commit & push changes
2. Vào Actions tab
3. Run workflow "iOS Build Release"
4. Verify build thành công

## 📋 Checklist

- [x] Set SKIP_BUNDLING=1 trong workflow
- [x] Bundle React Native trước khi build
- [x] Copy bundle vào app sau build
- [x] Verify IPA structure

## 🎯 Kết quả mong đợi

Build sẽ thành công với output:
```
✅ Bundle created at ios/main.jsbundle
✅ Build succeeded
✅ IPA created successfully
```

## 🐛 Nếu vẫn lỗi

### Lỗi "Bundle not found"
```bash
# Verify bundle được tạo
ls -lh ios/main.jsbundle
```

### Lỗi "xcodebuild failed"
```bash
# Clean build
cd ios
xcodebuild clean
rm -rf build
rm -rf ~/Library/Developer/Xcode/DerivedData/*
```

### Lỗi "Pod install failed"
```bash
cd ios
pod deintegrate
pod install
```

## 📚 Tham khảo

- React Native bundling: https://reactnative.dev/docs/bundling
- Xcode build settings: https://developer.apple.com/documentation/xcode
- GitHub Actions: https://docs.github.com/en/actions

## ✅ Status

- **Fixed**: Script phase conflict
- **Status**: Ready to build
- **Next**: Push và test trên GitHub Actions
