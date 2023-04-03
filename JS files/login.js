"use strict";

import {$} from "./utils.js"

const elLoginForm = $("#login-form");

elLoginForm.addEventListener("submit", (evt)=>{
    evt.preventDefault();
    const email = evt.target.email.value;
    const password = evt.target.password.value;


    fetch("https://reqres.in/api/login",{
        method:"post",
        body: JSON.stringify({
            email,
            password
        }),
        headers: {
            'Content-type': 'Application/json'
        }
    })
    .then(res => res.json())
    .then((data)=>{
        console.log(data);
        localStorage.setItem("token", data.token)

        window.location.href= "../index.html";
    })
})