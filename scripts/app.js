'use strict'

const savedUsers = () => {
    const userJSON = localStorage.getItem('users')    
    try{
        return userJSON ? JSON.parse(userJSON) : []
    }catch(e){
        return []
    }    
}
const users = savedUsers()
const loginForm =  document.getElementById('loginForm')

loginForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const LoginUser = e.target.elements.UserInput.value
    const LoginPass = e.target.elements.PasswordInput.value    
    
    if((LoginUser == LoginPass) && ((LoginUser != '') && (LoginPass != ''))){        
        let user = users.find((user) => ((user.username == LoginUser) && (user.password == LoginPass)))
        if(!user){            
            users.push({
                id : uuidv4().slice(1,8),
                username : LoginUser,
                password : LoginPass
            })
            user = users[users.length - 1]
        }                              
        loginForm.reset()
        location.assign(`/dashboard.html#${user.id}`)
        localStorage.setItem('users',JSON.stringify(users))
    }else{
        alert('invalid credentials')
        document.getElementById('ShowTextLabel').innerHTML = 'Enter same username and password !'
        loginForm.reset()
    }         
})