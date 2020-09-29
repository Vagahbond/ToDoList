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

  post {
    
    always {

      discordSend description: 'Jenkins Pipeline Build', footer: 'Footer Text', link: env.BUILD_URL, result: currentBuild.currentResult, unstable: true, title: JOB_NAME, webhookURL: 'https://discordapp.com/api/webhooks/760536452110745664/KhJMQAqJ6vjJ12mbcX7lslbAW7kCEvBUZR1lxtwjcyeb1IDD4bNt-K-Ew6RrjqIL1Q16'
    }

    success {
      emailext (
          subject: "SUCCESSFUL: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'",
          body: """<p>SUCCESSFUL: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]':</p>
            <p>Check console output at &QUOT;<a href='${env.BUILD_URL}'>${env.JOB_NAME} [${env.BUILD_NUMBER}]</a>&QUOT;</p>""",
          recipientProviders: [[$class: 'DevelopersRecipientProvider']]
        )
    }

    failure {
      emailext (
          subject: "FAILED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'",
          body: """<p>FAILED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]':</p>
            <p>Check console output at &QUOT;<a href='${env.BUILD_URL}'>${env.JOB_NAME} [${env.BUILD_NUMBER}]</a>&QUOT;</p>""",
          recipientProviders: [[$class: 'DevelopersRecipientProvider']]
        )
    }
  }
}