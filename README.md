# NSW Stamp Duty Calculator Test Framework

A simple Cypress test automation framework for the NSW Service Motor Vehicle Stamp Duty Calculator with Jenkins CI/CD integration and Mochawesome reporting.

## 🎯 Features

- **Cypress E2E Testing**: Automated testing of the NSW Stamp Duty Calculator
- **Jenkins Pipeline**: Simple CI/CD pipeline for manual execution
- **Mochawesome Reports**: Beautiful HTML test reports with screenshots
- **Failure Screenshots**: Automatic screenshot capture on test failures
- **Manual Execution**: Full control over when tests run

## 🚀 Quick Start

### Prerequisites

- Node.js 20.x or higher
- npm
- Jenkins server (optional)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/NSWStampDuty.git
   cd NSWStampDuty
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run tests**
   ```bash
   # Run all tests
   npm test
   
   # Run specific test
   ./run-tests.sh stamp-duty
   
   # Run with GUI
   npm run test:headed
   ```

## 📁 Project Structure

```
NSWStampDuty/
├── cypress/
│   ├── e2e/                    # Test files
│   │   └── motor-vehicle-stamp-duty.cy.js
│   ├── support/                # Support files
│   │   ├── commands.js         # Custom commands
│   │   └── e2e.js             # Configuration
│   ├── screenshots/           # Test screenshots
│   ├── videos/                # Test videos
│   └── reports/               # Test reports
├── Jenkinsfile                # Jenkins pipeline
├── cypress.config.js          # Cypress configuration
├── package.json               # Dependencies
├── run-tests.sh              # Test runner script
└── README.md                 # This file
```

## 🧪 Test Suite

### Test Cases

1. **Motor Vehicle Stamp Duty Calculation**
   - Complete calculation flow with $25,000 vehicle value
   - Verification of popup with calculation details
   - Screenshot capture for verification

### Running Tests

```bash
# Run all tests
./run-tests.sh all

# Run stamp duty tests only
./run-tests.sh stamp-duty

# Run in specific browser
./run-tests.sh chrome
./run-tests.sh firefox
./run-tests.sh edge

# Run in headed mode (with GUI)
./run-tests.sh headed

# Clean artifacts
./run-tests.sh clean
```

## 🔧 Configuration

### Cypress Configuration

The `cypress.config.js` file contains:

- **Base URL**: NSW Service website
- **Viewport**: 1280x720
- **Timeouts**: 10-30 seconds
- **Reporter**: Mochawesome with HTML and JSON output
- **Artifacts**: Screenshots and videos on failure

## 🚀 Jenkins Pipeline

### Setup

1. **Install Required Plugins**
   - Git Plugin
   - GitHub Plugin
   - HTML Publisher Plugin
   - NodeJS Plugin
   - Pipeline Plugin

2. **Configure Global Tools**
   - **NodeJS**: Install version 20.x

3. **Create Pipeline Job**
   - **New Item** → **Pipeline**
   - **Pipeline script from SCM**
   - **Git** repository: `https://github.com/your-username/NSWStampDgency.git`
   - **Script Path**: `Jenkinsfile`

### Manual Execution

The pipeline is configured for **manual execution only**:

1. Go to your Jenkins job dashboard
2. Click **"Build Now"** to run the pipeline manually
3. View test reports in Jenkins build results

## 📊 Reporting

### Mochawesome Reports

- **Interactive HTML reports** with test results
- **Embedded screenshots** for visual verification
- **Test duration charts** and statistics
- **Failure analysis** with detailed error information

### Artifacts

- **Screenshots**: Captured on test failures
- **Videos**: Full test execution recordings
- **JSON Reports**: Machine-readable test results

### Accessing Reports

- **Jenkins**: Available in build artifacts
- **Local**: Generated in `cypress/reports/` directory

## 🔍 Debugging

### Common Issues

1. **Element Not Found**
   - Check selectors in test files
   - Verify page load timing
   - Use Cypress debugging tools

2. **Test Timeouts**
   - Increase timeout values
   - Check network connectivity
   - Verify test environment

### Debug Commands

```bash
# Run with debug output
DEBUG=cypress:* npm test

# Open Cypress GUI for debugging
npx cypress open

# Run specific test file
npx cypress run --spec "cypress/e2e/motor-vehicle-stamp-duty.cy.js"
```

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

For issues or questions:
1. Check Jenkins build logs
2. Review test artifacts
3. Consult this documentation

---

**Last Updated**: October 2024  
**Version**: 1.0.0