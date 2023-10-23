init();

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
                <a href="logOutSeeMore.html?=${item.id}" class="btn btn-primary w-50">查看更多</a>
            </div>
        </li>
        `
    });
    list.innerHTML = str;
};