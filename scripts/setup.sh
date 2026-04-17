#!/bin/bash

echo "🚀 Setting up Todo App..."
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found!"
    echo "Please run this script from the TodoApp directory"
    exit 1
fi

echo "📦 Installing npm dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ npm install failed!"
    exit 1
fi

echo ""
echo "🍎 Installing iOS Pods..."
cd ios
pod install

if [ $? -ne 0 ]; then
    echo "❌ pod install failed!"
    exit 1
fi

cd ..

echo ""
echo "✅ Setup complete!"
echo ""
echo "🎯 Next steps:"
echo "  1. Run on simulator: npm run ios"
echo "  2. Or push to GitHub and use Actions to build IPA"
echo ""
echo "📚 Documentation:"
echo "  - BUILD_NEW_VERSION.md - Build instructions"
echo "  - README_VI.md - Full documentation"
echo "  - UPGRADE_COMPLETE.md - What's new"
echo ""
echo "🎉 Happy coding!"
