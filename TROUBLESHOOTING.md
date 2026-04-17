# 🔧 Troubleshooting - Giải quyết lỗi thường gặp

## ✅ Đã sửa

### Lỗi: Dependencies lock file is not found

**Triệu chứng:**
```
Error: Dependencies lock file is not found in /Users/runner/work/todo-app-gaction/todo-app-gaction. 
Supported file patterns: package-lock.json,npm-shrinkwrap.json,yarn.lock
```

**Nguyên nhân:**
- GitHub Actions yêu cầu cache npm nhưng không tìm thấy package-lock.json

**Giải pháp:** ✅ Đã sửa
1. Đã tạo package-lock.json
2. Đã xóa `cache: 'npm'` khỏi workflows
3. Đã push lên GitHub

---

## 🐛 Các lỗi khác có thể gặp

### 1. Lỗi: No signing certificate

**Triệu chứng:**
```
error: No signing certificate "iOS Distribution" found
```

**Nguyên nhân:**
- Secret APPLE_CERTIFICATE_BASE64 sai hoặc thiếu
- Password certificate không đúng
- Certificate đã hết hạn

**Giải pháp:**
1. Kiểm tra lại secret APPLE_CERTIFICATE_BASE64:
   ```bash
   cat cer/cert_base64.txt
   ```
2. Đảm bảo APPLE_CERTIFICATE_PASSWORD = `1`
3. Kiểm tra certificate chưa hết hạn trong Apple Developer

### 2. Lỗi: No provisioning profile

**Triệu chứng:**
```
error: Provisioning profile "..." doesn't include signing certificate
```

**Nguyên nhân:**
- Secret PROVISIONING_PROFILE_BASE64 sai
- Bundle ID không khớp
- Provisioning profile đã hết hạn

**Giải pháp:**
1. Kiểm tra Bundle ID trong Xcode khớp với App ID
2. Kiểm tra provisioning profile:
   ```bash
   cat cer/profile_base64.txt
   ```
3. Đảm bảo provisioning profile chưa hết hạn

### 3. Lỗi: Pod install failed

**Triệu chứng:**
```
[!] Unable to find a specification for ...
```

**Nguyên nhân:**
- CocoaPods cache lỗi
- Podfile.lock không tương thích

**Giải pháp:**
Thêm step clean cache vào workflow:
```yaml
- name: Clean CocoaPods cache
  run: |
    cd ios
    rm -rf Pods Podfile.lock
    pod cache clean --all
    pod install
```

### 4. Lỗi: Build failed - Xcode

**Triệu chứng:**
```
** BUILD FAILED **
```

**Nguyên nhân:**
- Code có lỗi syntax
- Dependencies thiếu
- Xcode version không tương thích

**Giải pháp:**
1. Test build local trước:
   ```bash
   cd TodoApp/ios
   xcodebuild -workspace TodoApp.xcworkspace -scheme TodoApp -configuration Release
   ```
2. Kiểm tra diagnostics:
   ```bash
   npm run ios
   ```

### 5. Lỗi: Fastlane not found

**Triệu chứng:**
```
fastlane: command not found
```

**Nguyên nhân:**
- Fastlane chưa được cài đặt

**Giải pháp:**
Workflow đã có step cài Fastlane, nhưng nếu vẫn lỗi, thêm:
```yaml
- name: Install Fastlane
  run: |
    sudo gem install fastlane -NV
    fastlane --version
```

### 6. Lỗi: Keychain password

**Triệu chứng:**
```
security: SecKeychainOpen ... : The specified keychain could not be found
```

**Nguyên nhân:**
- Secret KEYCHAIN_PASSWORD thiếu hoặc sai

**Giải pháp:**
Đảm bảo đã thêm secret KEYCHAIN_PASSWORD (giá trị bất kỳ, vd: `MySecurePassword123`)

### 7. Lỗi: Workflow không chạy

**Triệu chứng:**
- Không thấy workflow trong tab Actions
- Workflow không tự động chạy khi push

**Nguyên nhân:**
- Actions chưa được enable
- Workflow file sai cú pháp

**Giải pháp:**
1. Enable Actions: Settings → Actions → General → Allow all actions
2. Kiểm tra workflow syntax:
   ```bash
   cat .github/workflows/ios-build-signed.yml
   ```

### 8. Lỗi: Artifacts không có

**Triệu chứng:**
- Workflow chạy xong nhưng không có Artifacts

**Nguyên nhân:**
- Build thất bại trước khi tạo IPA
- Path IPA không đúng

**Giải pháp:**
Kiểm tra logs của step "Build iOS App" để xem lỗi cụ thể

### 9. Lỗi: Node version

**Triệu chứng:**
```
npm WARN EBADENGINE Unsupported engine
```

**Nguyên nhân:**
- package.json yêu cầu Node version cao hơn

**Giải pháp:**
Sửa package.json:
```json
{
  "engines": {
    "node": ">= 18.0.0"
  }
}
```

### 10. Lỗi: Bundle ID mismatch

**Triệu chứng:**
```
error: Provisioning profile doesn't match bundle identifier
```

**Nguyên nhân:**
- Bundle ID trong Xcode khác với App ID

**Giải pháp:**
1. Mở Xcode: `open ios/TodoApp.xcworkspace`
2. Chọn project → Target → Signing & Capabilities
3. Đảm bảo Bundle Identifier khớp với App ID (vd: `com.todoapp`)

---

## 📊 Kiểm tra logs

### Xem logs workflow
1. Vào: https://github.com/vien105200318/todo-app-gaction/actions
2. Click vào workflow run
3. Click vào job "build-ios"
4. Xem từng step để tìm lỗi

### Xem logs chi tiết
Click vào step bị lỗi (có icon ❌) để xem logs đầy đủ

---

## 🆘 Cần trợ giúp?

### Checklist trước khi hỏi
- [ ] Đã thêm đủ 4 secrets vào GitHub
- [ ] Đã kiểm tra certificate chưa hết hạn
- [ ] Đã kiểm tra provisioning profile chưa hết hạn
- [ ] Đã xem logs workflow
- [ ] Đã test build local

### Thông tin cần cung cấp
1. Link workflow run bị lỗi
2. Screenshot logs lỗi
3. Xcode version đang dùng
4. macOS version

---

## ✅ Workflow đang hoạt động

Nếu bạn thấy:
- ✓ Checkout code
- ✓ Setup Node.js
- ✓ Install dependencies
- ✓ Install CocoaPods
- ✓ Import Code Signing Certificates
- ✓ Import Provisioning Profile
- ✓ Build iOS App
- ✓ Upload IPA

Thì mọi thứ đã OK! Tải IPA từ Artifacts.
