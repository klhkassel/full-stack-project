
    // document.getElementById("clickedExercise1").addEventListener("click", workout('cardio'));
    // var exerciseButton = document.querySelectorAll(".clickedExercise");
    //get the type of workout name and store it
    // const dataWorkout = require("./Template/assets/js/app.js")


    let cards = document.querySelectorAll(".clickedExercise")
    for( let i = 0; i < cards.length ; i++) {
        cards[i].onclick = workout
        console.log(cards[i]);
        // cards[i].addEventListener("click", function(e) {
        //     // e.preventDefault()
        //   console.log("hii", e);
        // }, false);
    }

    // let exercise = ""
    // let source = document.querySelector("source")
    // let workoutOutput = document.querySelector(".clickedExercise")
    // workoutOutput.value = source.innerText

    // document.querySelector("clickedExercise")
    
    // console.log(exercise)
    // console.log(exerciseButton)

    async function workout(workoutType) {
        console.log(workoutType)
        var typeInput = "cardio"
        const workoutKey = {
            method: "GET",
            headers: {
                'X-Api-Key': 'GNwhKoMr3v0Eo7kYxoFStg==fm74587zcC86VBO0'
                }, 
        };
        const workoutResponse = await fetch(
            `https://api.api-ninjas.com/v1/exercises?type=${typeInput}`, workoutKey
        )
        const workoutData = await workoutResponse.json();
        console.log(workoutData);
        // (function(error, response, body) {
        //     if(error) return console.error('Request failed:', error);
        //    else if(response.statusCode != 200) return console.error('Error:', response.statusCode, body.toString('utf8'));
        //    else res.json(body)
        // })
        // document.getElementsByClassName(".clickedExercise")[0].innerHTML =
        //     renderExercises(exerciseName)
        // window.location.href = "exercises.html";
        // renderExercises(workoutData)


    }    
 
function renderExercises(exercises) {
        document.querySelector(".cards").innerHTML = `
        ${(exercises).map(function(exerciseName) {
            console.log(exerciseName)
            return `
            <h3 class="h3-title">${exerciseName.name}</h3>
                <ul>    
                    <li><span> Equipment <i>:</i></span>${exerciseName.equipment}</li>
                    <li><span> Muscle <i>:</i></span>${exerciseName.muscle}</li>
                    <li><span> Difficulty <i>:</i></span> ${exerciseName.difficulty}</li>
                    <li><span> Instructions <i>:</i></span>${exerciseName.instructions}</li>
                
                </ul>    
            
            `
        }).join("")}

        `   
    }


    //     workoutData.name.forEach((exerciseName) =>  {
    //         document.querySelector(".service-detail-box")[0].innerHTML += `
    //             <h3 class="h3-title">${exerciseName.name}</h3>
    //             <ul>    
    //                 <li><span> Equipment <i>:</i></span>${exerciseName.equipment}</li>
    //                 <li><span> Muscle <i>:</i></span>${exerciseName.muscle}</li>
    //                 <li><span> Difficulty <i>:</i></span> ${exerciseName.difficulty}</li>s
    //                 <li><span> Instructions <i>:</i></span>${exerciseName.instructions}</li>
                
    //             </ul>    
    //         `  
    //     })     
    // }

// workout()
