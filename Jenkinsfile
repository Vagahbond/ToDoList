pipeline {
    agent any /* pipeline won't be executed without this line */
    stages {
        stage ('Tests') { /*test the server */
            steps {
                echo 'Testing...'   /* logs */
                dir ("server") {    /* browse to workdir */
                    sh 'npm i'          /* install packages */
                    sh 'npm run test-ci' /* run tests */
                }
                
            }
        }

    }
}