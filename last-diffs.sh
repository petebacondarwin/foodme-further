printf -v currentStep "%0*d" 2 $1
let lastStepVal=$1-1
printf -v lastStep "%0*d" 2 $lastStepVal
echo -e "\n\n\n>>>>>>>>>>>> changes between step-$lastStep and step-$currentStep\n"
git diff -D -B --no-index step-$lastStep-solution step-$currentStep