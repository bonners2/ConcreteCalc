//Paste your Application Key and JavaScript Key, respectively
Parse.initialize("x", "x");
Parse.serverURL = "https://parseapi.back4app.com/";
//Paste your Application Key and JavaScript Key, respectively
Parse.initialize("x", "x");
Parse.serverURL = "https://parseapi.back4app.com/";

var maxLoad = Parse.Object.extend("maxLoad");

query = new Parse.Query(maxLoad);
var result;
var x;
var textName = "sean";
var frictAngle;
var frictDiff;
var rUp;
var rDown;
var logrUp;
var logrDown;
var deltaLog;
var logResult;
var deltaFrictAngle
var knownFrictAngles = [0,5,10,15,20,25,30,35,40,45];
var depthArr=[];
var newValues=[];
var FrictAngleExists;
//var rUPArr;

//vars for the depths
var depth0;
var depth18;
var depth14;
var depth12;
var depth1;
var depth2;
var depth3;
var depth4;
var depth5;
var depth6;
var depth7;
var depth8;
var depth9;
var depth10;
var updatedAt;


//create();

//function create() {
//    mypet = new Pet();
//    mypet.set("name", textName);
//    mypet.set("agePet", textAge);
//
//    mypet.save().then(function(pet){
//         console.log('Pet created successful with name: ' + pet.get("name") + ' and age: ' + pet.get("agePet"));
//    }).catch(function(error){
//         console.log('Error: ' + error.message);
//    });
//}

//const element = document.getElementById("chkMaxLoadBtn");
//element.addEventListener("click", function() {
//  document.getElementById("demo").innerHTML = "Hello World";
//});


read();



function myTest(){
  return testString="my test string";
}

secondFunction = async () => {
  const result = await getDepthValues(10);
  console.log("testString: "+result+" and this should be first");

  // do something else here after firstFunction completes
  console.log("this should be second");

}

function read() {
	//get the user inputted frictionAngle value and display it in HTML page.
	x = getFrictionAngle();
	console.log("input friction angle value: "+x);
	frictDiff = (x-roundDown5(x));
	console.log("frictDiff: "+frictDiff);
	
	//check if the input agngle is in the knownFrictAngles array.
	frictAngleExists = checkIfKnown(x);
	console.log("Exists?: "+frictAngleExists);

	if (frictAngleExists===true){
		getDepthValues(x);
		console.log("depthValues: " +depth0+","+depth18+","+depth14+","+depth12+","+depth1+","+depth2+","+depth3+","+depth4+","+depth5+","+depth6+","+depth7+","+depth8+","+depth9+","+depth10);
		console.log("depthArr: "+depthArr);
		//need to add a way to wait for response from getDepthValues()
		displayDepthValues();
		}//close if statement
		else {
			//round up and down to nearst friction known angle
			rUp=roundUp5(x);
			console.log("rUp:"+rUp);
			rDown=roundDown5(x);
			console.log("rDown:"+rDown);

// 			try {
//  					const myAsyncFunction = async function (x){
//  					// Old school function keyword? I like it!
//  						console.log("async frict val: "+x);
//  						await getDepthValues(x);
//  						console.log("new depthArr"+depthArr);
//  					}
// 					console.log("1st async call: ");
// 					getDepthValues(rUp);
// 					let rUPArr=depthArr.slice();
// 					console.log("rUPArr: "+rUPArr);

// 					console.log("2nd async call: ");
// 					getDepthValues(rDown);
// 					let rDownArr=depthArr.slice();
// 					console.log("rDownArr: "+rDownArr);

// 				} catch (error) {
// 					console.error(error);
// 					// Expected output: ReferenceError: nonExistentFunction is not defined
// 					// (Note: the exact output may be browser-dependent)
// 				}


//         .then((data) => {
// 				  console.log("get round up depths: "+data);
//           console.log("data: "+data);
// 						let rUpArr=Array.from(data);
// 						console.log("rUpArr: "+rUpArr);
//           //do somthing
//           });

// 			let rDownArr=getDepthValues(rDown);
//       getDepthValues(rDown)
//         .then((data) => {
//           //do somthing
//           let rDownArr=Array.from(data);
// 					console.log("rDownArr: "+rDownArr);
//           });
			
			//try this here for async function with getDepthValues
			//https://stackoverflow.com/questions/49982058/how-to-call-an-async-function
			
			

//code in here to start calculation for each value of depthArray
// 			 		for (var i = 0; i < rUpArr.length; i++){
// 			 			newValues.push(calcLoad(rUpArr[i]));
// 			 					//results in NaN response
// 			 		}//close for loop
// 			 		console.log("New Load Value: "+newValues+", ");



		}//close else statement 

}

function getDepthValues(x){

		query.equalTo("frictionAngle", x);
		query.first()
		.then
			(function(maxLoad){
				if(maxLoad){
					result = 'Load found for required friction angle of: ' + maxLoad.get("frictionAngle"); 
					//+ ' and depth 1/8: ' + maxLoad.get("dpth_eighth")
					depth0 = maxLoad.get("dpth_0");
					depth18 = maxLoad.get("dpth_eighth");
					depth14 = maxLoad.get("dpth_quarter");
					depth12 = maxLoad.get("dpth_half");
					depth1 = maxLoad.get("dpth_1");
					depth2 = maxLoad.get("dpth_2");
					depth3 = maxLoad.get("dpth_3");
					depth4 = maxLoad.get("dpth_4");
					depth5 = maxLoad.get("dpth_5");
					depth6 = maxLoad.get("dpth_6");
					depth7 = maxLoad.get("dpth_7");
					depth8 = maxLoad.get("dpth_8");
					depth9 = maxLoad.get("dpth_9");
					depth10 = maxLoad.get("dpth_10");
					updatedAt = maxLoad.get("updatedAt");
					//console.log(result);

					depthArr =[depth0,depth18,depth14,depth12,depth1,depth2,depth3,depth4,depth5,depth6,depth7,depth8,depth9,depth10];
					console.log("getDepthValues Array: "+depthArr);
					return depthArr;

				} else {
					result="Nothing found, please try again"
					document.getElementById("resultValue").innerHTML = result;
					console.log(result);
				}
			}
		).catch(function(error){
		console.log("Error: " + error.code + " " + error.message);
		});
}

function displayDepthValues(){
	document.getElementById("inputValue").innerHTML = x;
	document.getElementById("resultValue").innerHTML = result;
	document.getElementById("depth0").innerHTML = "Depth 0: "+ depth0;    
	document.getElementById("depth1-8").innerHTML = "Depth 1/8: "+ depth18;
	document.getElementById("depth1-4").innerHTML = "Depth 1/4: "+ depth14;
	document.getElementById("depth1-2").innerHTML = "Depth 1/2: "+ depth12;
	document.getElementById("depth1").innerHTML = "Depth 1: "+ depth1;
	document.getElementById("depth2").innerHTML = "Depth 2: "+ depth2;
	document.getElementById("depth3").innerHTML = "Depth 3: "+ depth3;
	document.getElementById("depth4").innerHTML = "Depth 4: "+ depth4;
	document.getElementById("depth5").innerHTML = "Depth 5: "+ depth5;
	document.getElementById("depth6").innerHTML = "Depth 6: "+ depth6;
	document.getElementById("depth7").innerHTML = "Depth 7: "+ depth7;
	document.getElementById("depth8").innerHTML = "Depth 8: "+ depth8;
	document.getElementById("depth9").innerHTML = "Depth 9: "+ depth9;
	document.getElementById("depth10").innerHTML = "Depth 10: "+ depth10;
	document.getElementById("last_updated").innerHTML = "Figures Last Updated: "+ updatedAt;
	
	 //create list of maxLoads with a for loop
          /*
          for (let i = 0; i < depthArr.length; i++) {
            console.log(depthArr[i]);
            let listItem = document.createElement('ul');
            listItem.textContent = depthArr[i]
            //document.getElementById("depthList").innerHTML = listItem;
            listItem = document.createElement('ul');
          }//close for loop
         */
}

function iterateDepths(frictionAngle){

}


function getDepthsApi() {
  x = getFrictionAngle();
  result = "Value input is: "+x;
  document.getElementById("inputValue").innerHTML = result;    

  if(checkIfKnown(x)===true){
      const options = {
            method: 'GET',
            headers: {
              'X-Parse-Application-Id': '2MEZ3LMPsVWsl5unTxq5xcGxRS7kXUScloOFpC9t',
              'X-Parse-REST-API-Key': 'fzYAEtncudxMrYU1kdRwbXZAVg3BHm7qh1Ib3fI2'
            }
          };
          fetch('https://concrete.b4a.io/classes/maxLoad?where=%7B%20%22frictionAngle%22%3A%20'+x+'%7D', options)
            .then(response => response.json())
            .then(response => {
            let firstObj=response.results[0];
            let firstObjLenght=Object.keys(firstObj).length
            result = 'Load found for required friction angle of: ' + firstObj["frictionAngle"]; 
            document.getElementById("resultValue").innerHTML = result;    

            for (let i = 0; i < Object.keys(firstObj).length; i++){
              //console.log("object "+i+" is: "+Object.keys(firstObj)[i]);
              let keyName= Object.keys(firstObj)[i];
              let value=firstObj[keyName];
              //console.log("Key is: "+keyName+ " - whose value is:"+ value+" - Type is: "+typeof value);

              if (keyName==="dpth_0"){
                document.getElementById("depth0").innerHTML = "Depth 0: "+ value;    
              } else if(keyName==="dpth_eighth"){
                document.getElementById("depth1-8").innerHTML = "Depth 1/8: "+ value;
              } else if(keyName==="dpth_quarter"){
                document.getElementById("depth1-4").innerHTML = "Depth 1/4: "+ value;
              }else if(keyName==="dpth_half"){
                document.getElementById("depth1-2").innerHTML = "Depth 1/2: "+ value;
              }else if(keyName==="dpth_1"){
                document.getElementById("depth1").innerHTML = "Depth 1: "+ value;
              }else if(keyName==="dpth_2"){
                document.getElementById("depth2").innerHTML = "Depth 2: "+ value;
              }else if(keyName==="dpth_3"){
                document.getElementById("depth3").innerHTML = "Depth 3: "+ value;
              }else if(keyName==="dpth_4"){
                document.getElementById("depth4").innerHTML = "Depth 4: "+ value;
              }else if(keyName==="dpth_5"){
                document.getElementById("depth5").innerHTML = "Depth 5: "+ value;
              }else if(keyName==="dpth_6"){
                document.getElementById("depth6").innerHTML = "Depth 6: "+ value;
              }else if(keyName==="dpth_7"){
                document.getElementById("depth7").innerHTML = "Depth 7: "+ value;
              }else if(keyName==="dpth_8"){
                document.getElementById("depth8").innerHTML = "Depth 8: "+ value;
              }else if(keyName==="dpth_9"){
                document.getElementById("depth9").innerHTML = "Depth 9: "+ value;
              }else if(keyName==="dpth_10"){
                document.getElementById("depth10").innerHTML = "Depth 10: "+ value;
              }else{
                console.log("other fields: "+keyName);
              }
            }
    
            })//closng then statement

            .catch(err => {
              console.log("error occurred");
              console.error(err)
              //do somthing if there is an error here
            });//closing catch statement
      } else{
        //add code here for when input number is now in the current known list
        console.log("unknown input value");
        let noInput = 'Value Entered is: '+x;
        result = 'Friction Angle not found. Please inputting a different Friction Angle:'; 
        document.getElementById("inputValue").innerHTML = noInput; 
        document.getElementById("resultValue").innerHTML = result;

        
        //let expValue = calcLoad(x);


      }
        
  
} //close myFunction


/**
 * 
 * Helper functions
 * 
 */
function checkIfKnown(num1){
  if (knownFrictAngles.includes(num1)){
      return true;
    } else{
      return false;
    }
}

function getFrictionAngle(){
  return parseFloat(document.getElementById("frictionAngle").value);
}
function roundUp5(num){
  return Math.ceil(num/5)*5
}
function roundDown5(num){
  return Math.floor(num / 5) * 5;
}
function calcLog(num){
  return Math.log10(num)
}
function calcDeltaLog(num1, num2){
  return num1 - num2;
}
function calcDeltaFriction(num1,num2){
  return num1 - num2;
}
function calcExp(num1){
  return Math.exp(num1)
}

function calcLoad(frictAngle){

  //get the friction angle that the user has input in the html input field
  //frictAngle = getFrictionAngle();
  console.log("frictAngle used for calc is: " +frictAngle);

  //round up and down to nearest 5 using the input value as basis.
  rUp=roundUp5(frictAngle);
  rDown=roundDown5(frictAngle);
  console.log("roundUp5: "+rUp+" - roundDown5: "+rDown);

  /**
   * 
   * get depth values for the rUp and rDown value
   * calculate all of the below for each set of values value
   * store in an array....maybe
   * return array of new updated valuesadd new set of values to DB (this needs more calculations so will have to do it later)
   * 
   * steps:
   * 1-use for loop to get values for each depth rUP value
   * 2-
   * 
   */


  //calculate the log10 of the two rounded values and return result
  logrUp = calcLog(rUp);
  logrDown = calcLog(rDown);
  console.log("logrUp: "+logrUp+" - logrDown: "+logrDown);

  //calculate the difference between those two calculated log values and divde by 5
  deltaLog = calcDeltaLog(logrUp,logrDown);
  logDiv = deltaLog / 5;
  console.log("deltaLog: "+deltaLog+" - logDiv: "+logDiv);

  //calculate inputFrication angle - rdown and multiple by logResult
  //example: input = 13.5, rdown = 10, difference = 3.5. Multiply logResult by 3.5
  deltaFrictAngle = calcDeltaFriction(frictAngle,rDown)
  console.log("deltaFrictandle: "+deltaFrictAngle);

  //calc log result by multiplying logDiv by the delta og input and rounded down friction angle.
  logResult = logDiv * deltaFrictAngle;
  console.log("logResult: "+logResult);

  //add logResult to logrDown. This should result in the final log value
  expLog = logrDown + logResult;
  console.log("expLog: "+expLog);

  //calculate expnential of the final log value
  expValue = calcExp(expLog);
  console.log("expValue: "+expValue);

	return expValue;
}

function updateDB(){
  myObj = new Parse.Object('Hero');
  myObj.set('sean', 'sean!');
  myObj.set('height',6);
  myObj.save();
  console.log(myObj);

}

