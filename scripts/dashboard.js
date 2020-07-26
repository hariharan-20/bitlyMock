'use strict'

const getLink = document.getElementById('submit')
const LogoutBtn = document.getElementById('LogoutBtn')
const linkInput = document.getElementById('linkInput')
const linkResInput = document.getElementById('linkResInput')
const DashboardText = document.getElementById('DashboardText')

const id = window.location.hash.slice(1)

const savedLinks = () => { 
    const Link = JSON.parse(localStorage.getItem('users')) 
    const found = Link.filter((obj) => obj.id == id)                    
    if(found[0].userLinks){        
        return found
    }else{               
        found[0].userLinks = []
        return found
    }        
}

const userObj = savedLinks()
const userArr = userObj[0]

getLink.addEventListener('click', (e) => {
    const regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/    
    if(regexp.test(linkInput.value)){                         
        let Link = userArr.userLinks.find((userLink) => userLink.link == linkInput.value)
        if(!Link){
            userArr.userLinks.push({
                id : uuidv4().slice(1,8),
                link : linkInput.value
            })            
            savelinks(userObj)               
            Link = userArr.userLinks[userArr.userLinks.length - 1]                    
        }
        // else{        
        //     console.log(`existing`)
        // }
        linkResInput.value = `https://bit.ly/${Link.id}`
        renderDom(userArr)
    }else if(linkInput.value == ''){
        alert('enter link to generate')
        linkResInput.value = ''
    }         
    else{
        alert('invalid link.Enter full link')
        linkResInput.value = ''
    }
 })

LogoutBtn.addEventListener('click', () => {
    location.assign('/index.html')
 })

// userArr.userLinks = []

const savelinks = (userObj) => localStorage.setItem('users', JSON.stringify(userObj))

const renderDom = (userArr) => {
    const links = userArr.userLinks 
    
    if(links.length>0){      
        DashboardText.innerHTML = ''
        links.forEach((link) => {
            const hr = document.createElement('hr')
            const orgLinkP = document.createElement('p')                     
            orgLinkP.innerHTML = `URL : <a>${link.link}</a>`
            
            const shortlinkP = document.createElement('p')                        
            shortlinkP.innerHTML = `Shortened URL : bit.ly/${link.id}`                         
            
            
            DashboardText.appendChild(orgLinkP)
            DashboardText.appendChild(shortlinkP)  
            DashboardText.appendChild(hr)       
        })
    }else{
        DashboardText.innerHTML = "<h4>No links generated to show<h4><hr>"
    }  
}
renderDom(userArr)