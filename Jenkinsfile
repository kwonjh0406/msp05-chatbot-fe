pipeline {
    agent {
        kubernetes {
            yaml """
apiVersion: v1
kind: Pod
spec:
  containers:
  - name: docker
    image: docker:24.0.5-dind
    securityContext:
      privileged: true
    volumeMounts:
    - name: dind-storage
      mountPath: /var/lib/docker
  volumes:
  - name: dind-storage
    emptyDir: {}
"""
        }
    }

    stages {
        stage('1. 코드 가져오기') {
            steps {
                checkout scm
            }
        }

        stage('2. 도커 이미지 빌드 및 푸시') {
            steps {
                script {
                    // docker-auth는 아까 Jenkins Credentials에 등록한 ID입니다.
                    docker.withRegistry('', 'docker-auth') {
                        def appImage = docker.build("<도커ID>/myapp:${env.BUILD_NUMBER}")
                        appImage.push()
                    }
                }
            }
        }

        stage('3. K8s 배포 업데이트') {
            steps {
                script {
                    // yaml 파일 안의 IMAGE_TAG 글자를 현재 빌드 번호로 바꿉니다.
                    sh "sed -i 's/IMAGE_TAG/${env.BUILD_NUMBER}/g' k8s-deploy.yaml"
                    // 권한 설정을 미리 했으므로 바로 적용 가능합니다.
                    sh "kubectl apply -f k8s-deploy.yaml -n admin"
                }
            }
        }
    }
}