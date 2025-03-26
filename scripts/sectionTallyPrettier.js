function attributesHelper(element, attributes) {
	for (let key in attributes) {
		element.setAttribute(key, attributes[key]);
	}
}

function submitSearchForm() {
	// Get the form
	const form = document.querySelector("form.print");

	// Create a hidden input for Search if it doesn't exist
	let searchInput = form.querySelector('input[name="Search"][type="hidden"]');
	if (!searchInput) {
		searchInput = document.createElement('input');
		searchInput.type = 'hidden';
		searchInput.name = 'Search';
		searchInput.value = 'Search';
		form.prepend(searchInput);
	} else {
		searchInput.value = 'Search';
	}

	// Submit the form
	form.submit();
}

function addSelect2s() {
	// Get all the select elements
	const selects = document.querySelectorAll('select');

	// Add select2 to each select element
	selects.forEach(select => {
		if(select.id === 'seasonSelector')
			$(select).select2({width: '8em'});
		else
			$(select).select2({
				width: '32em'
			});
	});
}

function addSemesterInput() {
	// Remove existing change term button
	document.querySelector('div form').remove();

	// Create season selector
	const seasonSelector = document.createElement('select');
	seasonSelector.setAttribute('id', 'seasonSelector');
	seasonSelector.innerHTML = `
		<option value="10">Winter</option>
		<option value="20">Spring</option>
		<option value="30">Summer</option>
		<option selected value="40">Fall</option>
	`;
	seasonSelector.onchange = updateSemester;

	// Get the current set year
	let year = document.querySelectorAll('form.print input[name="term"]')[0].value.substring(0, 4);

	// Create the year input
	const yearInput = document.createElement('input');
	attributesHelper(yearInput, {
		'type': 'text',
		'id': 'yearInput',
		'value': year,
		'placeholder': 'Enter year'
	});
	yearInput.onchange = updateSemester;

	// Create term change button
	const changeButton = document.createElement('button');
	attributesHelper(changeButton, {
		'id': 'changeButton',
	});
	changeButton.innerText = 'Change Semester';
	changeButton.addEventListener('click', submitSearchForm);

	// Create semester input div
	const semesterInputDiv = document.createElement('div');
	attributesHelper(semesterInputDiv, {
		'id': 'semesterInputDiv',
		'style': 'margin-bottom: 10px;'
	});
	semesterInputDiv.append(seasonSelector, yearInput, changeButton);

	// Get form table
	const tableBody = document.querySelectorAll('form.print')[0];
	tableBody.prepend(semesterInputDiv);
}

function updateSemester() {
	// Get the season and year
	const season = document.getElementById('seasonSelector').value;
	const year = document.getElementById('yearInput').value;

	// Submit the new form
	const termInput = document.querySelectorAll('form.print input[name="term"]')[0];
	termInput.value = year + season;
}

function deleteColumns() {
    // Get the second table on the page
    const table = document.querySelectorAll('table')[1];
	table.style.width = "100%";

    // Get the header row
    const headerRow = table.querySelector('thead tr');

    // The column titles we want to delete
    const columnsToDelete = [
        'Part of Term',
        'Campus',
        'Max',
        'MaxResv',
        'LeftResv',
        'WaitCap',
        'WaitCount',
        'WaitAvail',
        'Room Cap'
    ];

    // Loop through the header cells and identify the indices of the columns to delete
    const columnIndicesToDelete = [];
    Array.from(headerRow.cells).forEach( (cell, index) => {
        if (columnsToDelete.includes(cell.getAttribute('title')))
            columnIndicesToDelete.push(index);
    });

    columnIndicesToDelete.reverse();

    // Loop through each row in the table (including the header)
    Array.from(table.rows).forEach(row => {
        // Skip empty rows or rows with only empty cells
        if (row.cells.length === 0 || (row.cells.length === 1 && row.cells[0].getAttribute('colspan') === '0')) {
            return;
        }

        // Delete the columns by their index
        columnIndicesToDelete.forEach(index => {
            row.deleteCell(index);
        });
    });
}

try {
	addSemesterInput();
} catch (e) {
	console.log('Failed to add semester input:\n', e);
}

try {
	addSelect2s();
} catch (e) {
	console.log('Failed to setup select2s:\n', e);
}

try {
	deleteColumns();
} catch (e) {
	console.log('Failed to delete columns:\n', e);
}
