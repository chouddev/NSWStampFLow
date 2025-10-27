#!/bin/bash

# NSW Service Cypress BDD Test Runner Script
# This script provides various options for running Cypress tests

echo "🚀 NSW Service Cypress BDD Test Runner"
echo "======================================"

# Function to display usage
usage() {
    echo "Usage: $0 [OPTION]"
    echo ""
    echo "Options:"
    echo "  stamp-duty  Run motor vehicle stamp duty tests only"
    echo "  all         Run all tests"
    echo "  open        Open Cypress Test Runner GUI"
    echo "  chrome      Run tests in Chrome browser"
    echo "  firefox     Run tests in Firefox browser"
    echo "  edge        Run tests in Edge browser"
    echo "  headed      Run tests in headed mode"
    echo "  clean       Clean test artifacts (videos, screenshots)"
    echo "  install     Install dependencies"
    echo "  help        Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 stamp-duty"
    echo "  $0 chrome"
    echo "  $0 open"
}

# Function to install dependencies
install_deps() {
    echo "📦 Installing dependencies..."
    npm install
    echo "✅ Dependencies installed successfully!"
}

# Function to clean test artifacts
clean_artifacts() {
    echo "🧹 Cleaning test artifacts..."
    rm -rf cypress/videos/*
    rm -rf cypress/screenshots/*
    rm -rf cypress/reports/*
    echo "✅ Test artifacts cleaned!"
}


# Function to run stamp duty tests
run_stamp_duty() {
    echo "🚗 Running motor vehicle stamp duty tests..."
    npx cypress run --spec "cypress/e2e/motor-vehicle-stamp-duty.cy.js"
}

# Function to run all tests
run_all() {
    echo "🎯 Running all tests..."
    npx cypress run
}

# Function to open Cypress GUI
open_cypress() {
    echo "🖥️  Opening Cypress Test Runner..."
    npx cypress open
}

# Function to run tests in specific browser
run_browser() {
    local browser=$1
    echo "🌐 Running tests in $browser browser..."
    npx cypress run --browser $browser
}

# Function to run tests in headed mode
run_headed() {
    echo "👁️  Running tests in headed mode..."
    npx cypress run --headed
}

# Main script logic
case "$1" in
    stamp-duty)
        run_stamp_duty
        ;;
    all)
        run_all
        ;;
    open)
        open_cypress
        ;;
    chrome)
        run_browser chrome
        ;;
    firefox)
        run_browser firefox
        ;;
    edge)
        run_browser edge
        ;;
    headed)
        run_headed
        ;;
    clean)
        clean_artifacts
        ;;
    install)
        install_deps
        ;;
    help|--help|-h)
        usage
        ;;
    "")
        echo "❌ No option provided. Use '$0 help' for usage information."
        exit 1
        ;;
    *)
        echo "❌ Unknown option: $1"
        echo "Use '$0 help' for usage information."
        exit 1
        ;;
esac

echo ""
echo "✨ Test execution completed!"
