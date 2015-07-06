# Kill webserver when we exit
set -ex
cleanUp () {
  kill $WEBSERVER_PID
}
trap cleanUp EXIT


# Start up the web server
http-server -p 8080 &
WEBSERVER_PID=$!


cd step-07-solution
pwd
protractor protractor.conf.js
cd ..

for i in {8..15}
do
  cd step-`printf %02d $i`
  pwd
  protractor protractor.conf.js
  cd ..
  cd step-`printf %02d $i`-solution
  pwd
  protractor protractor.conf.js
  cd ..
done