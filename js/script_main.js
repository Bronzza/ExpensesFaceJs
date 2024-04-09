// const homeUrl = "http://192.168.1.2:8080/rest/home";
const authUrl = "http://localhost:8080/rest/home";
const expanseUrl = "http://localhost:8080/expanse";
const reportByCategoryUrl = "http://localhost:8080/report/category";
const reportDaysExpansesUrl = "http://localhost:8080/report/daystotal";
const reportLastExpansesUrl = "http://localhost:8080/expanse/lastten2";
const ipAndPort = "http://localhost:8848";
const getAllCategoriesSubCategoriesUrl = "http://localhost:8080/category";
let aCategorySubcut;
let doughnutCtx;
let doughnut;
let barChartCtx;
let barChart;


window.addEventListener('load', makeMainPageRequest, true);
window.addEventListener('load', createDoughnutChart, true);
window.addEventListener('load', createBarChart, true);
let saveExpance = document.getElementById("expanse_save");
saveExpance.addEventListener('click', saveExpanse, true);

function createRequest(sRequestType, sUrl, isAsync, oParams) {
	const xhr = new XMLHttpRequest();

	let url = (typeof oParams!== 'undefined') ? sUrl + formatParams(oParams) : sUrl;

	
	const token = localStorage.getItem("bearer_token");
	xhr.open(sRequestType, url, isAsync);
	xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
	xhr.setRequestHeader( "Authorization", "Bearer " + token);
	xhr.setRequestHeader('Access-Control-Allow-Origin', ipAndPort);
	xhr.setRequestHeader('Access-Control-Allow-Credentials', 'true');
	xhr.setRequestHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, HEAD');
	return xhr;
}

function formatParams(params){
	return "?" + Object.keys(params)
		  .map(function(key){
			return key+"="+encodeURIComponent(params[key])
		  })
		  .join("&");
  }


function makeMainPageRequest() {
	makeAuthRequest();
	makeLastTenExpansesRequest();
}

function makeAuthRequest() {
	const xhr = createRequest("GET", authUrl, true);

	xhr.onload = () => {
		if (xhr.readyState == 4 && xhr.status == 200) {
			let response = xhr.responseText;
			console.log(response);

			document.getElementById("result_block").innerHTML = response;
			document.getElementById("result_block").style.display = 'block';
			
		} else {
			 console.log(`Error: ${xhr.status}`);
			 document.getElementById("result_block").innerHTML = 'Fuck you, go to log in page'
		}
	};
	xhr.send();
}

function makeLastTenExpansesRequest() {
	const xhr = createRequest("GET", reportLastExpansesUrl, true);

	xhr.onload = () => {
		if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 300)) {
			let resp = JSON.parse(xhr.response);
			console.log(resp);
			buildHtmlStructLatestExpanses(resp);
		} else {
			 console.log(`Error: ${xhr.status}`);
		}
	};
	xhr.send();
}

function buildHtmlStructLatestExpanses(arr) {
	for (let i=0; i < arr.length; i++) {
		let currentObj = arr[i];
		
		let oColumnRow = document.getElementById('columns__row');

		let div_columns__column = document.createElement('div');
		div_columns__column.setAttribute('class', 'columns__column');
		// oColumnRow.appendChild(div_columns__column);

		// //columns__item
		// let div_columns__item = document.createElement('div');
		// div_columns__item.setAttribute('class', 'columns__item item');
		// //item__icon_name
		// let div_item__icon_name = document.createElement('div');
		// div_item__icon_name.setAttribute('class', 'item__icon_name');
		
		// //item__icon
		// let div_item__icon = document.createElement('div');
		// div_item__icon.setAttribute('class', 'item__icon');
		// div_item__icon.innerHTML = '&&';
		// //item__name
		// let item__name = document.createElement('div');
		// item__name.setAttribute('class', 'item__name');
		// item__name.innerHTML = currentObj.categoryName;

		// let item__name_sb = document.createElement('div');
		// item__name_sb.setAttribute('class', 'item__name');
		// item__name_sb.innerHTML = currentObj.subCategoryName;
		// //set item__icon_name with values
		// div_item__icon_name.appendChild(div_item__icon);
		// div_item__icon_name.appendChild(item__name);
		// div_item__icon_name.appendChild(item__name_sb);

		// let item__date_amount = document.createElement('div');
		// item__date_amount.setAttribute('class', 'item__date_amount');

		// let item__date = document.createElement('div');
		// item__date.setAttribute('class', 'item__date');
		// item__date.innerHTML = currentObj.date;

		// let item__amount = document.createElement('div');
		// item__amount.setAttribute('class', 'item__amount');
		// item__amount.innerHTML = currentObj.amount;
		// //set item__date_amount with values
		// item__date_amount.appendChild(item__date);
		// item__date_amount.appendChild(item__amount);

		// div_columns__item.appendChild(div_item__icon_name);
		// div_columns__item.appendChild(item__date_amount);
//
		oColumnRow.appendChild(createColumnsColumn(currentObj));
	}
}

function createColumnsColumn(oDataObject) {
	//columns__column
	let div_columns__column = document.createElement('div');
	div_columns__column.setAttribute('class', 'columns__column');
	//columns__item
	let div_columns__item = document.createElement('div');
	div_columns__item.setAttribute('class', 'columns__item item');
	//item__icon_name
	let div_item__icon_name = document.createElement('div');
	div_item__icon_name.setAttribute('class', 'item__icon_name');
	
	//item__icon
	let div_item__icon = document.createElement('div');
	div_item__icon.setAttribute('class', 'item__icon');
	div_item__icon.innerHTML = '&&';
	//item__name
	let item__name = document.createElement('div');
	item__name.setAttribute('class', 'item__name');
	item__name.innerHTML = oDataObject.categoryName;

	let item__name_sb = document.createElement('div');
	item__name_sb.setAttribute('class', 'item__name');
	item__name_sb.innerHTML = oDataObject.subCategoryName;
	//set item__icon_name with values
	div_item__icon_name.appendChild(div_item__icon);
	div_item__icon_name.appendChild(item__name);
	div_item__icon_name.appendChild(item__name_sb);

	let item__date_amount = document.createElement('div');
	item__date_amount.setAttribute('class', 'item__date_amount');

	let item__date = document.createElement('div');
	item__date.setAttribute('class', 'item__date');
	item__date.innerHTML = oDataObject.date;

	let item__amount = document.createElement('div');
	item__amount.setAttribute('class', 'item__amount');
	item__amount.innerHTML = oDataObject.amount;
	//set item__date_amount with values
	item__date_amount.appendChild(item__date);
	item__date_amount.appendChild(item__amount);

	div_columns__item.appendChild(div_item__icon_name);
	div_columns__item.appendChild(item__date_amount);

	div_columns__column.appendChild(div_columns__item)
	return div_columns__column;
}


function reportRequestGet(sUrl) {
	let res;
	let oParams;
	if (sUrl === reportByCategoryUrl) {
		oParams =  {
			startDate: getFirstOrLastDayOfMonth(true), 
			endDate: getFirstOrLastDayOfMonth(false)
		  }
	} else if (sUrl === reportDaysExpansesUrl) {
		oParams =  {
			startDate: getDateNdaysBeforeCurent(9), 
			endDate: formatDate(new Date())
		  }
	}
	const xhr = createRequest("GET", sUrl, false, oParams);

	xhr.onload = () => {
		if (xhr.readyState == 4 && xhr.status == 200) {
			res = JSON.parse(xhr.response);
			
		} else {
			 console.log(`Error: ${xhr.status}`);
		}
	};
	xhr.send();
	return res;
}

function getDateNdaysBeforeCurent(nNumberOfDaysRetrospectively) {
	return formatDate(new Date(new Date(). getTime() - nNumberOfDaysRetrospectively * 24 * 60 * 60 * 1000))
}

function getFirstOrLastDayOfMonth(bIsFirst) {
	return bIsFirst
		? formatDate (firstDateOfMonth(new Date())) 
		: formatDate (lastDateOfMonth(new Date()));
}

function formatDate(date) {
		const yyyy = date.getFullYear();
		let mm = date.getMonth()+1; 
		let dd = date.getDate();
	
		if (dd < 10) {
			dd = '0' + dd;
		}
		if (mm < 10) {
			mm = '0' + mm;
		}
	
		return dd + '/' + mm + '/' + yyyy;
}

const firstDateOfMonth = (date = new Date()) =>
  new Date(date.getFullYear(), date.getMonth(), 1);

const lastDateOfMonth = (date = new Date()) =>
  new Date(date.getFullYear(), date.getMonth() + 1, 0);

  // chart doughnut

function createDoughnutChart() {

	const DataObject = reportRequestGet(reportByCategoryUrl);

	doughnutCtx = document.getElementById('doughnut').getContext('2d');
	doughnut = new Chart(doughnutCtx, {
		type: 'doughnut',
		data: {
			labels: Object.keys(DataObject),
			datasets: [{
				label: 'Bath',
				data: Object.values(DataObject),
				backgroundColor: [
					'rgba(255, 99, 132, 0.2)',
					'rgba(54, 162, 235, 0.2)',
					'rgba(255, 206, 86, 0.2)',
					'rgba(75, 192, 192, 0.2)',
					'rgba(153, 102, 255, 0.2)',
					'rgba(255, 159, 64, 0.2)',
	
					'rgba(240, 99, 132, 0.4)',
					'rgba(54, 162, 205, 0.4)',
					'rgba(255, 106, 86, 0.4)',
					'rgba(35, 192, 192, 0.4)',
					'rgba(153, 102, 155, 0.4)',
					'rgba(240, 159, 84, 0.4)'
				],
				borderColor: [
					'rgba(255, 99, 132, 1)',
					'rgba(54, 162, 235, 1)',
					'rgba(255, 206, 86, 1)',
					'rgba(75, 192, 192, 1)',
					'rgba(153, 102, 255, 1)',
					'rgba(255, 159, 64, 1)',
	
					'rgba(240, 99, 132, 0.4)',
					'rgba(54, 162, 205, 0.4)',
					'rgba(255, 106, 86, 0.4)',
					'rgba(35, 192, 192, 0.4)',
					'rgba(153, 102, 155, 0.4)',
					'rgba(240, 159, 84, 0.4)'
				],
				borderWidth: 1
			}]
		},
		options: {
		}
	});
}

  // bar chart

function createBarChart() {

const DataObject = reportRequestGet(reportDaysExpansesUrl);

barChartCtx = document.getElementById('barChart').getContext('2d');
	barChart = new Chart(barChartCtx, {
		type: 'bar',
		data: {
			labels: Object.keys(DataObject),
			datasets: [{
				label: 'Bath',
				data: Object.values(DataObject),
				backgroundColor: [
					'rgba(255, 99, 132, 0.2)',
					'rgba(54, 162, 235, 0.2)',
					'rgba(255, 206, 86, 0.2)',
					'rgba(75, 192, 192, 0.2)',
					'rgba(153, 102, 255, 0.2)',
					'rgba(255, 159, 64, 0.2)',
					
					'rgba(240, 99, 132, 0.4)',
					'rgba(54, 102, 235, 0.4)',
					'rgba(255, 106, 86, 0.4)',
					'rgba(75, 102, 192, 0.4)',
					'rgba(153, 202, 255, 0.4)',
					'rgba(255, 59, 64, 0.4)'
				],
				borderColor: [
					'rgba(255, 99, 132, 1)',
					'rgba(54, 162, 235, 1)',
					'rgba(255, 206, 86, 1)',
					'rgba(75, 192, 192, 1)',
					'rgba(153, 102, 255, 1)',
					'rgba(255, 159, 64, 1)',
					
					'rgba(240, 99, 132, 0.4)',
					'rgba(54, 102, 235, 0.4)',
					'rgba(255, 106, 86, 0.4)',
					'rgba(75, 102, 192, 0.4)',
					'rgba(153, 202, 255, 0.4)',
					'rgba(255, 59, 64, 0.4)'
				],
				borderWidth: 1
			}]
		},
		options: {
			scales: {
				y: {
					beginAtZero: true
				}
			}
		}
	});
}

function addData(chart, label, newData) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(newData);
    });
    chart.update();
}

function removeData(chart) {
    chart.data.labels.pop();
    chart.data.datasets.forEach((dataset) => {
        dataset.data.pop();
    });
    chart.update();
}

//   Popup add cateogry
const openModalButtons = document.querySelectorAll('[data-modal-target]')
const closeModalButtons = document.querySelectorAll('[data-close-button]')
const overlay = document.getElementById('overlay')

openModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = document.querySelector(button.dataset.modalTarget)
    openModal(modal)
  })
})

overlay.addEventListener('click', closeAllPopups)

function closeAllPopups() {
	const popups = document.querySelectorAll('.popup.active')
	popups.forEach(popup => {
	  closeModal(popup)
	})
}

closeModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const popup = button.closest('.popup')
    closeModal(popup)
  })
})

function openModal(popup) {
  if (popup == null) return
  if (popup.id === "popup_new_expanse") {
    const xhr = createRequest("GET", getAllCategoriesSubCategoriesUrl, false);

	xhr.onload = () => {
		if (xhr.readyState == 4 && xhr.status == 200) {
			aCategorySubcut = JSON.parse(xhr.response);
			console.log(aCategorySubcut);
		} else {
			 console.log(`Error: ${xhr.status}`);
		}
	};
	xhr.send();

	let categorySelect = setOptionstoSelect(document.getElementById("category"), aCategorySubcut);
	reArrangeSubCat();
	categorySelect.addEventListener('change', reArrangeSubCat);
	categorySelect.dispatchEvent(new Event('change'))
	}
	

  popup.classList.add('active')
  overlay.classList.add('active')
}

function cleanInputsNewExpanse() {
	removeOptions(document.getElementById("category"));
	removeOptions(document.getElementById("subcategory"));
	document.getElementById("date").value = '';
	document.getElementById("amount").value = '';
	document.getElementById("description").value = '';
}

function reArrangeSubCat() {
	let subcategorySelect = document.getElementById("subcategory")
	removeOptions(subcategorySelect);
	aCategorySubcut.forEach((element) => {
		if (element.id == this.value) {
			setOptionstoSelect(subcategorySelect, element.subCategoryList)
		}
	});
}

function setOptionstoSelect(selectToModify, arrayValues) {
	arrayValues.forEach((element) => {
		opt = document.createElement("option");
		opt.value = element.id;
		opt.textContent = element.name;
		selectToModify.appendChild(opt);
	});

	return selectToModify;
}

function removeOptions(comboBox) {
    while (comboBox.options.length > 0) {                
        comboBox.remove(0);
    }        
}

function closeModal(popup) {
  if (popup == null) return
  cleanInputsNewExpanse();
  popup.classList.remove('active')
  overlay.classList.remove('active')
}

function saveExpanse() {
	let payload = createPayloadNewExpanse();

	const xhr = createRequest("POST", expanseUrl, true);
	
	xhr.onload = () => {
		if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 300)) {
			response = JSON.parse(xhr.response);
			console.log(response);
			closeAllPopups();
			//update list (with highlight last entry for a few seconds)
		} else {
			 console.log(`Error: ${xhr.status}`);
		}
	};
	xhr.send(JSON.stringify(payload));

	updateChart(barChart);
	updateChart(doughnut);
	//add last created expanse as first and remove last one
	debugger;
	let oColumnRow = document.getElementById('columns__row');
	let collection = document.getElementsByClassName("columns__column");
	oColumnRow.prepend(createColumnsColumn(payload));
	let sorted = Array.from(collection).sort((a,b) => Date.parse(b.firstChild.children[1].firstChild.innerHTML) - Date.parse(a.firstChild.children[1].firstChild.innerHTML));
	//remove last element from collection;
	oColumnRow.appendChild(sorted);
	//show blinking effect
}



function updateChart(chart) {
	let DataObj;
	if (chart === barChart) {
		DataObj = reportRequestGet(reportDaysExpansesUrl);
	} else if (chart === doughnut) {
		DataObj = reportRequestGet(reportByCategoryUrl);
	}

	chart.config.data.datasets[0].data = Object.values(DataObj);
	chart.config.data.labes = Object.keys(DataObj);
	chart.update();
}

function createPayloadNewExpanse() {
	let sDateValue = document.getElementById("date").value;

	let payload = {
		categoryId: document.getElementById("category").value,
		subCategoryId: document.getElementById("subcategory").value,
		date: formatDate(new Date(sDateValue.slice(0,4),
		sDateValue.slice(5,7) - 1, sDateValue.slice(8))),
		amount: document.getElementById("amount").value,
		description: document.getElementById("description").value,
		categoryName: getSelectedOptionText(document.getElementById("category")),
		subCategoryName: getSelectedOptionText(document.getElementById("subcategory"))
	};

	return payload;

}

function getSelectedOptionText(element) {
    return element.options[element.selectedIndex].text;
}
