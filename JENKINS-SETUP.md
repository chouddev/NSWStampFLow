# Simple Jenkins Setup for NSW Stamp Duty Tests

## Quick Setup Guide

### 1. Install Required Jenkins Plugins

Go to **Manage Jenkins** → **Manage Plugins** and install these plugins:

- **Git Plugin**
- **GitHub Plugin** 
- **HTML Publisher Plugin**
- **NodeJS Plugin**
- **Pipeline Plugin**
- **GitHub Pipeline Plugin**

### 2. Configure Global Tools

Go to **Manage Jenkins** → **Global Tool Configuration**:

#### NodeJS Setup
- **Name**: `NodeJS-20`
- **Install automatically**: ✅
- **Version**: `20.x`

#### Global npm packages to install:
- `cypress`
- `mochawesome-merge`
- `marge`

### 3. Create Pipeline Job

1. **New Item** → **Pipeline**
2. **Pipeline script from SCM**
3. **Git** repository: `https://github.com/your-username/NSWStampDuty.git`
4. **Script Path**: `Jenkinsfile`
5. **Branch**: `*/main`

### 4. Test the Pipeline

1. Go to your Jenkins job dashboard
2. Click **"Build Now"** to run the pipeline manually
3. View the **Cypress Test Report** link in the build results

## What the Pipeline Does

1. **Runs manually** when you click "Build Now"
2. **Installs** dependencies with `npm ci`
3. **Runs** the stamp duty tests
4. **Generates** Mochawesome HTML reports
5. **Archives** screenshots, videos, and reports
6. **Publishes** HTML report to Jenkins dashboard

## Viewing Results

After each build:
- **Console Output**: Click on build number for detailed logs
- **Test Report**: Click "Cypress Test Report" for HTML report
- **Artifacts**: Download screenshots/videos from build artifacts

That's it! Your pipeline will now run automatically on every commit.
