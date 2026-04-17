# 📋 GitHub Actions Workflows

## 🎯 Các workflows có sẵn

### 1. iOS Build Simple (Khuyên dùng - Không cần certificate)

**File:** `ios-build-simple.yml`

**Đặc điểm:**
- ✅ Không cần certificate
- ✅ Không cần provisioning profile
- ✅ Không cần secrets
- ✅ Build nhanh (~5-10 phút)
- ⚠️ Chỉ chạy trên iOS Simulator

**Khi nào dùng:**
- Test app trên Simulator
- Kiểm tra code build được không
- Demo nhanh

**Output:** `TodoApp.app.zip` (cho Simulator)

**Chạy:**
- Tự động khi push code
- Hoặc manual: Actions → iOS Build Simple → Run workflow

---

### 2. iOS Build Unsigned (Không cần certificate)

**File:** `ios-build-unsigned.yml`

**Đặc điểm:**
- ✅ Không cần certificate
- ✅ Build cho Simulator
- ✅ Tạo file .zip

**Output:** `TodoApp-Simulator.zip`

---

### 3. iOS Build (Basic)

**File:** `ios-build.yml`

**Đặc điểm:**
- ⚠️ Cần certificate và provisioning profile
- ⚠️ Cần 4 secrets
- ✅ Build IPA cho thiết bị thật

**Secrets cần:**
- APPLE_CERTIFICATE_BASE64
- APPLE_CERTIFICATE_PASSWORD
- PROVISIONING_PROFILE_BASE64
- KEYCHAIN_PASSWORD

**Output:** `TodoApp.ipa` (cài được lên iPhone)

---

### 4. iOS Build with Code Signing (Full)

**File:** `ios-build-signed.yml`

**Đặc điểm:**
- ⚠️ Cần certificate và provisioning profile
- ⚠️ Cần 4 secrets
- ✅ Build IPA có sign đầy đủ
- ✅ Có dSYM files

**Output:** 
- `TodoApp.ipa`
- `TodoApp.dSYM.zip`

---

### 5. iOS Build Archive

**File:** `ios-build-archive.yml`

**Đặc điểm:**
- ⚠️ Thử nghiệm
- ⚠️ Có thể không hoạt động
- Manual trigger only

---

## 🚀 Cách sử dụng

### Build không cần certificate (Khuyên dùng)

1. Push code lên GitHub
2. Workflow `iOS Build Simple` tự động chạy
3. Đợi 5-10 phút
4. Tải `TodoApp.app.zip` từ Artifacts
5. Giải nén và chạy trên Xcode Simulator

### Build có certificate (Cho thiết bị thật)

1. Thêm 4 secrets vào GitHub (xem `QUICK_FIX.md`)
2. Chạy workflow `iOS Build with Code Signing`
3. Đợi 10-15 phút
4. Tải `TodoApp.ipa` từ Artifacts
5. Cài lên iPhone qua Xcode/TestFlight

---

## 📊 So sánh

| Workflow | Certificate | Simulator | Device | Thời gian |
|----------|-------------|-----------|--------|-----------|
| Simple | ❌ Không cần | ✅ | ❌ | 5-10 phút |
| Unsigned | ❌ Không cần | ✅ | ❌ | 5-10 phút |
| Basic | ✅ Cần | ❌ | ✅ | 10-15 phút |
| Signed | ✅ Cần | ❌ | ✅ | 10-15 phút |

---

## 💡 Khuyến nghị

### Cho development/testing:
→ Dùng **iOS Build Simple** (không cần certificate)

### Cho production/distribution:
→ Dùng **iOS Build with Code Signing** (cần certificate)

---

## 🔧 Troubleshooting

### Workflow không chạy?
- Kiểm tra Actions đã được enable
- Settings → Actions → General → Allow all actions

### Build bị lỗi?
- Xem logs trong workflow run
- Kiểm tra file `TROUBLESHOOTING.md`

### Không tải được Artifacts?
- Đợi workflow chạy xong (status: ✓)
- Kéo xuống phần Artifacts
- Click để download

---

## 📝 Disable workflows không dùng

Nếu chỉ muốn dùng 1 workflow, disable các workflow khác:

1. Vào `.github/workflows/`
2. Đổi tên file (thêm `.disabled`):
   - `ios-build.yml.disabled`
   - `ios-build-signed.yml.disabled`

Hoặc xóa file không cần.

---

## 🎯 Workflow khuyên dùng

**Bắt đầu với:** `ios-build-simple.yml`
- Không cần setup gì
- Build nhanh
- Test được ngay

**Sau đó nâng cấp:** `ios-build-signed.yml`
- Khi cần cài lên iPhone thật
- Khi cần distribute app
