# Hướng dẫn thêm Certificate và Password vào GitHub Secrets

## Bước 1: Chuẩn bị files

Bạn cần có 2 files:
- `certificate.p12` - Certificate từ Apple Developer
- `profile.mobileprovision` - Provisioning Profile từ Apple Developer

## Bước 2: Encode files thành Base64

### Trên macOS/Linux:
```bash
# Di chuyển vào thư mục chứa certificate
cd TodoApp/scripts

# Copy certificate.p12 và profile.mobileprovision vào đây
# Sau đó chạy:
./encode-secrets.sh
```

Hoặc encode thủ công:
```bash
# Encode certificate
base64 -i certificate.p12 > cert.txt

# Encode provisioning profile  
base64 -i profile.mobileprovision > profile.txt
```

### Trên Windows (PowerShell):
```powershell
# Encode certificate
[Convert]::ToBase64String([IO.File]::ReadAllBytes("certificate.p12")) | Out-File cert.txt

# Encode provisioning profile
[Convert]::ToBase64String([IO.File]::ReadAllBytes("profile.mobileprovision")) | Out-File profile.txt
```

## Bước 3: Thêm Secrets vào GitHub Repository

### 3.1. Truy cập GitHub Secrets

1. Mở trình duyệt, vào repository GitHub của bạn
2. Click vào tab **Settings** (ở góc phải trên)
3. Trong menu bên trái, click **Secrets and variables**
4. Click **Actions**
5. Click nút **New repository secret** (màu xanh)

### 3.2. Thêm từng Secret

#### Secret 1: APPLE_CERTIFICATE_BASE64
- **Name**: `APPLE_CERTIFICATE_BASE64`
- **Value**: Mở file `cert.txt`, copy toàn bộ nội dung và paste vào
- Click **Add secret**

#### Secret 2: APPLE_CERTIFICATE_PASSWORD
- Click **New repository secret** lại
- **Name**: `APPLE_CERTIFICATE_PASSWORD`
- **Value**: Nhập password mà bạn đã đặt khi export file .p12 từ Keychain
- Click **Add secret**

#### Secret 3: PROVISIONING_PROFILE_BASE64
- Click **New repository secret** lại
- **Name**: `PROVISIONING_PROFILE_BASE64`
- **Value**: Mở file `profile.txt`, copy toàn bộ nội dung và paste vào
- Click **Add secret**

#### Secret 4: KEYCHAIN_PASSWORD
- Click **New repository secret** lại
- **Name**: `KEYCHAIN_PASSWORD`
- **Value**: Tạo một password bất kỳ (ví dụ: `MySecurePassword123`)
  - Password này chỉ dùng tạm thời trong quá trình build
  - Không cần nhớ, chỉ cần đặt một chuỗi bất kỳ
- Click **Add secret**

## Bước 4: Kiểm tra Secrets đã thêm

Sau khi thêm xong, bạn sẽ thấy 4 secrets trong danh sách:
- ✅ APPLE_CERTIFICATE_BASE64
- ✅ APPLE_CERTIFICATE_PASSWORD
- ✅ PROVISIONING_PROFILE_BASE64
- ✅ KEYCHAIN_PASSWORD

**Lưu ý**: GitHub không cho phép xem lại giá trị của secrets sau khi đã thêm (chỉ có thể update hoặc xóa).

## Bước 5: Test GitHub Actions

1. Push code lên GitHub:
```bash
git add .
git commit -m "Add iOS build workflow"
git push origin main
```

2. Vào tab **Actions** trong repository
3. Workflow sẽ tự động chạy
4. Đợi khoảng 10-15 phút để build hoàn thành
5. Tải file IPA từ **Artifacts**

## Hình minh họa vị trí GitHub Secrets

```
GitHub Repository
└── Settings (tab trên cùng)
    └── Secrets and variables (menu bên trái)
        └── Actions
            └── New repository secret (nút xanh)
                ├── Name: [Tên secret]
                └── Value: [Giá trị secret]
```

## Troubleshooting

### Không tìm thấy tab Settings?
- Bạn cần có quyền admin hoặc write access cho repository
- Nếu là repository của người khác, yêu cầu owner thêm secrets

### Secret quá dài?
- GitHub Secrets hỗ trợ tối đa 64KB
- Certificate và provisioning profile thường nhỏ hơn giới hạn này

### Muốn update secret?
- Vào danh sách secrets
- Click vào tên secret cần update
- Click **Update secret**
- Nhập giá trị mới

## Bảo mật

⚠️ **Quan trọng:**
- KHÔNG commit files `.p12`, `.mobileprovision`, `cert.txt`, `profile.txt` vào Git
- KHÔNG share secrets với người khác
- Xóa các file tạm sau khi encode xong
- Secrets chỉ được sử dụng trong GitHub Actions, không ai có thể xem được

```bash
# Xóa files tạm sau khi đã thêm vào GitHub Secrets
rm certificate.p12 profile.mobileprovision cert.txt profile.txt
```
