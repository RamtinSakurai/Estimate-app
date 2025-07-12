
document.addEventListener("DOMContentLoaded", function () {
  for (let i = 0; i < 7; i++) {
    add();
  }
});
function add(){
    const table =document.getElementById("itemTable").getElementsByTagName("tbody")[0];
    const row = table.insertRow();

    for(let i=0; i<4; i++){
        const cell = row.insertCell();

        if( i === 0 )cell.innerHTML = '<input type="text" placeholder="品目">';
        else if( i === 1 )cell.innerHTML = '<input type="number" min = "0" value ="0" oninput="updateTotal()">';
        else if( i === 2 )cell.innerHTML = '<input type="number" min ="0" value="0" oninput = "updateTotal()"> ';
        else if (i === 3) cell.innerHTML = '<span>0円</span>';
    }
    
    const deleteCell = row.insertCell();
    deleteCell.className = "delete-cell";
    deleteCell.innerHTML = '<button  class = "no-print"onclick  = "deleteRow(this)">ー</button>'
}

function updateTotal(){
    const table = document.getElementById("itemTable").getElementsByTagName("tbody")[0];
    let total = 0;

    for(let row of table.rows){
        
        const kazu  = parseFloat(row.cells[1].children[0].value) || 0;
        const price   = parseFloat(row.cells[2].children[0].value || 0);
        const subtotal = kazu * price;
        
        row.cells[3].innerText=`${subtotal.toLocaleString()}円`;
        total += subtotal;

    }

    const tax = Math.floor(total * 0.1);
    document.getElementById("nototalAmount").innerText = `${total.toLocaleString()}円`;
    document.getElementById("taxAmount").innerText = `${tax.toLocaleString()}円`;
    document.getElementById("maintotalAmount").innerText = `${Math.floor(total * 1.1).toLocaleString()}円`;
    document.getElementById("totalAmount").innerText = `${Math.floor(total * 1.1).toLocaleString()}円`;

}

function deleteRow(button){
    const row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
    updateTotal();

}

function generatePDF() {
  const element = document.getElementById("main");
  const header = document.querySelector("header");

  
  header.style.display = "none";

  const opt = {
    
    filename: '見積書.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    pagebreak: { mode: ['css', 'legacy'] }
  };

  html2pdf().set(opt).from(element).save().then(() => {
    
    header.style.display = "";
  });
}

function downloadImage() {
   
    var htmlBody = document.body;
    var btn1 = document.getElementById('btn1');
   
    htmlBody.classList.add('a4');
    btn1.classList.add('print-off');
    
    html2canvas(document.getElementById('target')).then(function(canvas) {
    savePdf(canvas);
    });
   
    btn1.classList.remove('print-off');
    htmlBody.classList.remove('a4')
}

function savePdf(data) {
    var dataURI = data.toDataURL();
    var pdf = new jsPDF('l', 'pt', 'a4', false);
    var width = pdf.internal.pageSize.width;
    var height = pdf.internal.pageSize.height;
    pdf.addImage(data, 'JPEG', 0, 0, width, height);
    pdf.save('保存名.pdf')
}
