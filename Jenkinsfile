pipeline {
  agent any
  stages {
    stage('List files') {
      steps {
        sh 'ls -a'
      }
    }

    stage('Npm') {
      steps {
        sh 'ls -l'
      }
    }

    stage('Smoke Test') {
            when {
                branch 'main'
            }
            steps {
                withCredentials([string(credentialsId: 'payroll_backend_staging_url', variable: 'payroll_backend_staging_url')]) {
                    sh 'apt-get update'
                    sh 'apt-get install jq -y'
                    sh 'chmod +x ./scripts/smoke.sh'
                    sh './scripts/smoke.sh
                }
            }
        }

  }
}