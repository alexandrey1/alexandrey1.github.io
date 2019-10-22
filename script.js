function primeNumber(num) {
  for (i = 2; i < num; i++) {
    if (num % i == 0)
      return false;
  }
  return true;
}

$('#encryptbtn').click(function() {


  if (($('#pvalue').val() > 0) && ($('#qvalue').val() > 0)) {
    var p = $('#pvalue').val().toString(64);
    var q = $('#qvalue').val().toString(64);

    if (primeNumber(p) && primeNumber(q)) {
      var s = $('#textmessage').val();
      s = s.toUpperCase();


      console.log(s)

      var arr = [];
      var a = 0;
      for (var i = 0; a < s.length; i++) {
        arr[i] = s.slice(a, a + 2);
        a = a + 2;
      }
      console.log(arr)

      var n = p * q;
      var m = (p - 1) * (q - 1);
      const e = 65537;
      var d = Calculate_d(e, m);
      console.log("d=" + d, "n=" + n)
			$('#dvalue').val(d);
			$('#nvalue').val(n);

      var code_arr = RSA_Endoce(s, e, n);

      var code_s = "";
      for (i = 0; i < code_arr.length; i++) {
        code_s += String.fromCharCode(code_arr[i]);
      }
      $('#textmessage').val(code_s);
			console.log(code_s)
    } else
      alert("p или q - не простые числа!");
  } else
    alert("Введите p и q!");
});

$('#decryptbtn').click(function() {
  if (($('#dvalue').val() > 0) && ($('#nvalue').val() > 0)) {
    var d = $('#dvalue').val().toString(64);
    var n = $('#nvalue').val().toString(64);

    var s = $('#textmessage').val();

    var decode_s = RSA_Dedoce(s, d, n);

    //console.log(decode_arr)

    /* var decode_s=""; */

    /* for(i=0;i<decode_arr.length;i++){
    	decode_s+=String.fromCharCode(decode_arr[i]);
    } */
    console.log(decode_s)
    $('#textmessage').val(decode_s);
  } else
    alert("Введите секретный ключ!");
});

function RSA_Endoce(s, e, n) {
  var result = [];

  var bi;



  for (var i = 0; i < s.length; i++) {
    var index = s[i]
    //console.log(index)
    bi = index.charCodeAt(0);
    //console.log(bi)

    //bi = Math.pow(bi, e)%n;
    bi = modpow(bi, e, n);

    //console.log(bi)

    result[i] = bi;

  }
  console.log(result)
  return result;
}


function RSA_Dedoce(s, d, n) {
  console.log(s)
  var result = "";

  var bi;

  for (var i = 0; i < s.length; i++) {
    bi = s[i].charCodeAt(0);
    console.log(bi)

    //bi = Math.pow(bi, d)%n;
    bi = modpow(bi, d, n);


    //bi = bi % n;
    console.log(bi)

    result += String.fromCharCode(bi);

  }

  return result;
}



function Calculate_d(e, m) {
  var d = 10;
  while (true) {
    if ((d * e) % m == 1)
      break;
    else
      d++;
  }
  return d;
}

function modpow(a, d, n) {
  var res = 1;
  while (d)
    if (d & 1) {
      res = (res * a) % n;
      --d;
    }
  else {
    a = (a * a) % n;
    d >>= 1;
  }
  return res;
}


function toggleSection(toBeToggled) {
	var section;
	
	section = document.getElementById("lab1");
	section.style.display = "none";
	section = document.getElementById("lab2");
	section.style.display = "none";
	
	section = document.getElementById(toBeToggled);
	section.style.display = "block";
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
