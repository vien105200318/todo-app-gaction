# Quick Start - Thêm Secrets vào GitHub

## Tóm tắt nhanh

### Bước 1: Có sẵn 2 files
- `certificate.p12` (từ Apple Developer)
- `profile.mobileprovision` (từ Apple Developer)

### Bước 2: Encode sang Base64

**macOS/Linux:**
```bash
base64 -i certificate.p12 | pbcopy
# Đã copy vào clipboard, paste vào GitHub Secret
```

**Windows PowerShell:**
```powershell
[Convert]::ToBase64String([IO.File]::ReadAllBytes("certificate.p12")) | clip
# Đã copy vào clipboard, paste vào GitHub Secret
```

### Bước 3: Vào GitHub Repository

```
1. Mở GitHub.com → Repository của bạn
2. Click "Settings" (tab trên cùng)
3. Click "Secrets and variables" (menu trái)
4. Click "Actions"
5. Click "New repository secret"
```

### Bước 4: Thêm 4 Secrets

| Tên Secret | Giá trị | Ghi chú |
|-----------|---------|---------|
| `APPLE_CERTIFICATE_BASE64` | Nội dung base64 của certificate.p12 | Copy từ clipboard |
| `APPLE_CERTIFICATE_PASSWORD` | Password của file .p12 | Password bạn đã đặt khi export |
| `PROVISIONING_PROFILE_BASE64` | Nội dung base64 của profile.mobileprovision | Copy từ clipboard |
| `KEYCHAIN_PASSWORD` | Bất kỳ (vd: `Pass123`) | Tạo mới, không cần nhớ |

### Bước 5: Push code và đợi build

```bash
git push origin main
```

Vào tab **Actions** → Đợi build xong → Tải IPA từ **Artifacts**

---

## Video hướng dẫn (bằng text)

### Màn hình GitHub Settings

```
┌─────────────────────────────────────────────────────────┐
│ GitHub Repository: TodoApp                              │
├─────────────────────────────────────────────────────────┤
│ [Code] [Issues] [Pull requests] [Actions] [Settings] ← Click đây
└─────────────────────────────────────────────────────────┘

┌──────────────────┬──────────────────────────────────────┐
│ Menu bên trái    │ Nội dung chính                       │
├──────────────────┼──────────────────────────────────────┤
│ General          │                                      │
│ Collaborators    │                                      │
│ Secrets and      │ ← Click đây                          │
│   variables      │                                      │
│   └─ Actions ←───┼─── Rồi click đây                    │
│   └─ Codespaces  │                                      │
│ Pages            │                                      │
└──────────────────┴──────────────────────────────────────┘
```

### Màn hình Actions Secrets

```
┌─────────────────────────────────────────────────────────┐
│ Actions secrets                                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  [New repository secret] ← Click nút này               │
│                                                         │
│  Repository secrets (4)                                │
│  ┌───────────────────────────────────────────────────┐ │
│  │ APPLE_CERTIFICATE_BASE64          [Update] [Remove]│ │
│  │ APPLE_CERTIFICATE_PASSWORD        [Update] [Remove]│ │
│  │ PROVISIONING_PROFILE_BASE64       [Update] [Remove]│ │
│  │ KEYCHAIN_PASSWORD                 [Update] [Remove]│ │
│  └───────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

### Form thêm Secret mới

```
┌─────────────────────────────────────────────────────────┐
│ New secret                                              │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Name *                                                 │
│  ┌───────────────────────────────────────────────────┐ │
│  │ APPLE_CERTIFICATE_BASE64                          │ │
│  └───────────────────────────────────────────────────┘ │
│                                                         │
│  Value *                                                │
│  ┌───────────────────────────────────────────────────┐ │
│  │ MIIKvAIBAzCCCngGCSqGSIb3DQEHAaCCCmkEggplMIIK... │ │
│  │ (paste toàn bộ nội dung base64 vào đây)          │ │
│  │                                                   │ │
│  └───────────────────────────────────────────────────┘ │
│                                                         │
│  [Add secret]  [Cancel]                                │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## Checklist

- [ ] Đã có file certificate.p12
- [ ] Đã có file profile.mobileprovision
- [ ] Đã encode 2 files sang base64
- [ ] Đã vào GitHub Settings → Secrets and variables → Actions
- [ ] Đã thêm APPLE_CERTIFICATE_BASE64
- [ ] Đã thêm APPLE_CERTIFICATE_PASSWORD
- [ ] Đã thêm PROVISIONING_PROFILE_BASE64
- [ ] Đã thêm KEYCHAIN_PASSWORD
- [ ] Đã push code lên GitHub
- [ ] Đã kiểm tra tab Actions

---

## Câu hỏi thường gặp

**Q: Tôi không có certificate.p12, lấy ở đâu?**
A: Xem file `SETUP_GUIDE.md` phần "Bước 1: Chuẩn bị Certificate"

**Q: Password của certificate.p12 là gì?**
A: Là password bạn đã đặt khi export certificate từ Keychain Access

**Q: KEYCHAIN_PASSWORD là gì?**
A: Đặt bất kỳ, ví dụ: `MyPassword123`. Chỉ dùng tạm trong quá trình build

**Q: Secrets có bị lộ không?**
A: Không, GitHub mã hóa và không ai xem được, kể cả trong logs

**Q: Build mất bao lâu?**
A: Khoảng 10-15 phút cho lần đầu, sau đó nhanh hơn nhờ cache

**Q: File IPA ở đâu sau khi build xong?**
A: Tab Actions → Click vào workflow run → Kéo xuống phần Artifacts → Download
