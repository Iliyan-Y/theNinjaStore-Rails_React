cp /home/ili/softdev/store/theNinjaStore-Rails_React/deployment/api/Dockerfile . && cp /home/ili/softdev/store/theNinjaStore-Rails_React/deployment/api/.dockerignore .
echo "Docker files coppied" 
echo "Start Building" 
docker build -t iliyany/ninja-store:no-static .
rm .dockerignore Dockerfile
echo "Docker files removed" 