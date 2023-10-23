let addHeader = document.querySelector('#addHeader');
let addContent = document.querySelector('#addContent');

function renderData() {
    let str = '';
    data.forEach(function (item) {
        str +=
            `
        <li class="col mb-5">
            <div class="card p-3">
                <h3>${item.name}</h3>
                <p class="text-truncate" style="max-width: 270px;">${item.description}</p>
                <a href="adminSeeMore.html?id=${item.id}" class="btn btn-primary w-50">查看更多</a>
            </div>
        </li>
        `
    });
    list.innerHTML = str;
};

init();

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
admin.addEventListener('click',function(){
    location.href='admin.html';
});

// 登出
logOutF();