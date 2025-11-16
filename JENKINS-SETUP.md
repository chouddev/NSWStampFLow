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

### 3. Create Pipeline Job (with automatic trigger)

1. **New Item** → **Pipeline**
2. **Pipeline script from SCM**
3. **Git** repository: `https://github.com/your-username/NSWStampDuty.git` (or your Git server URL)
4. **Script Path**: `Jenkinsfile`
5. **Branch**: `*/main`
6. Save the job.

### 4. Enable automatic build trigger

The `Jenkinsfile` already contains:

```groovy
triggers {
    // Poll SCM every 5 minutes for new commits on the configured branch
    pollSCM('H/5 * * * *')
}
```

To make sure Jenkins obeys this:

1. In the job configuration, under **Build Triggers**, you do **not** need to add extra triggers for SCM polling; the `Jenkinsfile` declarative `triggers` block handles it.
2. Ensure that the Git repository URL and branch are correct in the **Pipeline script from SCM** section so Jenkins can detect new commits.

### 5. Test the Pipeline

1. Go to your Jenkins job dashboard
2. Click **"Build Now"** to run the pipeline manually
3. View the **Cypress Test Report** link in the build results

## What the Pipeline Does

1. **Runs automatically** when new commits are pushed to the configured branch (via SCM polling in the `Jenkinsfile`)
2. **Can still be run manually** when you click "Build Now"
3. **Installs** dependencies with `npm ci`
4. **Runs** the stamp duty tests
5. **Generates** Mochawesome HTML reports
6. **Archives** screenshots, videos, and reports
7. **Publishes** HTML report to Jenkins dashboard

## Viewing Results

After each build:
- **Console Output**: Click on build number for detailed logs
- **Test Report**: Click "Cypress Test Report" for HTML report
- **Artifacts**: Download screenshots/videos from build artifacts

That's it! Your pipeline will now run automatically on every commit (detected by Jenkins polling your Git repository).
