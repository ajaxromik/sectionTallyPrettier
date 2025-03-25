function deleteColumns() {
    // Get the second table on the page
    const table = document.querySelectorAll('table')[1];
    // Index 1 refers to the second table

    // Get the header row (the first row in the <thead>)
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

deleteColumns();
