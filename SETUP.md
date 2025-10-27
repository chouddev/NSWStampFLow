# Simple Setup Guide

## Prerequisites
- Jenkins server running
- Node.js 20.x installed on Jenkins

## Jenkins Setup

### 1. Install Required Plugins
- Git Plugin
- HTML Publisher Plugin
- NodeJS Plugin
- Pipeline Plugin

### 2. Configure Global Tools
- **NodeJS**: Install version 20.x

### 3. Create Pipeline Job
1. **New Item** → **Pipeline**
2. **Pipeline script from SCM**
3. **Git** repository: `https://github.com/your-username/NSWStampDuty.git`
4. **Script Path**: `Jenkinsfile`

## Testing
1. Go to your Jenkins job dashboard
2. Click **"Build Now"** to run the pipeline manually
3. View test reports in Jenkins build results

## Manual Execution
The pipeline is configured for **manual execution only**. You can run it by:
- Clicking **"Build Now"** in Jenkins UI

That's it! Your pipeline is ready for manual execution whenever you need it.