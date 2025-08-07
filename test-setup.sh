#!/bin/bash
# Basic test script to verify the application setup

echo "🧪 Testing Oddball Tech Challenge Setup..."
echo "================================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color

# Test 1: Check if Node.js is installed
echo -n "1. Checking Node.js installation... "
if command -v node >/dev/null 2>&1; then
    NODE_VERSION=$(node --version)
    echo -e "${GREEN}✓ Node.js ${NODE_VERSION} found${NC}"
else
    echo -e "${RED}✗ Node.js not found${NC}"
    exit 1
fi

# Test 2: Check if npm dependencies are installed
echo -n "2. Checking frontend dependencies... "
if [ -d "node_modules" ]; then
    echo -e "${GREEN}✓ Dependencies installed${NC}"
else
    echo -e "${YELLOW}⚠ Running npm install...${NC}"
    npm install >/dev/null 2>&1
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓ Dependencies installed${NC}"
    else
        echo -e "${RED}✗ Failed to install dependencies${NC}"
        exit 1
    fi
fi

# Test 3: Check if Bun is available
echo -n "3. Checking Bun installation... "
if command -v bun >/dev/null 2>&1; then
    BUN_VERSION=$(bun --version)
    echo -e "${GREEN}✓ Bun ${BUN_VERSION} found${NC}"
else
    echo -e "${YELLOW}⚠ Bun not found, installing...${NC}"
    curl -fsSL https://bun.sh/install | bash >/dev/null 2>&1
    source ~/.bashrc
    if command -v bun >/dev/null 2>&1; then
        echo -e "${GREEN}✓ Bun installed successfully${NC}"
    else
        echo -e "${RED}✗ Failed to install Bun${NC}"
        exit 1
    fi
fi

# Test 4: Check backend dependencies
echo -n "4. Checking backend dependencies... "
cd backendV2
if [ -d "node_modules" ]; then
    echo -e "${GREEN}✓ Backend dependencies installed${NC}"
else
    echo -e "${YELLOW}⚠ Installing backend dependencies...${NC}"
    bun install >/dev/null 2>&1
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓ Backend dependencies installed${NC}"
    else
        echo -e "${RED}✗ Failed to install backend dependencies${NC}"
        exit 1
    fi
fi
cd ..

# Test 5: Check if environment files exist
echo -n "5. Checking environment configuration... "
if [ -f ".env.local.example" ]; then
    echo -e "${GREEN}✓ Frontend env example found${NC}"
else
    echo -e "${RED}✗ Frontend env example missing${NC}"
fi

if [ -f "backendV2/.env-example" ]; then
    echo -e "${GREEN}✓ Backend env example found${NC}"
else
    echo -e "${RED}✗ Backend env example missing${NC}"
fi

# Test 6: Try building the frontend
echo -n "6. Testing frontend build... "
npm run build >/dev/null 2>&1
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Frontend builds successfully${NC}"
else
    echo -e "${RED}✗ Frontend build failed${NC}"
fi

# Test 7: Check if required env vars are documented
echo -n "7. Checking environment variable documentation... "
if grep -q "GITHUB_TOKEN" README.md && grep -q "OPENAI_API_KEY" README.md; then
    echo -e "${GREEN}✓ Required API keys documented${NC}"
else
    echo -e "${YELLOW}⚠ API key setup may need documentation${NC}"
fi

echo ""
echo "================================================"
echo -e "${GREEN}✅ Basic setup verification complete!${NC}"
echo ""
echo "📝 Next Steps:"
echo "1. Set up your API keys in backendV2/.env"
echo "2. Run 'cd backendV2 && bun start' to start the backend"
echo "3. Run 'npm run dev' to start the frontend"
echo "4. Visit http://localhost:9002/demo to test the interface"
echo ""
echo "📚 See README.md for detailed setup instructions"