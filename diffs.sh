printf -v currentStep "%0*d" 2 $1
echo -e "\n\n\n>>>>>>>>>>>> changes in step-$currentStep\n"
git diff -D -B --no-index step-$currentStep step-$currentStep-solution
