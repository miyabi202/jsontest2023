let collection = document.querySelector('.collection');
let id = location.href.split('=')[1];

// 渲染db.json
function showContent() {
    axios.get(`https://nini-json-server.onrender.com/views/${id}`)
        .then(function (response) {
            data = response.data;
            content.textContent = JSON.stringify(response.data);
            collected();
        })
        .catch(function (error) {
            console.log(error.response);
        })
};
showContent();

// 更改收藏狀態+收藏區增加收藏資訊卡
collection.addEventListener('click', function (e) {
    e.preventDefault();
    if (collection.textContent == '未收藏') {
        collection.textContent = '已收藏';
        // 收藏區增加資訊卡
        axios.post(`https://nini-json-server.onrender.com/600/users/${localStorage.getItem('SignUpId')}/collects`, {
            "id": data.id,
            "name": data.name,
            "description": data.description
        }, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('SignUpToken')}`
            }
        })
            .then(function (response) {
                console.log(response);
                collected();
            })
            .catch(function (error) {
				console.log(localStorage.getItem('SignUpId'));
                console.log(error.response);
            });
    } else {
        collection.textContent = '未收藏';
    }
});

// 隱藏景點內文
hideSightContent();

// 取消收藏的景點
cancelCollect();

// 登出
logOutF();