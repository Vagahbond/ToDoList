pipeline {
    agent any 
    stages {
        stage ('Tests') { 
            steps {
                echo 'Testing...'   
                dir ("server") {  
                    sh 'npm i'          
                    sh 'npm run test-ci'
                }
                
            }
        }

    }
}