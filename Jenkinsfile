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
  serviceAccountName: jenkins-admin 
  containers:
  - name: docker
    image: docker:24.0.5-dind
    securityContext:
      privileged: true
    volumeMounts:
    - name: dind-storage
      mountPath: /var/lib/docker
  - name: kubectl
    image: bitnami/kubectl:latest
    command: ["/bin/sh", "-c"]
    args: ["cat"]
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
                container('kubectl') {
                    sh '''
                      # k8s-deployment.yaml 파일 내의 IMAGE_TAG를 현재 빌드 번호로 교체
                      sed -i "s/IMAGE_TAG/${BUILD_NUMBER}/g" k8s-deployment.yaml
                      
                      # 수정한 파일로 쿠버네티스 배포 적용
                      kubectl apply -f k8s-deployment.yaml -n chatbot
                    '''
                }
            }
        }
    }
}