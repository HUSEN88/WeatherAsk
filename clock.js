var clock = setInterval(dayMonth,1000);




function dayMonth(){
	var d = new Date();
	var dayofweek = ['Sun','Mon','Tue','Wed','Thur','Fri','Sat'];
	var day = dayofweek[d.getDay()];
	var date = d.toLocaleDateString();
	document.getElementById('dayMonth').innerHTML = `${day}, ${date}`;
}
