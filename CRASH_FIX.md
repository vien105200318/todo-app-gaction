# 🔧 Fix App Crash "Todo App" rồi văng

## ❌ Vấn đề

App hiện splash screen "Todo App" rồi crash ngay lập tức.

## 🔍 Nguyên nhân

React Native không tìm thấy **main.jsbundle** → App không load được JavaScript code → Crash

## ✅ Giải pháp

### Option 1: Build lại với workflow mới (Khuyên dùng)

1. **Chạy workflow mới:**
   - Vào: https://github.com/vien105200318/todo-app-gaction/actions
   - Chọn: **"iOS Build Release (Ready for ESign)"**
   - Click **Run workflow**
   - Đợi 5-10 phút

2. **Tải IPA mới:**
   - Download từ Artifacts: `TodoApp-Release-xxx`

3. **Sign và cài:**
   - Sign bằng ESign/Sideloadly
   - Cài lên iPhone XR
   - Trust certificate
   - Mở app → Sẽ chạy! ✅

---

### Option 2: Fix IPA hiện tại (Nâng cao)

Nếu bạn muốn fix IPA đã có:

#### Trên macOS:

```bash
# 1. Giải nén IPA
unzip TodoApp.ipa

# 2. Bundle React Native
cd /path/to/TodoApp
npx react-native bundle \
  --platform ios \
  --dev false \
  --entry-file index.js \
  --bundle-output main.jsbundle \
  --assets-dest assets

# 3. Copy bundle vào app
cp main.jsbundle Payload/TodoApp.app/
cp -r assets/* Payload/TodoApp.app/ 2>/dev/null || true

# 4. Tạo IPA mới
zip -r TodoApp-Fixed.ipa Payload

# 5. Sign bằng ESign
```

---

## 🔍 Kiểm tra IPA có bundle không

```bash
# Giải nén IPA
unzip TodoApp.ipa

# Kiểm tra có main.jsbundle không
ls -lh Payload/TodoApp.app/main.jsbundle

# Nếu có → OK
# Nếu không có → Thiếu bundle → Crash
```

---

## 📱 Test trên Simulator trước

Để chắc chắn app chạy được:

```bash
cd TodoApp

# Test trên Simulator
npm run ios

# Nếu chạy OK trên Simulator → Build lại cho device
```

---

## 🎯 Checklist

- [ ] Đã chạy workflow **ios-build-release.yml**
- [ ] File IPA có chứa **main.jsbundle**
- [ ] Đã sign bằng ESign/Sideloadly
- [ ] Đã trust certificate
- [ ] iPhone XR chạy iOS 12+

---

## 🆘 Vẫn crash?

### Debug bằng crash log:

1. **Lấy crash log:**
   ```
   Settings → Privacy & Security → Analytics & Improvements
   → Analytics Data → TodoApp-xxx.ips
   ```

2. **Gửi cho tôi để phân tích**

### Hoặc xem console log:

```bash
# Kết nối iPhone qua USB
# Mở app
# Xem logs
idevicesyslog | grep TodoApp
```

---

## 💡 Tại sao crash?

React Native app cần 2 thứ:
1. **Native code** (TodoApp.app) ✅ Đã có
2. **JavaScript bundle** (main.jsbundle) ❌ Thiếu → Crash

Workflow mới đảm bảo cả 2 đều có! 🚀

---

## 📋 So sánh workflows

| Workflow | Bundle JS | Chạy được | Ghi chú |
|----------|-----------|-----------|---------|
| ios-build-simple | ❌ | Simulator only | Cho test |
| ios-build-device | ❌ | ❌ Crash | Thiếu bundle |
| ios-build-release | ✅ | ✅ OK | Dùng cái này! |

---

## ✅ Kết luận

**Dùng workflow: ios-build-release.yml**

Workflow này đảm bảo:
- ✅ Bundle React Native đúng cách
- ✅ Copy bundle vào app
- ✅ Build cho arm64 (iPhone XR)
- ✅ Sẵn sàng để sign và cài

Chạy lại workflow này và app sẽ không crash nữa! 🎉
