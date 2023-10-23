let id = location.href.split('=')[1];

// 渲染db.json
function showContent() {
    axios.get(`https://nini-json-server.onrender.com/views/${id}`)
        .then(function (response) {
            data = response.data;
            content.textContent = JSON.stringify(response.data);
        })
        .catch(function (error) {
            console.log(error.response);
        })
};
showContent();

// 回到後台
backStage.addEventListener('click', function () {
    logo.textContent = '後台';
    sight.classList.add('d-none');
    tableData();
});

// 新增景點
addSight.addEventListener('click', function () {
    logo.textContent = '後台';
    sight.classList.add('d-none');
});

addSightBtn();

// 刪除景點
deleteSightF();

// 回到首頁
admin.addEventListener('click', function () {
    location.href = 'admin.html';
});

// 登出
logOutF();