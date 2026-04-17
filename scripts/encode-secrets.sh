#!/bin/bash

echo "=========================================="
echo "  GitHub Actions Secrets Encoder"
echo "=========================================="
echo ""

# Kiểm tra certificate
if [ ! -f "certificate.p12" ]; then
    echo "❌ Không tìm thấy file certificate.p12"
    echo "   Vui lòng đặt file certificate.p12 vào thư mục này"
    exit 1
fi

# Kiểm tra provisioning profile
if [ ! -f "profile.mobileprovision" ]; then
    echo "❌ Không tìm thấy file profile.mobileprovision"
    echo "   Vui lòng đặt file profile.mobileprovision vào thư mục này"
    exit 1
fi

echo "✅ Tìm thấy certificate.p12"
echo "✅ Tìm thấy profile.mobileprovision"
echo ""

# Encode certificate
echo "📦 Đang encode certificate..."
CERT_BASE64=$(base64 -i certificate.p12)
echo "✅ Hoàn thành!"
echo ""

# Encode provisioning profile
echo "📦 Đang encode provisioning profile..."
PROFILE_BASE64=$(base64 -i profile.mobileprovision)
echo "✅ Hoàn thành!"
echo ""

# Tạo file output
OUTPUT_FILE="github-secrets.txt"
cat > $OUTPUT_FILE << EOF
========================================
GitHub Actions Secrets
========================================

Thêm các secrets sau vào GitHub Repository:
Settings → Secrets and variables → Actions → New repository secret

1. APPLE_CERTIFICATE_BASE64
   Giá trị:
$CERT_BASE64

2. APPLE_CERTIFICATE_PASSWORD
   Giá trị: [Nhập password của file .p12]

3. PROVISIONING_PROFILE_BASE64
   Giá trị:
$PROFILE_BASE64

4. KEYCHAIN_PASSWORD
   Giá trị: [Tạo password bất kỳ, ví dụ: MySecurePassword123]

========================================
EOF

echo "✅ Đã tạo file: $OUTPUT_FILE"
echo ""
echo "📋 Các bước tiếp theo:"
echo "   1. Mở file $OUTPUT_FILE"
echo "   2. Copy từng secret vào GitHub Repository"
echo "   3. Settings → Secrets and variables → Actions"
echo "   4. New repository secret"
echo ""
echo "⚠️  Lưu ý: Xóa file này sau khi hoàn thành để bảo mật!"
