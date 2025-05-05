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
            steps {
                sh '''
                    chmod +x ./scripts/smoke2.sh
                    ls -a
                '''
            }
        }
    }
}
