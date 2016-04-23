./reset-to-step.sh 01
cd workspace
for i in {1..14}
do
  ../reset-to-step.sh `printf %02d $i`
  karma start --single-run
  ../reset-to-step.sh `printf %02d $i`-solution
  karma start --single-run
done
cd ..
