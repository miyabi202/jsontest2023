// 前台
let bookmark = document.querySelector('.bookmark');
let sight = document.querySelector('.sight');
let list = document.querySelector('.sightList');
let content = document.querySelector('.txt');
let bookmarkList = document.querySelector('.bookmarkList');

// 後台
let logo = document.querySelector('.logo');
let backStage = document.querySelector('.backStage');
let addSight = document.querySelector('.addSight');
let admin = document.querySelector('.admin');
let tbody = document.querySelector('.tbody');
let inputContent = document.querySelector('.input-content');
let addBtn = document.querySelector('.addBtn');

// 共用
let logOut = document.querySelector('.logOut');

// 存好存滿資料的陣列
let data = [];
let collectData = [];

// 初始化資料
function init() {
    axios.get(`https://nini-json-server.onrender.com/views`)
        .then(function (response) {
            data = response.data;
            renderData();
        });
};

// 渲染資料卡
function renderData() {
    let str = '';
    data.forEach(function (item) {
        str +=
            `
        <li class="col">
            <div class="card p-3">
                <h3>${item.name}</h3>
                <p class="text-truncate" style="max-width: 270px;">${item.description}</p>
                <a href="seeMore.html?id=${item.id}" class="btn btn-primary w-50">查看更多</a>
            </div>
        </li>
        `
    });
    list.innerHTML = str;
};

// 隱藏景點列表
function hideSightContent() {
    bookmark.addEventListener('click', function (e) {
        sight.classList.add('d-none');
    });
};

// 收藏資料卡
function collected() {
    axios.get(`https://nini-json-server.onrender.com/600/users/${localStorage.getItem('SignUpId')}/collects`, {
        headers: {
            authorization: `Bearer ${localStorage.getItem('SignUpToken')}`
        }
    })
        .then(function (response) {
            collectData = response.data;
            renderCollectData();
        })
        .catch(function (error) {
            console.log(error.response);
        })
};

// 渲染收藏的資料卡
function renderCollectData() {
    let str = '';
    collectData.forEach(function (item) {
        str +=
            `
        <li class="col">
            <div class="card p-3">
                <h3>${item.name}</h3>
                <p class="text-truncate" style="max-width: 270px;">${item.description}</p>
                <a href="#" class="btn btn-primary w-50 infoCollected" data-num=${item.id}>已收藏</a>
            </div>
        </li>
        `
    });
    bookmarkList.innerHTML = str;
};

// 取消收藏
function cancelCollect() {
    bookmarkList.addEventListener('click', function (e) {
        if (e.target.classList.contains('infoCollected')) {
            e.preventDefault();
            alert('已刪除!')
        };
        let num = e.target.getAttribute('data-num');
        axios.delete(`https://nini-json-server.onrender.com/600/collects/${num}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('SignUpToken')}`
            }
        })
            .then(function (response) {
                console.log(response);
                collected();
            })
            .catch(function (error) {
                console.log(error.response);
            });
    });
};

// 回到後台
function tableData() {
    axios.get('https://nini-json-server.onrender.com/views')
        .then(function (response) {
            data = response.data;
            renderTableData();
        });
};

function renderTableData() {
    let str = '';
    data.forEach(function (item) {
        str +=
            `
            <tr>
                <th scope="row">${item.id}</th>
                <td>${item.name}</td>
                <td class="w-75">${item.description}</td>
                <td>
                    <a href="edit.html?id=${item.id}" class="edit">編輯</a>
                    <a href="#" class="link-danger" data-num="${item.id}">刪除</a>
                </td>
            </tr>
        `
    });
    tbody.innerHTML = str;
};

// 新增景點
function addSightBtn() {
    addBtn.addEventListener('click', function (e) {
        e.preventDefault();
        if (addHeader.value !== '' || addContent.value !== '') {
            axios.post(`https://nini-json-server.onrender.com/views`, {
                "name": addHeader.value,
                "description": addContent.value
            })
                .then(function (response) {
                    console.log(response);
                    alert('新增成功!');
                    addHeader.value = '';
                    addContent.value = '';
                })
                .catch(function (error) {
                    console.log(error.response);
                });
        };
    });
};

// 刪除景點
function deleteSightF() {
    tbody.addEventListener('click', function (e) {
        if (e.target.classList.contains('delete')) {
            e.preventDefault();
            alert('已刪除!');
        };
        let num = e.target.getAttribute('data-num');
        axios.delete(`https://nini-json-server.onrender.com/views/${num}`)
            .then(function (response) {
                console.log(response);
                alert('已刪除!');
                tableData();
            })
            .catch(function (error) {
                console.log(error.response);
            });
    });
};

// 清除Localstorage
function clearLocalstorage() {
    localStorage.clear();
};

// 登出
function logOutF() {
    logOut.addEventListener('click', function () {
        alert('已登出!');
        clearLocalstorage();
        location.href = 'logOut.html';
    });
};

// 登出後檢查權限
function checkPermission() {
    // 檢查 localStorage 或其他權限相關的資訊
    let isLoggedIn = Boolean(localStorage.getItem('SignUpToken'));
    if (!isLoggedIn) {
        alert('您沒有權限進入!');
        window.location.href = 'index.html';
    }else{
        let adminContent = document.querySelector('.admin-content');
        adminContent.classList.remove('d-none');
        adminContent.classList.add('d-block');
    };
};

// 在 admin.html 頁面載入時檢查權限
if (window.location.pathname.includes('/admin.html')) {
    checkPermission();
};

// 個人測試用 
function deleteUser(num) {
    axios.delete(`https://nini-json-server.onrender.com/users/${num}`)
        .then(function (response) {
            console.log(response.data);
        })
        .catch(function (error) {
            console.log(error.response);
        });
    clearLocalstorage();
}