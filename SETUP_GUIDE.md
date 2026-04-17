# Hướng dẫn thiết lập GitHub Actions để build IPA

## Bước 1: Chuẩn bị Certificate và Provisioning Profile

### 1.1. Tạo Certificate (trên máy Mac)

1. Mở **Keychain Access**
2. Menu: **Keychain Access → Certificate Assistant → Request a Certificate From a Certificate Authority**
3. Nhập email và tên, chọn "Saved to disk"
4. Lưu file `.certSigningRequest`

5. Đăng nhập vào [Apple Developer](https://developer.apple.com)
6. Vào **Certificates, Identifiers & Profiles**
7. Tạo certificate mới:
   - Chọn **iOS Distribution** (cho App Store) hoặc **iOS Development**
   - Upload file `.certSigningRequest`
   - Download certificate (`.cer`)

8. Double-click file `.cer` để import vào Keychain
9. Trong Keychain, tìm certificate vừa import
10. Right-click → **Export** → Lưu dạng `.p12`
11. Đặt password cho file `.p12`

### 1.2. Tạo Provisioning Profile

1. Trong Apple Developer Portal
2. Vào **Profiles** → Create new profile
3. Chọn **App Store** hoặc **Development**
4. Chọn App ID (hoặc tạo mới với Bundle ID: `com.todoapp`)
5. Chọn Certificate vừa tạo
6. Download file `.mobileprovision`

## Bước 2: Encode Certificate và Profile

Trên máy Mac, chạy lệnh:

```bash
# Encode certificate
base64 -i certificate.p12 | pbcopy
# Paste vào notepad, đây là APPLE_CERTIFICATE_BASE64

# Encode provisioning profile
base64 -i profile.mobileprovision | pbcopy
# Paste vào notepad, đây là PROVISIONING_PROFILE_BASE64
```

## Bước 3: Thêm Secrets vào GitHub

1. Vào GitHub repository
2. **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Thêm các secrets sau:

| Secret Name | Giá trị |
|------------|---------|
| `APPLE_CERTIFICATE_BASE64` | Nội dung base64 của file .p12 |
| `APPLE_CERTIFICATE_PASSWORD` | Password của file .p12 |
| `PROVISIONING_PROFILE_BASE64` | Nội dung base64 của file .mobileprovision |
| `KEYCHAIN_PASSWORD` | Tạo password bất kỳ (ví dụ: `MySecurePassword123`) |

## Bước 4: Cấu hình Bundle ID trong Xcode

1. Mở project trong Xcode:
   ```bash
   cd TodoApp/ios
   open TodoApp.xcworkspace
   ```

2. Chọn project **TodoApp** trong navigator
3. Chọn target **TodoApp**
4. Tab **Signing & Capabilities**:
   - Bỏ check **Automatically manage signing**
   - Chọn Provisioning Profile đã tạo
   - Đảm bảo Bundle Identifier khớp với App ID (ví dụ: `com.todoapp`)

## Bước 5: Push code và chạy workflow

```bash
cd TodoApp
git init
git add .
git commit -m "Initial commit - Todo App with GitHub Actions"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/TodoApp.git
git push -u origin main
```

## Bước 6: Chạy workflow và tải IPA

1. Vào tab **Actions** trong GitHub repository
2. Chọn workflow **iOS Build with Code Signing**
3. Click **Run workflow** → **Run workflow**
4. Đợi build hoàn thành (khoảng 10-15 phút)
5. Tải file IPA từ **Artifacts**

## Cài đặt IPA lên thiết bị

### Cách 1: Sử dụng Xcode
```bash
# Kết nối iPhone qua USB
xcrun devicectl device install app --device <DEVICE_ID> TodoApp.ipa
```

### Cách 2: Sử dụng TestFlight (cho App Store build)
1. Upload IPA lên App Store Connect
2. Thêm tester
3. Cài đặt qua TestFlight app

### Cách 3: Sử dụng Diawi (cho Development build)
1. Upload IPA lên https://www.diawi.com
2. Chia sẻ link để cài đặt

## Troubleshooting

### Lỗi: "No signing certificate"
- Kiểm tra lại APPLE_CERTIFICATE_BASE64 và password
- Đảm bảo certificate chưa hết hạn

### Lỗi: "No provisioning profile"
- Kiểm tra Bundle ID trong Xcode khớp với App ID
- Đảm bảo provisioning profile chưa hết hạn

### Lỗi: "Pod install failed"
- Xóa `ios/Podfile.lock` và `ios/Pods/`
- Chạy lại `pod install`

## Lưu ý quan trọng

- Certificate và Provisioning Profile có thời hạn (thường 1 năm)
- Development profile chỉ cài được trên thiết bị đã đăng ký UDID
- App Store profile cần upload lên App Store Connect
- GitHub Actions macOS runner có giới hạn thời gian (free tier: 2000 phút/tháng)
