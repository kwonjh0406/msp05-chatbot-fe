pipeline {
    triggers {
        pollSCM('H/3 * * * *')
    }
    agent {
        kubernetes {
            yaml """
apiVersion: v1
kind: Pod
spec:
  # 중요: 배포 권한을 가진 ServiceAccount를 지정해야 합니다.
  serviceAccountName: jenkins-admin 
  containers:
  - name: docker
    image: docker:24.0.5-dind
    securityContext:
      privileged: true
    volumeMounts:
    - name: dind-storage
      mountPath: /var/lib/docker
  # kubectl 명령어를 실행하기 위한 전용 컨테이너 추가
  - name: kubectl
    image: bitnami/kubectl:latest
    command:
    - cat
    tty: true
  volumes:
  - name: dind-storage
    emptyDir: {}
"""
        }
    }

    environment {
        IMAGE_NAME = "kwonjh0406/chatbot-fe"
    }

    stages {
        stage('1. 코드 가져오기') {
            steps {
                checkout scm
            }
        }

        stage('2. 도커 이미지 빌드 및 푸시') {
            steps {
                container('docker') {
                    withCredentials([
                        usernamePassword(
                            credentialsId: 'docker-auth',
                            usernameVariable: 'DOCKER_USERNAME',
                            passwordVariable: 'DOCKER_PASSWORD'
                        )
                    ]) {
                        sh '''
                          docker info
                          docker build -t $IMAGE_NAME:${BUILD_NUMBER} .
                          echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
                          docker push $IMAGE_NAME:${BUILD_NUMBER}
                        '''
                    }
                }
            }
        }

        stage('3. K8s 배포 업데이트') {
            steps {
                # kubectl 컨테이너 환경에서 실행합니다.
                container('kubectl') {
                    sh '''
                      echo "=== k8s-deployment.yaml 수정 (Tag: ${BUILD_NUMBER}) ==="
                      
                      # 파일 이름이 k8s-deployment.yaml 인지 확인하세요!
                      # yaml 파일 내부의 image 부분에 'IMAGE_TAG'라고 적혀있어야 바뀝니다.
                      sed -i "s/IMAGE_TAG/${BUILD_NUMBER}/g" k8s-deployment.yaml

                      echo "=== 수정된 파일 확인 ==="
                      cat k8s-deployment.yaml

                      # 배포 실행
                      kubectl apply -f k8s-deployment.yaml -n chatbot
                    '''
                }
            }
        }
    }
}