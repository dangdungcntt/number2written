var mangso = ['không','một','hai','ba','bốn','năm','sáu','bảy','tám','chín'];

const hangChuc = (so, daydu) => {
	let str = "";
	let chuc = Math.floor(so/10);
	let donvi = so%10;

	if (chuc > 1) {
		str = " " + mangso[chuc] + " mươi";
		if (donvi == 1) {
			str += " mốt";
		}
	} else if (chuc == 1) {
		str = " mười";
		if (donvi == 1) {
			str += " một";
		}
	} else if (daydu && donvi>0) {
		str = " lẻ";
	}

	if (donvi == 5 && chuc >= 1) {
		str += " lăm";
	} else if (donvi > 1 || (donvi == 1 && chuc == 0)) {
		str += " " + mangso[donvi];
	}
	return str;
}

const docBlock = (so,daydu) => {
	let str = "";
	let tram = Math.floor(so/100);
	so = so%100;

	if (daydu || tram > 0) {
		str = " " + mangso[tram] + " trăm";
		str += hangChuc(so,true);
	} else {
		str = hangChuc(so,false);
	}
	return str;
}

const hangTrieu = (so,daydu) => {
	let str = "";
	let trieu = Math.floor(so/1000000);
	so = so%1000000;
	if (trieu > 0) {
		str = docBlock(trieu,daydu) + " triệu";
		daydu = true;
	}
	let nghin = Math.floor(so/1000);
	so = so%1000;
	if (nghin > 0) {
		str += docBlock(nghin,daydu) + " nghìn";
		daydu = true;
	}
	if (so > 0) {
		str += docBlock(so,daydu);
	}
	return str;
}

module.exports = (so) => {

	if (isNaN(so)) throw Error('Input must be a number');

    if (so == 0) return mangso[0];

	let str = "", hauto = "";
	do {
		ty = so%1000000000;
		so = Math.floor(so/1000000000);
		if (so>0) {
			str = hangTrieu(ty,true) + hauto + str;
		} else {
			str = hangTrieu(ty,false) + hauto + str;
		}
		hauto = " tỷ";
	} while (so > 0);

	return str.trim();
}