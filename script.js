function add(){
    const table =document.getElementById("itemTable").getElementsByTagName("tbody")[0];
    const row = table.insertRow();

    for(let i=0; i<5; i++){
        const cell = row.insertCell();

        if( i === 0 )cell.innerHTML = '<input type="text" placeholder="品目">';
        else if( i === 1 )cell.innerHTML = '<input type="number" min = "0" value ="0" oninput="updateTotal()">';
        else if( i === 2 )cell.innerHTML = '<input type="number" min ="0" value="0" oninput = "updateTotal()"> ';
        else if( i === 3 )cell.innerHTML = '<input type="text" placeholder="個・式・m2">'  ;
        else if (i === 4) cell.innerHTML = '<span>0円</span>';
    }
    
    const deleteCell = row.insertCell();
    deleteCell.innerHTML = '<button  class = "no-print"onclick  = "deleteRow(this)">削除</button>'
}

function updateTotal(){
    const table = document.getElementById("itemTable").getElementsByTagName("tbody")[0];
    let total = 0;

    for(let row of table.rows){
        
        const kazu  = parseFloat(row.cells[2].children[0].value) || 0;
        const price   = parseFloat(row.cells[1].children[0].value || 0);
        const subtotal = kazu * price;
        row.cells[4].innerText=`${subtotal.toLocaleString()}円`;
        total += subtotal;

    }
   
    document.getElementById("totalAmount").innerText = `${(total * 1.1).toLocaleString()}円`;

}

function deleteRow(button){
    const row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
    updateTotal();

}

function generatePDF() {
    const element = document.getElementById("main");
    const opt = {
      margin: [20, 20, 20, 20], // 上, 右, 下, 左（mm）
      filename: '見積書.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).save();
  }