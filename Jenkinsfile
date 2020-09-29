pipeline {
    agent any /* pipeline won't be executed without this line */
    stages {
        stage  ('Build') { /* build the server */
            steps {
               echo 'Building...'   /* logs */
                sh 'cd server'      /*brows to the user directory */
                sh 'npm i'          /* install packages */
                sh 'npm run start'  /* build server */
            }
        }
        stage ('Tests') { /*test the server */
            steps {
                echo 'Testing...'   /* logs */
                sh 'cd server'      /* brows to the user directory */
                sh 'npm i'          /* install packages */
                sh 'npm run test-ci'
            }
        }

    }
}