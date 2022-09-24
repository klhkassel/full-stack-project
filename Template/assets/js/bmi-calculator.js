/*==========

Theme Name: Gimnasio - Fitness & Gym Responsive HTML5 Template
Theme Version: 1.0

==========*/

/*==========
----- JS INDEX -----
1.BMI Calculator JS
==========*/

// BMI Calculator JS Start
var age = document.getElementById("age");
var height = document.getElementById("height");
var weight = document.getElementById("weight");
var gender = document.getElementById("gender");
var activity = document.getElementById("activity");
var form = document.getElementById("form");

function validateForm(){
  if(age.value=='' || height.value=='' || weight.value=='' || gender.value=='' || activity.value==''){
    alert("All fields are required!");
    document.getElementById("calculate_bmi").removeEventListener("click", countBmi);
    return false;
  }else{
    countBmi();
  }
}
document.getElementById("calculate_bmi").addEventListener("click", validateForm);

function countBmi(){
  var p = [age.value, height.value, weight.value, gender.value, activity.value];
  form.reset();
  var bmi = Number(p[2])/(Number(p[1])/100*Number(p[1])/100);
      
  var result = '';
  if(bmi<18.5){
    result = 'Underweight';
     }else if(18.5<=bmi&&bmi<=24.9){
    result = 'Healthy';
     }else if(25<=bmi&&bmi<=29.9){
    result = 'Overweight';
     }else if(30<=bmi){
    result = 'Obese';
     }
  
  var bmi_result = document.getElementById("bmi_result");
  var bmi_count = document.getElementById("bmi_count");
  
  bmi_result.innerHTML = result;
  bmi_count.innerHTML = "BMI: "+parseFloat(bmi).toFixed(2);

  return false;
}
// BMI Calculator JS End