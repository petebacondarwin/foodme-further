cd step-01-solution
pwd
karma start --single-run
cd ..

for i in {2..15}
do
  cd step-`printf %02d $i`
  pwd
  karma start --single-run
  cd ..
  cd step-`printf %02d $i`-solution
  pwd
  karma start --single-run
  cd ..
done