var users = [
    {
        login: "FirstLogin",
        name: "First",
        email:"aaa@bbb.com",
        dateOfBirth: "01.01.1991",
        tel:"+38(067)111-11-11"
    },
    {
        login: "SecondLogin",
        name: "Second",
        email:"ccc@ddd.com",
        dateOfBirth: "02.02.1992",
        tel:"+38(068)222-22-22"
    },
    {
        login: "ThirdLogin",
        name: "Third",
        email:"eee@fff.com",
        dateOfBirth: "03.03.1993",
        tel:"+38(050)333-33-33"
    },
    {
        login: "FourthLogin",
        name: "Fourth",
        email:"jjj@kkk.com",
        dateOfBirth: "04.04.1994",
        tel:"+38(099)444-44-44"
    }
];

var allButtons = {
    editBtn: {
        classList: 'btn btn-default',
        value: 'Edit',
        handler: editBtnHandler
    },
    removeBtn: {
        classList: 'btn btn-warning',
        value: 'Remove',
        handler: confirmDelete
    },
    saveBtn: {
        classList: 'btn btn-success',
        value: 'Save',
        handler: saveUser
    },
    backBtn: {
        classList: 'btn btn-default',
        value: 'Back',
        handler: showAllUser
    },
    newBtn:{
        classList: 'btn btn-success',
        value: 'New User',
        handler: creatNewUser
    }

};

showAllUser();