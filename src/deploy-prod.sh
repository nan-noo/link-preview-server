cd /home/ubuntu/2022-moamoa/frontend

local=$(git rev-parse HEAD)
echo $local

target=$(git rev-parse origin/develop)
echo $target

echo 'git fetch --all'
sudo git fetch --all

echo 'git reset --hard origin/main'
sudo git reset --hard origin/main

echo 'main 브랜치 풀 완료'
npm install

echo "npm install 완료"
npm run build

echo "빌드 완료"
sudo cp ./dist/* /var/www/html/prod

echo "배포 완료"
