
    // - Code to execute when all DOM content is loaded. 
    const exerciseButton = document.querySelector(".clickedExercise");
    exerciseButton.addEventListener("click", renderExercises)



    async function workout() {
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
        renderExercises(workoutData)
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
                    <li><span> Difficulty <i>:</i></span> ${exerciseName.difficulty}</li>s
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

workout()


