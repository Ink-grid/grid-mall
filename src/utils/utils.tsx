/** @format */
function formatMoney(
	amount: any,
	decimalCount = 2,
	decimal = '.',
	thousands = ','
) {
	try {
		decimalCount = Math.abs(decimalCount);
		decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

		const negativeSign = amount < 0 ? '-' : '';

		let i: any = parseInt(
			(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount))
		).toString();
		let j = i.length > 3 ? i.length % 3 : 0;

		return (
			negativeSign +
			(j ? i.substr(0, j) + thousands : '') +
			i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousands) +
			(decimalCount
				? decimal +
				  Math.abs(amount - i)
						.toFixed(decimalCount)
						.slice(2)
				: '')
		);
	} catch (e) {
		console.log(e);
	}
}

function validar_clave(contrasenna: string) {
	if (contrasenna.length >= 6) {
		var mayuscula = false;
		var minuscula = false;
		var numero = false;
		var caracter_raro = false;

		for (var i = 0; i < contrasenna.length; i++) {
			if (contrasenna.charCodeAt(i) >= 65 && contrasenna.charCodeAt(i) <= 90) {
				mayuscula = true;
			} else if (
				contrasenna.charCodeAt(i) >= 97 &&
				contrasenna.charCodeAt(i) <= 122
			) {
				minuscula = true;
			} else if (
				contrasenna.charCodeAt(i) >= 48 &&
				contrasenna.charCodeAt(i) <= 57
			) {
				numero = true;
			} else {
				caracter_raro = true;
			}
		}
		if (
			mayuscula == true &&
			minuscula == true &&
			caracter_raro == true &&
			numero == true
		) {
			return true;
		}
	}
	return false;
}

export { validar_clave };

export default formatMoney;
