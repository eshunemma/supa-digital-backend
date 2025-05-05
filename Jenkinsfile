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
                sh '''
                    sudo apt-get update
                    sudo apt-get install -y jq
                    chmod +x ./scripts/smoke2.sh
                    ./scripts/smoke2.sh
                '''
            }
        }
    }
}
