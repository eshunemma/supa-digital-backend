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
                sh 'apt-get update'
                sh 'apt-get install jq -y'
                sh 'chmod +x ./scripts/smoke2.sh'
                sh './scripts/smoke2.sh
            }
        }

  }
}