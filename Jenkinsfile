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
                    # 기존 디렉토리 삭제 및 생성
                    sudo rm -rf ${APP_DIR}
                    sudo mkdir -p ${APP_DIR}
                    
                    # Next.js 빌드 파일 복사
                    sudo cp -r .next ${APP_DIR}/
                    sudo cp -r public ${APP_DIR}/
                    sudo cp package*.json ${APP_DIR}/
                    sudo cp next.config.* ${APP_DIR}/ 2>/dev/null || true
                    
                    # 권한 설정
                    sudo chown -R www-data:www-data ${APP_DIR}/
                    
                    # 배포 디렉토리로 이동하여 production 의존성 설치
                    cd ${APP_DIR}
                    sudo npm ci --omit=dev
                    
                    # PM2 프로세스 재시작
                    sudo pm2 delete hannune || true
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