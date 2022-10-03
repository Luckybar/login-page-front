let CHECK_USERNAME = false;
let CHECK_PASSWORD = false;
let CHECK_MAIL = false;

const username = $('#Username');
const password = $('#Password');
const passwordr = $('#Passwordr');
const mail = $('#Mail');
const mailcompany = $('#MailCompany');

(function(){
    $('#Username').focus();
})()

//------Account Check------
username.blur(async function(){
    if (username.val() === '' ||　username.val() === null) {
        $('label[for="Username"]').text('請填寫用戶名')
            .attr('class', 'text-danger');
        return;
    }
    const result = await checkAccountExist(username.val());
    if(result.length > 0) {
        $('label[for="Username"]').text('該用戶名已存在')
            .attr('class', 'text-danger');
        CHECK_USERNAME = false;
    }else {
        $('label[for="Username"]').text('該用戶名可使用')
            .attr('class', 'text-success');
        CHECK_USERNAME = true;
    }
})

//------ Password ------
password.blur(() => {checkPassword()});
passwordr.blur(() => {checkPassword()});

function checkPassword() {
    if (password.val() === '' || password.val() === null) {
        $('label[for="Password"]').text('請填寫密碼')
            .attr('class', 'text-danger');
        CHECK_PASSWORD = false;
        return;
    }
    if (password.val() !== passwordr.val()) {
        $('label[for="Passwordr"]').text('密碼不一致')
            .attr('class', 'text-danger');
        CHECK_PASSWORD = false;
        return;
    }

    $('label[for="Passwordr"]').text('密碼確認')
        .attr('class', 'text-success');
    CHECK_PASSWORD = true;
}

//------ Mail ------
mail.blur(() => {
    if (mail.val() === '' || mail.val() === null) {
        $('label[for="Mail"]').text('請填寫信箱')
            .attr('class', 'text-danger');
        CHECK_MAIL = false;
        return;
    }
    getFullMail();
    CHECK_MAIL = true;
});

mailcompany.blur(() => {getFullMail()});

function getFullMail() {
    const fullMail = mail.val() + '@' + mailcompany.val();
    $('#FullMail').text(fullMail)
        .attr('class', 'text-success mb-3');
}

//------ Submit ------
$('#Submit').click(async function(){
    if (CHECK_USERNAME && CHECK_PASSWORD && CHECK_MAIL) {
        const result = await createAccount(username.val(), password.val(), $('#Age').val() || 0 ,$('#FullMail').text());
        if (result === 'insert success') {
            alert('註冊成功');
            window.location.href = 'login.html';
        }else {
            alert('註冊失敗, 請稍後再試');
        }
    }else {
        alert('請檢查資料');
    }
});

//------ Cancel ------
$('#back').click(function(){
    window.location.href = 'login.html';
});
