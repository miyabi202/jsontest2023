let signUpEmail = document.querySelector('.signUpEmail');
let signUpPassword = document.querySelector('.signUpPassword');
let signUpBtn = document.querySelector('.signUpBtn');
let loginEmail = document.querySelector('.loginEmail');
let loginPassword = document.querySelector('.loginPassword');
let loginBtn = document.querySelector('.loginBtn');

// 註冊
function signUp() {
    if (signUpEmail.value == 'admin@mail.com' && signUpPassword.value == '123123') {
        axios.post('https://nini-json-server.onrender.com/users', {
            "email": signUpEmail.value,
            "password": signUpPassword.value,
            "identity": 'admin'
        })
            .then(function (response) {
                console.log(response);
                localStorage.setItem('SignUpEmail', response.data.user.email);
                localStorage.setItem('SignUpToken', response.data.accessToken);
                localStorage.setItem('SignUpId', response.data.user.id);
                alert('註冊成功!');
                signUpEmail.value = '';
                signUpPassword.value = '';
            })
            .catch(function (error) {
                console.log(error.response);
            })
    } else {
        axios.post('https://nini-json-server.onrender.com/users', {
            "email": signUpEmail.value,
            "password": signUpPassword.value
        })
            .then(function (response) {
                console.log(response);
                localStorage.setItem('SignUpEmail', response.data.user.email);
                localStorage.setItem('SignUpToken', response.data.accessToken);
                localStorage.setItem('SignUpId', response.data.user.id);
                alert('註冊成功!');
                signUpEmail.value = '';
                signUpPassword.value = '';
            })
            .catch(function (error) {
                console.log(error.response);
            })
    }
};

signUpBtn.addEventListener('click', function () {
    if (signUpEmail.value.trim() == '' || signUpPassword.value.trim() == '') {
        alert('請輸入註冊資料!');
        return;
    }
    signUp();
});


// 登入
function login() {
    if (loginEmail.value == 'admin@mail.com' && loginPassword.value == '123123') {
        axios.post('https://nini-json-server.onrender.com/login', {
            "email": loginEmail.value,
            "password": loginPassword.value,
        })
            .then(function (response) {
                console.log(response);
                alert('登入成功!');
                location.href = `admin.html?id=${localStorage.getItem('SignUpId')}`;
            })
            .catch(function (error) {
                console.log(error.response);
                alert.log(error.response);
            })
    } else {
        axios.post('https://nini-json-server.onrender.com/login', {
            "email": loginEmail.value,
            "password": loginPassword.value
        })
            .then(function (response) {
                console.log(response);
                alert('登入成功!');
                location.href = `memberCenter.html?id=${localStorage.getItem('SignUpId')}`;
            })
            .catch(function (error) {
                console.log(error.response);
                alert.log(error.response);
            })
    }
};

loginBtn.addEventListener('click', function () {
    if (loginEmail.value.trim() == '' || loginPassword.value.trim() == '') {
        alert('請輸入完整帳號、密碼!');
        return;
    }
    else if (loginEmail.value.trim() !== `${localStorage.getItem('SignUpEmail')}`) {
        alert('帳號錯誤，請輸入最新註冊的帳號!');
        return;
    }
    login();
});