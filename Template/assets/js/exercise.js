// async function workout(workoutType) {
//     console.log("hi")
//     var typeInput = "cardio"
//     const workoutKey = {
//         method: "GET",
//         headers: {
//             'X-Api-Key': 'GNwhKoMr3v0Eo7kYxoFStg==fm74587zcC86VBO0'
//             }, 
//     };
//     const workoutResponse = await fetch(
//         `https://api.api-ninjas.com/v1/exercises?type=${typeInput}`, workoutKey
//     )
//     const workoutData = await workoutResponse.json();
//     console.log(workoutData);
//     // (function(error, response, body) {
//     //     if(error) return console.error('Request failed:', error);
//     //    else if(response.statusCode != 200) return console.error('Error:', response.statusCode, body.toString('utf8'));
//     //    else res.json(body)
//     // })
//     document.getElementsByClassName(".clickedExercise").innerText =
//     renderExercises(workoutData)

//         // renderExercises(exerciseName)
//     window.location.href = "exercises.html";
    
// }    
