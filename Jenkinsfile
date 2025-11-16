pipeline {
    agent any
    
    triggers {
        // Poll SCM every 5 minutes for new commits on the configured branch
        pollSCM('H/5 * * * *')
        // If you later configure GitHub webhooks and want push-based triggers instead,
        // you can replace the line above with:
        // githubPush()
    }
    
    environment {
        PATH = "/usr/local/bin:/usr/bin:/bin:/opt/homebrew/bin:/opt/homebrew/opt/node@20/bin:${PATH}"
        NODE_VERSION = '20'
    }
    
    stages {
        stage('Checkout') {
            steps {
                echo "🚀 Starting NSW Stamp Duty Test Pipeline"
                checkout scm
            }
        }
        
        stage('Install Dependencies') {
            steps {
                echo "📦 Installing dependencies..."
                sh '''
                    echo "Current PATH: $PATH"
                    node --version
                    npm --version
                    npm ci
                '''
            }
        }
        
        stage('Run Tests') {
            steps {
                echo "🧪 Running Cypress tests..."
                sh '''
                    # Create reports directory
                    mkdir -p cypress/reports
                    
                    # Run Cypress tests with specific spec and JUnit reporter
                    npx cypress run --spec "cypress/e2e/motor-vehicle-stamp-duty.cy.js" --reporter junit --reporter-options "mochaFile=cypress/reports/results.xml"
                '''
            }
        }
        
        stage('Generate Reports') {
            steps {
                echo "📊 Processing test results..."
                sh '''
                    echo "Checking for test result files..."
                    ls -la cypress/reports/ || echo "No reports directory found"
                    
                    # Check if JUnit XML was generated
                    if [ -f "cypress/reports/results.xml" ]; then
                        echo "✅ JUnit XML report found: results.xml"
                        echo "Report size: $(wc -c < cypress/reports/results.xml) bytes"
                        
                        # Create a simple HTML summary for Jenkins
                        cat > cypress/reports/index.html << 'EOF'
<!DOCTYPE html>
<html>
<head>
    <title>NSW Stamp Duty Test Report</title>
    <meta charset="utf-8">
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .header { background-color: #f0f0f0; padding: 15px; border-radius: 5px; margin-bottom: 20px; }
        .success { color: #28a745; }
        .info { background-color: #d1ecf1; padding: 10px; border-radius: 5px; }
    </style>
</head>
<body>
    <div class="header">
        <h1>NSW Stamp Duty Test Report</h1>
        <p class="success">✅ Tests completed successfully!</p>
    </div>
    <div class="info">
        <h3>Test Results Summary</h3>
        <p>• JUnit XML report: <code>results.xml</code></p>
        <p>• Screenshots: Available in <code>cypress/screenshots/</code></p>
        <p>• Videos: Available in <code>cypress/videos/</code></p>
        <p>• Detailed results are available in Jenkins Test Results section</p>
    </div>
</body>
</html>
EOF
                        echo "✅ Created HTML summary report"
                    else
                        echo "❌ No test results found, creating basic report..."
                        cat > cypress/reports/index.html << 'EOF'
<!DOCTYPE html>
<html>
<head>
    <title>NSW Stamp Duty Test Report</title>
    <meta charset="utf-8">
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .header { background-color: #f0f0f0; padding: 15px; border-radius: 5px; }
        .warning { color: #856404; }
    </style>
</head>
<body>
    <div class="header">
        <h1>NSW Stamp Duty Test Report</h1>
        <p class="warning">⚠️ No test results found</p>
    </div>
</body>
</html>
EOF
                        echo "✅ Created basic HTML report"
                    fi
                '''
            }
        }
    }
    
    post {
        always {
            // Publish JUnit test results
            junit 'cypress/reports/results.xml'
            
            // Archive test artifacts
            archiveArtifacts artifacts: 'cypress/screenshots/**/*', allowEmptyArchive: true
            archiveArtifacts artifacts: 'cypress/videos/**/*', allowEmptyArchive: true
            archiveArtifacts artifacts: 'cypress/reports/**/*', allowEmptyArchive: true
            
            // Publish HTML report
            publishHTML([
                allowMissing: false,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'cypress/reports',
                reportFiles: 'index.html',
                reportName: 'NSW Stamp Duty Test Report'
            ])
        }
        
        failure {
            echo "💥 Tests failed! Check the reports and artifacts for details."
        }
    }
}