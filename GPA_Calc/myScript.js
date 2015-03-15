// GPA Calculator Scripts
// to do: 
// fix remove() function to actually remove the course
// fix displayGPA() function to properly calculate GPA
// fix clear button so that it clears the arrays as well

function begin(){
	courseArray = [];
	creditArray = [];
	letterGradeArray = [];
	gradeArray=[];
}

function clearCourses(){
	begin();
	displayGPA(); 
	displayCourses();
}

function add(){
	var valid= checkAdd(); //check if values are valid
	if (valid){
		updateCurrent(); //add current course to array
		displayGPA(); 
		displayCourses();
	}
}

function checkAdd(){
	var credit = document.getElementById("credits").value;
	var checkCredit=/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/; //testing to see if non-negative decimal
	var course = document.getElementById("course").value;
			if (!checkCredit.test(credit))
			{		
				alert("That's not a valid number of credits");
				return false;
			}
			else if(course=="")
			{		
				alert("Please enter course name.");
				return false;
			}
			else 
			{
				return true;
			}
}

function removing(ele){
	var idString= ele.id;
	var id = idString.substring(6); // all the added courses have id of format "course0" I remove the first 5 indices to be left with an int
	if (id==0){
		courseArray.shift();
		creditArray.shift();
		letterGradeArray.shift();
		gradeArray.shift();
	}
	
	else{
		var tempCourseArray = [];
		var tempCreditArray = [];
		var tempLetterGradeArray = [];
		var tempGradeArray=[];
		
		for(i=0; i<courseArray.length; i++){ // copy over values to temp array
			tempCourseArray[i] = courseArray[i];
			tempCreditArray[i] = creditArray[i];
			tempLetterGradeArray[i] = letterGradeArray[i];
			tempGradeArray[i] = gradeArray[i];
		}

		//reset arrays
		begin();
		
		for(i=0; i<id; i++){ //copy back into original array up to id
			courseArray[i] = tempCourseArray[i];
			creditArray[i] = tempCreditArray[i] ;
			letterGradeArray[i] = tempLetterGradeArray[i];
			gradeArray[i] = tempGradeArray[i];
		}
		
		for(i=courseArray.length; i<tempCourseArray.length-1; i++){ // starting at the end of the non-temp arrays, until the 
			courseArray[i] = tempCourseArray[i+1]; // i+1 because we have skipped the one to be removed
			creditArray[i] = tempCreditArray[i+1] ;
			letterGradeArray[i] = tempLetterGradeArray[i+1];
			gradeArray[i] = tempGradeArray[i+1];
		}
	}
	displayGPA();
	displayCourses();
}

function updateCurrent(){
	var currentCourse = document.getElementById("course").value;
	var currentCredit = document.getElementById("credits").value;
	var currentGrade = document.getElementById("grade").value;
	courseArray.push(currentCourse);
	creditArray.push(currentCredit);
	letterGradeArray.push(currentGrade);
}

function displayCourses(){ //creating a table with values of added courses
	var cList="<table>";
	for (var i=0; i < courseArray.length; i++)
		cList+= "<tr><td>" + courseArray[i] + "</td><td>" + creditArray[i] + "</td><td>" + letterGradeArray[i] + " ("
		+ gradeArray[i] + ")</td><td class=\"remBut\"><button class=\"rb\" type=\"button\" id=\"course" + i
		+ "\" onclick=\"removing(this)\"> Remove</button></td></tr>";
	document.getElementById("courseList").innerHTML = cList + "</table>";
}

function displayGPA(){
	
	var GPA= Math.round(calcGPA() * 100)/100; //rounded to two decimal points
	if (isNaN(GPA))
		document.getElementById("GPADiv").style.backgroundColor = "MintCream";
	else{
		document.getElementById("GPA").innerHTML = "Your GPA: " + GPA;
		document.getElementById("GPADiv").style.backgroundColor = "PowderBlue";
	}
}

function calcGPA(){ //calculating GPA
	calcGrade();
	var sumGrade=parseFloat(0);
	var sumCredit=parseFloat(0);
	for (var i=0; i < gradeArray.length; i++)
		sumGrade= parseFloat(sumGrade) + parseFloat(gradeArray[i]*creditArray[i]); //total weighted sum of credits
	for (var i=0; i < creditArray.length; i++)
		sumCredit= parseFloat(sumCredit) + parseFloat(creditArray[i]); //total sum of credits
	var GPA= sumGrade/sumCredit; //average of total weighted sum of credits divided by total number of credits
	return GPA;
}

function calcGrade(){ //converting letter grade to grade scores (mapped according to Concordia University Standards)
	for (var i=0; i < letterGradeArray.length; i++)
		switch(letterGradeArray[i]){
			case "A+": 
				gradeArray[i] = 4.30;
				break;
			case "A":
				gradeArray[i] = 4.00;
				break;
			case "A-":
				gradeArray[i] = 3.70;
				break;
			case "B+":
				gradeArray[i] = 3.30;
				break;
			case "B":
				gradeArray[i] = 3.00;
				break;
			case "B-":
				gradeArray[i] = 2.70;
				break;
			case "C+":
				gradeArray[i] = 2.30;
				break;
			case "C":
				gradeArray[i] = 2.00;
				break;
			case "C-":
				gradeArray[i] = 1.70;
				break;
			case "D+":
				gradeArray[i] = 1.30;
				break;
			case "D":
				gradeArray[i] = 1.00;
				break;
			case "D-":
				gradeArray[i] = 0.70;
				break;
			case "F":
				gradeArray[i] = 0.00;
				break;
		}
}

