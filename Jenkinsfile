pipeline {
    agent any
    stages {
        stage  ('Build') {
            steps {
               echo 'Building...'
                sh 'cd server'
                sh 'npm i'
                sh 'npm run start'
            }
        }
        stage ('Tests') {
            steps {
                echo 'Testing...'
                sh 'cd server'
                sh 'npm i'
                sh 'npm run test-ci'
            }
        }

    }
}