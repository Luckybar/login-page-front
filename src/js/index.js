let taskArr = [];
let userID = '';

(async function(){
    //確認登入情況
    const token = sessionStorage.getItem('token');
    try {
        userID = parseJwt(token).userdata.id;
        console.log(userID);
    }catch (e){
        console.log("can not get user info");
        location.href = '/login.html';
    }

    taskArr = await getUserTask(userID);
    for (let i = 0; i < taskArr.length; i++) {
        const task = taskArr[i];
        console.log(task)
        $('#UserTask').append(
            `<tr>
                <th scope="row">${task._id}</th>
                <td>${task.taskDate}</td>
                <td>${task.taskContent}</td>
                <td>${task.finish}</td>
                <td>
                    <input type="checkbox" value="${task._id}" class="form-check-input">
                </td>
            </tr>
            `
        )
    }
})()

$('#showInsertPage').click(function (){
    $('#UserTask').css("display", "none")
    $('#updatePage').css('display', "none")
    $('#insertPage').css('display',"")

})

$('#showUpdatePage').click(function (){
    $('#insertPage').css('display',"none")
    $('#UserTask').css("display", "none")
    $('#updatePage').css('display', "")

    let taskChosen = chooseTask()
    for(let i = 0; i < taskChosen.length; i++){
        $('#updateItem').append(
            `
                <div class="update-item">
                    <div class="updateID">${taskChosen[i]._id}</div>
                    <input type="text" class="form-control m-input update-content" placeholder=${taskChosen[i].taskContent}>
                    <input type="checkbox" class="form-check-input">
                </div>
            `
        )
    }
})

function cancel(){
    $('#UserTask').css("display", "");
    $('#updatePage').css('display', "none");
    $('#insertPage').css('display', "none");
}

function addInsertItem(){
    $('#insertItem').append(
        `
        <div class="input-group mb-3 insert-item">
            <input type="text" class="form-control m-input insert-content" placeholder="Task Content">
            <div class="input-group-append">
                <button id="removeRow" type="button" class="btn btn-danger">Remove</button>
            </div>
        </div>
        `
    )
}

// remove insert row
$(document).on('click', '#removeRow', function () {
    $(this).parents('.insert-item').remove();
});

//function all insert row
function removeInsertRow(){
    $(".insert-item").remove();
}

async function submitInsertData(){
    let insertData = $(".insert-item");
    if(insertData.length === 1){
        const inputContent = insertData[0].querySelector('.insert-content')
        const result = await createTaskOne(userID, inputContent.value)
        console.log(result)
        if (result === "insert success"){
            removeInsertRow()
            window.location.reload();
        }else{
            alert("insert failed")
        }
    }else{
        let tasklist = [];
        for(let i = 0; i < insertData.length; i++){
            console.log(insertData[i])
            const inputContent = insertData[i].querySelector('.insert-content')
            const task = {
                userId: userID,
                finish: false,
                taskDate: Date.now(),
                taskContent: inputContent.value
            }
            tasklist.push(task)
        }
        const result = await createTaskMany(tasklist)
        console.log(result)
        if (result === "insert success"){
            removeInsertRow()
            window.location.reload();
        }else{
            alert("insert failed")
        }
    }
}


async function submitUpdateData(){
    let updateData = $(".update-item");
    let taskList = []
    for(let i = 0; i < updateData.length; i++){
        const updateContent = updateData[i].querySelector('.update-content').value || updateData[i].querySelector('.update-content').placeholder
        const finish = updateData[i].querySelector('.form-check-input').checked
        const _id = updateData[i].querySelector('.updateID').textContent
        const task = {
            _id: _id,
            content:{
                userId: userID,
                finish: finish,
                taskDate: Date.now(),
                taskContent: updateContent
            }
        }
        taskList.push(task)
    }
    const result = await updateTask(taskList)
    if (result === "insert success"){
        removeInsertRow()
        window.location.reload();
    }else{
        alert("insert failed")
    }
}

$('#DeleteChecked').click(async function () {
    let taskList = chooseTask();
    if (taskList.length === 0){
        alert("Please choose at least one task");
    }else{
        let deleteList = [];
        for(let i = 0; i < taskList.length; i++){
            deleteList.push(taskList[i]._id)
        }

        if( await deleteTask(deleteList) === "delete success"){
            window.location.reload();
        }else{
            alert("delete failed")
        }
    }
});

function chooseTask(){
    let taskList = [];
    let result = [];
    $("input[type=checkbox]:checked").each(function () {
        taskList.push($(this).val());
    });
    for(let i = 0; i < taskList.length; i++){
        let taskChosen = taskArr.find(task => task._id === taskList[i]);
        result.push(taskChosen);
    }
    return result;
}





