let editHeader = document.querySelector('#editHeader');
let editContent = document.querySelector('#editContent');
let editBtn = document.querySelector('.editBtn');
let id = location.href.split('=')[1];

function editData() {
    axios.get(`https://nini-json-server.onrender.com/views/${id}`)
        .then(function (response) {
            editHeader.value = JSON.stringify(response.data.name).replace(/^"(.*)"$/, '$1');
            editContent.value = JSON.stringify(response.data.description).replace(/^"(.*)"$/, '$1');
        })
        .catch(function (error) {
            console.log(error.response);
        })
};
editData();

editBtn.addEventListener('click', function (e) {
    e.preventDefault();
    if (editHeader.value !== '' || editContent.value !== '') {
        axios.patch(`https://nini-json-server.onrender.com/views/${id}`, {
            "name": editHeader.value,
            "description": editContent.value
        })
            .then(function (response) {
                console.log(response);
                alert('修改成功!');
            })
            .catch(function (error) {
                console.log(error.response);
            });
    }
});

// 回到後台
backStage.addEventListener('click', function () {
    logo.textContent = '後台';
    inputContent.classList.add('d-none');
    tableData();
});

// 新增景點
addSight.addEventListener('click', function () {
    logo.textContent = '後台';
    inputContent.classList.add('d-none');
});

addSightBtn();

// 刪除景點
deleteSightF();

// 回到首頁
admin.addEventListener('click', function () {
    location.href = 'admin.html';
})

// 登出
logOutF();