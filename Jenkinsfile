pipeline {
    agent any
    
    tools {
        nodejs 'nodejs' // Jenkins에 설정된 NodeJS 이름
    }

    environment {
        APP_DIR = '/opt/apps/inHouse/hannene'
    }
    
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    credentialsId: 'geol2',
                    url: 'https://github.com/Funiv-dev/cms-portal'
            }
        }
        
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        
        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
        
        stage('Deploy') {
            steps {
                // 빌드 파일을 배포 위치로 복사
                sh '''
                    sudo rm -rf ${APP_DIR}/
                    sudo cp -r build ${APP_DIR}/
                    sudo chown -R www-data:www-data ${APP_DIR}/
                    
                    sudo npm ci --omit=dev
                    sudo npm install

                    sudo cp -r build ${APP_DIR}/
                    sudo cp package*.json ${APP_DIR}/

                    # PM2 프로세스 삭제 (있다면)
                    sudo pm2 delete hannune || true
                    
                    # PM2로 시작
                    sudo PORT=3001 pm2 start npm --name "hannune" -- start
                    sudo pm2 save
                '''
            }
        }
    }
    
    post {
        success {
            echo '✅ 배포 성공!'
        }
        failure {
            echo '❌ 배포 실패!'
        }
    }
}