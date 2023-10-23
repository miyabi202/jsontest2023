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