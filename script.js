var timerId;

function toggleSection(toBeToggled) {
	var section;
	
	section = document.getElementById("lab1");
	section.style.display = "none";
	section = document.getElementById("lab2");
	section.style.display = "none";
	section = document.getElementById("lab3");
	section.style.display = "none";
	section = document.getElementById("prepareExam");
	section.style.display = "none";
	
	section = document.getElementById(toBeToggled);
	section.style.display = "block";
	if(toBeToggled == "lab2") {
		clearInterval(timerId);
		hacking();
	}
}

function msg(val, color) {
	if (!val) {
		return;
	}
	if (color == 'red') {
		val = '<span style="background-color:#ba340d;color:#ffffff" class="msg-text">'+val+'</span>';
	}
	if (color == 'green') {
		val = '<span style="background-color:#678000;color:#ffffff" class="msg-text">'+val+'</span>';
	}

	document.getElementById('msg').insertAdjacentHTML('afterbegin', '<div class="msg-title">'+val+'</div>');
}


function checkPost () {
	var id = document.getElementById('checkid'),
		idVal = id.value,
		arr,
		type,
		num,
		numVerify,
		country,
		html,
		i,
		sum = 0,
		x,
		tail,
		arrType = {
			'C':'Посылка (пакет, бандероль). Parcel post, USPS Priority Mail.',
			'E':'EMS.',
			'L':'Посылка (мелкий пакет, письмо) не отслеживается на сайтах почтовых служб. USPS First Class Mail.',
			'R':'Посылка (мелкий пакет, письмо), зарегистрированная в системе отслеживания и не имеющая страхового покрытия. Letter post registered.'
		};

	document.getElementById('msg').innerHTML = '';

	arr = idVal.match(/([a-zA-Z]{2})(\d{9})([a-zA-Z]{2})/);

	if (!arr) {
		msg('Недействительный идентификатор (no valid!)', 'red');
		return;
	}

	type = arr[1].toUpperCase().substring(0,1);
	num = arr[2];
	country = arr[3].toUpperCase();

	type = arrType[type];

	num = num.split("");
	numVerify = parseInt(num.pop(),10);

	html = '<table class="table-check"><tr><td>Номер<td><td>'+num[0]+'</td><td>'+num[1]+'</td><td>'+num[2]+'</td><td>'+num[3]+'</td><td>'+num[4]+'</td><td>'+num[5]+'</td><td>'+num[6]+'</td><td>'+num[7]+'</td><td></td></tr>';


	num[0] = num[0]*8;
	num[1] = num[1]*6;
	num[2] = num[2]*4;
	num[3] = num[3]*2;
	num[4] = num[4]*3;
	num[5] = num[5]*5;
	num[6] = num[6]*9;
	num[7] = num[7]*7;

	html += '<tr><td>Множители<td><td>8</td><td>6</td><td>4</td><td>2</td><td>3</td><td>5</td><td>9</td><td>7</td><td></td></tr>';

	for(i=0;i<num.length;i++) {
		sum += num[i];
	}

	html += '<tr><td>Рузультат<td><td>'+num[0]+'</td><td>'+num[1]+'</td><td>'+num[2]+'</td><td>'+num[3]+'</td><td>'+num[4]+'</td><td>'+num[5]+'</td><td>'+num[6]+'</td><td>'+num[7]+'</td><td>'+sum+'</td></tr>';

	x = sum/11;
	x = parseInt(x, 10);
	tail = sum - (x*11);

	html += '<tr><td>Остаток<td><td colspan="9">'+tail+'</td></tr>';

	x = 11 - tail;

	if ((x < 1)||(x>11)) {
		msg('Недействительный идентификатор (no valid!)','red');
		return;
	}

	if (x == 10) {
		x = 0;
	}

	if (x == 11) {
		x = 5;
	}

	html += '<tr><td>Полученный номер<td><td colspan="9">'+x+'</td></tr>';

	if (x == numVerify) {
		msg(type);
		msg('Действительный идентификатор (valid!)','green');
		msg(html);
	}
	else {
		msg('Недействительный идентификатор (no valid!)','red');
		return;
	}
}
		
function hacking(){
	var c = document.getElementById("locoalien");
	c.height = window.innerHeight; 
	c.width = window.innerWidth;    

	
	var letraTam=12; 
	var columnas=c.width/letraTam; 
	

	var Texto="0"; 
	Texto=Texto.split("");
	var Texto2="1";
	Texto2=Texto2.split("");

	var letras=[];
	for(var i=0; i<columnas;i++){
		letras[i]=1;
	}
	contexto= c.getContext('2d');

	function dibujar(){
		contexto.fillStyle="rgba(0,0,0,0.05)";
		contexto.fillRect(0,0,c.width,c.height);

		contexto.fillStyle= "#0f0";
		contexto.font= letraTam+"px arial";

		for(var i=0;i<letras.length;i++){
			text=Texto;

			text2=Texto2;
			if(i%2==1){contexto.fillText(text,i*letraTam, letras[i]*letraTam);
			}else{
				contexto.fillText(text2,i*letraTam, letras[i]*letraTam);
			}

			if(letras[i]*letraTam > c.height && Math.random()>0.975){
				letras[i]=0;
			}
			letras[i]++;

		}

	}
	timerId = setInterval(dibujar,120);

}
