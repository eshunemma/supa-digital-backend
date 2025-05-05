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
                    chmod +x ./smoke2.sh
                    ls -a
                    ./smoke2.sh
                '''
            }
        }
    }
}
